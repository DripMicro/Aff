import { createTRPCRouter } from "../../trpc";
import { getCountries } from "./countries";
import { getLanguages } from "./languages";
import { missingLanguageTranslation } from "./missing-language-translation";
import { runAdminCommand, simulateServerError } from "./system";

export const miscRouter = createTRPCRouter({
  getCountries,
  getLanguages,
  missingLanguageTranslation,
  runAdminCommand,
  simulateServerError,
});
