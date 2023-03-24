import type { TranslationFn } from "../../../utils/i18n-utils";
import { translateSchemaInfo } from "../../../utils/i18n-utils";
import type { ZodTypeAny } from "zod/lib/types";
import type React from "react";
import { useMemo } from "react";
import {
  getPagesZodMetaInfo,
  WizardControlProps,
} from "../wizard/useWizardFlow";
import type { ControlCallback } from "../../../utils/zod-meta";
import { getZodMetaInfo } from "../../../utils/zod-meta";
import type { FormContext } from "../../libs/react-ts-form/FieldContext";
import { z, ZodEffects } from "zod";

// const fakeWizard = {};

export const usePrepareSchema = (
  translate: TranslationFn,
  schema: ZodTypeAny
): FormContext => {
  const info = useMemo(() => {
    const infoRaw = getZodMetaInfo(schema);
    const info = translateSchemaInfo(infoRaw, translate);
    return info;
  }, [translate, schema]);

  return {
    t: translate,
    formMeta: info,
    // Ugly buy it save some not needed code
    // @ts-ignore
    flowContext: {
      // ...fakeWizard,
      step: info,
      meta: info,
      formContext: { t: translate, formMeta: info },
    },
  };
};

export const evaluateFormControlCallback = (
  value: string | ControlCallback | undefined
): React.ReactNode => {
  if (!value) {
    return null;
  } else if (typeof value === "string") {
    return value;
  } else {
    throw new Error(`ControlCallback not supported in not wizard`);
    // return value(wizard);
  }
};
