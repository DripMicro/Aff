import { createGetFlags } from "@happykit/flags/server";
import { config } from "./config";
import type { GenericEvaluationResponseBody } from "@happykit/flags/server";
import type { AppFlags } from "./config";

export type EvaluationResponseBody = GenericEvaluationResponseBody<AppFlags>;
export const getFlags = createGetFlags<AppFlags>(config);
