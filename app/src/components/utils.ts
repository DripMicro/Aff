import { env } from "../env.mjs";

export const storageBasePath = String(env.LEGACY_PHP_URL);

export const serverStoragePath = (path: string | undefined | null) => {
  return path?.startsWith("files/") || path?.startsWith("../files/")
    ? `${storageBasePath}/${path}`
    : path;
};
