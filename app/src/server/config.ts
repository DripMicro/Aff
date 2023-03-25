import type { PrismaClient } from "@prisma/client";

export const getConfig = async (_prisma: PrismaClient) => {
  return Promise.resolve({
    BlockLoginUntillEmailVerification: 0,
  });
};
