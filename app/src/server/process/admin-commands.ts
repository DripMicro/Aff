import { scratchPad } from "./scratch-pad";
import { getFeaturesFlags } from "./get-features-flags";
import { addSystemEvent } from "./system-events";
import { castError } from "../../utils/errors";
import { extractRuntimeTranslation } from "./extract-runtime-translation";
import { affiliate_id, merchant_id } from "../api/routers/affiliates/const";

export interface AdminCommandAnswer {
  message: string;
  results?: any;
}

export const executeAdminCommand = async (
  cmd: string,
  data: any
): Promise<AdminCommandAnswer> => {
  // console.log(`muly:executeAdminCommand`, { cmd, data });

  if (cmd === "system-info") {
    return Promise.resolve({
      message: "system-info",
      results: {
        affiliate_id,
        merchant_id,
        env: process.env,
      },
    });
  } else if (cmd === "scratchPad") {
    try {
      const answer = await scratchPad();
      return { message: "scratchPad", results: answer };
    } catch (_err) {
      const err = castError(_err);
      return { message: `ERROR: ${err.message}`, results: err.stack };
    }
  } else if (cmd === "flags") {
    return await getFeaturesFlags();
  } else if (cmd === "simulateErrorEvent") {
    await addSystemEvent("admin command simulateErrorEvent", {}, true);
    return { message: "done" };
  } else if (cmd === "ping") {
    return Promise.resolve({ message: "pong" });
  } else {
    return Promise.resolve({ message: "Command not found" });
  }
};
