import { createUseFlags } from "@happykit/flags/client";
import type { InitialFlagState as GenericInitialFlagState } from "@happykit/flags/client";
import { createUseFlagBag } from "@happykit/flags/context";
import { config } from "./config";
import type { AppFlags } from "./config";

export type InitialFlagState = GenericInitialFlagState<AppFlags>;
export const useFlags = createUseFlags<AppFlags>(config);
export const useFlagBag = createUseFlagBag<AppFlags>();
