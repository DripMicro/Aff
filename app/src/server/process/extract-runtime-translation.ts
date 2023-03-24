import type { ZodTypeAny } from "zod/lib/types";
import type { TranslationFn } from "../../utils/i18n-utils";
import { translateSchemaInfo } from "../../utils/i18n-utils";
import type { WizardPagesDefinition } from "../../components/common/wizard/useWizardFlow";
import { getPagesZodMetaInfo } from "../../components/common/wizard/useWizardFlow";
import { getZodMetaInfo } from "../../utils/zod-meta";

export const extractRuntimeTranslation = (nsMap: {
  [ns: string]: TranslationFn;
}) => {
  let count = 0;

  const translate: TranslationFn = (key: string, def?: string) => {
    // console.log(`translate ${ns} ${key}=${def}`);
    const map = nsMap[ns];
    if (!map) {
      throw new Error(`Missing translator for namespace ${ns}`);
    }

    count++;
    return map(key, def);
  };

  const translateSchema = (schema: ZodTypeAny) => {
    translateSchemaInfo(getZodMetaInfo(schema), translate, "");
  };

  const translateWizard = (pagesDefinition: WizardPagesDefinition) => {
    const stepsRaw = getPagesZodMetaInfo(pagesDefinition);
    const steps = translateSchemaInfo(
      stepsRaw,
      translate,
      pagesDefinition.name
    );
  };

  let ns: string;
  return { message: `done count:${count}` };
};
