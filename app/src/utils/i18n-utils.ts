import { trpcVanillaClient } from "./api";
import { callAsync } from "./call-async";
import type { MetaInfo } from "./zod-meta";
import { map } from "rambda";

const itemSent: { [key: string]: boolean } = {};
export type TranslationFn = (key: string, def?: string) => string;

export const missingKeyHandler = (
  lngs: readonly string[],
  ns: string,
  key: string,
  fallbackValue: string,
  updateMissing: boolean,
  options: any
) => {
  const isServer = typeof window === "undefined";
  const sent = `${ns}:${key}`;
  if (!itemSent[sent] && !isServer) {
    console.log(`muly:missingKeyHandler`, {
      lngs,
      ns,
      key,
      fallbackValue,
      updateMissing,
      options,
    });

    callAsync(async () => {
      await trpcVanillaClient.misc.missingLanguageTranslation.mutate({
        ns,
        key,
        fallbackValue,
      });
    })();

    itemSent[sent] = true;
  }
};

export const translateSchemaInfo = (
  metaInfo: MetaInfo,
  translate: TranslationFn,
  path = ""
): MetaInfo => {
  const { meta, children, ...rest } = metaInfo;

  let tDesc = {};

  if (meta) {
    const {
      label,
      placeholder,
      text,
      stepInfo,
      name,
      choices,
      props,
      ...restDesc
    } = meta;

    const translationKey = props?.translationKey || name;
    if (translationKey) {
      path = path ? [path, translationKey].join(".") : translationKey;
    }

    tDesc = {
      ...restDesc,
      props,
      choices: choices
        ? choices.map((value) => {
            if (typeof value === "string") {
              return value;
            } else {
              const { id, title, ...rest } = value;
              return {
                id,
                title: translate(`${path}.choices.${id}`, title),
                ...rest,
              };
            }
          })
        : choices,

      label:
        typeof label === "string" ? translate(`${path}.label`, label) : label,
      placeholder: placeholder && translate(`${path}.placeholder`, placeholder),
      text: text
        ? map((value, key: string) => translate(`${path}.${key}`, value), text)
        : undefined,
      stepInfo:
        stepInfo && stepInfo !== "none"
          ? {
              name: stepInfo.name
                ? translate(`${path}.step_name`, stepInfo.name)
                : stepInfo.name,
              sub: translate(`${path}.step_sub`, stepInfo.sub),
            }
          : stepInfo,
    };
  }

  let tChildren: Record<string, MetaInfo> | undefined = undefined;
  if (children) {
    tChildren = {};

    Object.keys(children).forEach((key) => {
      const child = children[key];
      if (child && tChildren) {
        tChildren[key] = translateSchemaInfo(child, translate, path);
      }
    });
  }

  return {
    ...rest,
    meta: tDesc,
    children: tChildren,
  };
};

// Dummy function, do nothing but return the string, but for i18next scan to find those strings
export const dt = (key: string, defaultString?: string) => defaultString || key;

export const declareTranslationNS = (ns: string) => {
  return;
};
