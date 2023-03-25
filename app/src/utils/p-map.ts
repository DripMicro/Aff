// eslint-disable-file
// @ts-nocheck
// https://github.com/sindresorhus/p-map

/**
 An error to be thrown when the request is aborted by AbortController.
 DOMException is thrown instead of this Error when DOMException is available.
 */
export class AbortError extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
}

/**
 TODO: Remove AbortError and just throw DOMException when targeting Node 18.
 */
const getDOMException = (errorMessage) =>
  globalThis.DOMException === undefined
    ? new AbortError(errorMessage)
    : new DOMException(errorMessage);

/**
 TODO: Remove below function and just 'reject(signal.reason)' when targeting Node 18.
 */
const getAbortedReason = (signal) => {
  const reason =
    signal.reason === undefined
      ? getDOMException("This operation was aborted.")
      : signal.reason;

  return reason instanceof Error ? reason : getDOMException(reason);
};

export interface Options {
  /**
   Number of concurrently pending promises returned by `mapper`.
   Must be an integer from 1 and up or `Infinity`.
   @default Infinity
   */
  readonly concurrency?: number;

  /**
   When `true`, the first mapper rejection will be rejected back to the consumer.
   When `false`, instead of stopping when a promise rejects, it will wait for all the promises to settle and then reject with an [aggregated error](https://github.com/sindresorhus/aggregate-error) containing all the errors from the rejected promises.
   Caveat: When `true`, any already-started async mappers will continue to run until they resolve or reject. In the case of infinite concurrency with sync iterables, *all* mappers are invoked on startup and will continue after the first rejection. [Issue #51](https://github.com/sindresorhus/p-map/issues/51) can be implemented for abort control.
   @default true
   */
  readonly stopOnError?: boolean;

  /**
   You can abort the promises using [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).
   **Requires Node.js 16 or later.*
   @example
   ```
   import pMap from 'p-map';
   import delay from 'delay';
   const abortController = new AbortController();
   setTimeout(() => {
		abortController.abort();
	}, 500);
   const mapper = async value => value;
   await pMap([delay(1000), delay(1000)], mapper, {signal: abortController.signal});
   // Throws AbortError (DOMException) after 500 ms.
   ```
   */
  readonly signal?: AbortSignal;
}

type MaybePromise<T> = T | Promise<T>;

export type Mapper<Element = any, NewElement = unknown> = (
  element: Element,
  index: number
) => MaybePromise<NewElement | typeof pMapSkip>;

export default async function PMap<Element, NewElement>(
  iterable:
    | AsyncIterable<Element | Promise<Element>>
    | Iterable<Element | Promise<Element>>,
  mapper: Mapper<Element, NewElement>,
  {
    concurrency = Number.POSITIVE_INFINITY,
    stopOnError = true,
    signal,
  }: Options = {}
): Promise<Array<Exclude<NewElement, typeof pMapSkip>>> {
  return new Promise((resolve, reject_) => {
    if (
      iterable[Symbol.iterator] === undefined &&
      iterable[Symbol.asyncIterator] === undefined
    ) {
      throw new TypeError(
        `Expected \`input\` to be either an \`Iterable\` or \`AsyncIterable\`, got (${typeof iterable})`
      );
    }

    if (typeof mapper !== "function") {
      throw new TypeError("Mapper function is required");
    }

    if (
      !(
        (Number.isSafeInteger(concurrency) ||
          concurrency === Number.POSITIVE_INFINITY) &&
        concurrency >= 1
      )
    ) {
      throw new TypeError(
        `Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${concurrency}\` (${typeof concurrency})`
      );
    }

    const result = [];
    const errors = [];
    const skippedIndexesMap = new Map();
    let isRejected = false;
    let isResolved = false;
    let isIterableDone = false;
    let resolvingCount = 0;
    let currentIndex = 0;
    const iterator =
      iterable[Symbol.iterator] === undefined
        ? iterable[Symbol.asyncIterator]()
        : iterable[Symbol.iterator]();

    const reject = (reason) => {
      isRejected = true;
      isResolved = true;
      reject_(reason);
    };

    if (signal) {
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }

      signal.addEventListener("abort", () => {
        reject(getAbortedReason(signal));
      });
    }

    const next = async () => {
      if (isResolved) {
        return;
      }

      const nextItem = await iterator.next();

      const index = currentIndex;
      currentIndex++;

      // Note: `iterator.next()` can be called many times in parallel.
      // This can cause multiple calls to this `next()` function to
      // receive a `nextItem` with `done === true`.
      // The shutdown logic that rejects/resolves must be protected
      // so it runs only one time as the `skippedIndex` logic is
      // non-idempotent.
      if (nextItem.done) {
        isIterableDone = true;

        if (resolvingCount === 0 && !isResolved) {
          if (!stopOnError && errors.length > 0) {
            reject(new AggregateError(errors));
            return;
          }

          isResolved = true;

          if (skippedIndexesMap.size === 0) {
            resolve(result);
            return;
          }

          const pureResult = [];

          // Support multiple `pMapSkip`'s.
          for (const [index, value] of result.entries()) {
            if (skippedIndexesMap.get(index) === pMapSkip) {
              continue;
            }

            pureResult.push(value);
          }

          resolve(pureResult);
        }

        return;
      }

      resolvingCount++;

      // Intentionally detached
      (async () => {
        try {
          const element = await nextItem.value;

          if (isResolved) {
            return;
          }

          const value = await mapper(element, index);

          // Use Map to stage the index of the element.
          if (value === pMapSkip) {
            skippedIndexesMap.set(index, value);
          }

          result[index] = value;

          resolvingCount--;
          await next();
        } catch (error) {
          if (stopOnError) {
            reject(error);
          } else {
            errors.push(error);
            resolvingCount--;

            // In that case we can't really continue regardless of `stopOnError` state
            // since an iterable is likely to continue throwing after it throws once.
            // If we continue calling `next()` indefinitely we will likely end up
            // in an infinite loop of failed iteration.
            try {
              await next();
            } catch (error) {
              reject(error);
            }
          }
        }
      })();
    };

    // Create the concurrent runners in a detached (non-awaited)
    // promise. We need this so we can await the `next()` calls
    // to stop creating runners before hitting the concurrency limit
    // if the iterable has already been marked as done.
    // NOTE: We *must* do this for async iterators otherwise we'll spin up
    // infinite `next()` calls by default and never start the event loop.
    (async () => {
      for (let index = 0; index < concurrency; index++) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await next();
        } catch (error) {
          reject(error);
          break;
        }

        if (isIterableDone || isRejected) {
          break;
        }
      }
    })();
  });
}

export const pMapSkip = Symbol("skip");
