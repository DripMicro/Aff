import { getFlags } from "../../flags/server";

export const getFeaturesFlags = async () => {
  const { flags } = await getFlags({ context: {} });

  return {
    message: "getFeaturesFlags",
    results: { flags, sample: 1 },
  };
};
