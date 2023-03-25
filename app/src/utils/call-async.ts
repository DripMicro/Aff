import { castError } from "./errors";

export const callAsync = (fn: () => Promise<unknown>): (() => void) => {
  return () => {
    fn()
      .then()
      .catch((_err: unknown) => {
        const err = castError(_err);
        console.error(`callAsync ignore error ${err.message}`, {
          err: err.stack,
        });
      });
  };
};
