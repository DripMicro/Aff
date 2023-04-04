/* eslint-disable
      @typescript-eslint/no-unsafe-assignment,
      @typescript-eslint/no-unsafe-return,
      @typescript-eslint/no-unsafe-member-access,
      @typescript-eslint/no-unsafe-call,
      @typescript-eslint/no-unsafe-argument
*/

import type { ZodEffects } from "zod";
import { z, ZodType } from "zod";
import type { ZodTypeAny } from "zod/lib/types";
import type React from "react";
import type { WizardControlProps } from "../components/common/wizard/useWizardFlow";
import type { WizardInfo } from "../components/common/wizard/useWizardFlow";
import { mergeDeepRight } from "rambda";

export const SPLIT_DESCRIPTION_SYMBOL = " // ";

const ChoiceSchema = z
  .object({
    id: z.string().or(z.number()),
    title: z.string(),
    info: z.any().optional(),
  })
  .or(z.string());

export type ChoiceType = z.infer<typeof ChoiceSchema>;

export type ControlCallback = (
  wizard: WizardControlProps,
  options?: { submit?: () => void }
) => React.ReactNode;

export type ConditionCallback = (wizardInfo: WizardInfo, data?: any) => boolean;

export interface ZodMetaDataItem {
  name?: string;
  label?: string | ControlCallback;
  placeholder?: string;
  text?: Record<string, string>;
  type?:
    | "text"
    | "password"
    | "submit"
    | "reset"
    | "radio"
    | "checkbox"
    | "button"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "range"
    | "search"
    | "tel"
    | "time"
    | "url"
    | "week";
  stepInfo?: "none" | { name?: string; sub: string };
  control?: string | ControlCallback;
  choices?: ChoiceType[];
  className?: string;
  props?: Record<string, any>;
  beforeElement?: ControlCallback;
  afterElement?: ControlCallback;
  render?: (
    controls: Record<string, React.ReactNode>,
    wizard: WizardControlProps
  ) => React.ReactNode;

  condition?: ConditionCallback;

  showBack?: boolean;
}

declare module "zod" {
  interface ZodType {
    metadata(): ZodMetaDataItem;
    meta(meta: ZodMetaDataItem): this;
    extendMeta(meta: ZodMetaDataItem): this;
  }
}

ZodType.prototype.metadata = function () {
  return this._def.meta;
};

ZodType.prototype.meta = function (meta: ZodMetaDataItem) {
  // if (typeof meta === "string") {
  //   const [label, ...rest] = meta
  //     .split(SPLIT_DESCRIPTION_SYMBOL)
  //     .map((e) => e.trim());
  //   meta = { label, placeholder: rest.join(SPLIT_DESCRIPTION_SYMBOL) };
  // }
  //
  const This = (this as any).constructor;
  return new This({
    ...this._def,
    meta,
  });
};

ZodType.prototype.extendMeta = function (extendMeta: ZodMetaDataItem) {
  // if (typeof meta === "string") {
  //   const [label, ...rest] = meta
  //     .split(SPLIT_DESCRIPTION_SYMBOL)
  //     .map((e) => e.trim());
  //   meta = { label, placeholder: rest.join(SPLIT_DESCRIPTION_SYMBOL) };
  // }
  //
  const This = (this as any).constructor;
  return new This({
    ...this._def,
    meta: mergeDeepRight(this._def.meta || {}, extendMeta),
  });
};

export interface MetaInfo {
  meta: ZodMetaDataItem;
  children?: Record<string, MetaInfo>;
  type: z.AnyZodObject | ZodEffects<any, any> | ZodTypeAny;
  // type: z.AnyZodObject | ZodEffects<any, any>;

  typeName: string;

  name: string;
}

export const getZodMetaInfo = <T extends ZodTypeAny>(
  type: T,
  name?: string
): MetaInfo => {
  const getFullMeta = <T extends ZodTypeAny>(type: T): ZodMetaDataItem => {
    let desc = {};

    // console.log(`muly:getFullMeta`, { type });

    const description = type.description;
    if (description) {
      const [label, ...rest] = description
        .split(SPLIT_DESCRIPTION_SYMBOL)
        .map((e) => e.trim());
      const placeholder = rest.join(SPLIT_DESCRIPTION_SYMBOL);
      desc = {
        label: label,
        placeholder: placeholder ? placeholder : undefined,
      };
    }

    // not sure about the format pof choices for ZodEnum, tested only for ZodNativeEnum
    const choices =
      type._def.typeName === z.ZodFirstPartyTypeKind.ZodEnum ||
      type._def.typeName === z.ZodFirstPartyTypeKind.ZodNativeEnum
        ? Object.keys(type._def.values).map((key) => ({
            id: key,
            title: type._def.values[key],
          }))
        : undefined;

    return {
      choices,
      name,
      ...type.metadata(),
      ...desc,
    };
  };

  const getInnerType = <T extends ZodTypeAny>(type: T): string => {
    let r = type;
    while (r._def.innerType) {
      r = r._def.innerType;
    }
    while (r._def.schema) {
      r = r._def.schema;
    }
    return r._def.typeName;
  };

  let r = type;

  // @ts-ignore
  while (r.unwrap) {
    // @ts-ignore
    r = r.unwrap();
  }
  while (r._def.innerType) {
    r = r._def.innerType;
  }
  while (r._def.schema) {
    r = r._def.schema;
  }

  if (r._def.typeName === "ZodUnion") {
    const children: Record<string, MetaInfo> = {};
    r._def.options.forEach((r: ZodTypeAny, idx: number) => {
      children[idx] = getZodMetaInfo(r);
    });

    return {
      meta: getFullMeta(r),
      children,
      typeName: getInnerType(r),
      type,
      name: name || "union",
    };
  } else if (r._def.typeName === "ZodObject") {
    const children: Record<string, MetaInfo> = {};
    Object.keys(r._def.shape()).forEach((key) => {
      // console.log(`muly:SCAN OBJECT ${name}->${key}`, {});
      children[key] = getZodMetaInfo(r._def.shape()[key], key);
    });
    // console.log(`muly:getZodMetaInfo CHILD`, { map: Object.keys(children) });
    return {
      meta: getFullMeta(type),
      children,
      typeName: getInnerType(r), // r._def.typeName,
      type,
      name: name || "object",
    };
  } else {
    return {
      meta: getFullMeta(type),
      typeName: getInnerType(r),
      type,
      name: name || "unknown",
    };
  }
};
