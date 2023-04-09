import { z } from "zod";

import { publicProcedure } from "../../trpc";
import { affiliate_id } from "./const";
import { documentsModel } from "../../../../../prisma/zod";
import { documents_type, documents_doc_status } from "@prisma/client";
import { upsertSchema } from "../../../../../prisma/zod-add-schema";
import { serverStoragePath } from "@/components/utils";

export const getDocuments = publicProcedure.query(async ({ ctx }) => {
  const data = await ctx.prisma.documents.findMany({
    where: {
      affiliate_id,
    },
  });

  return data.map(({ path, ...rest }) => ({
    ...rest,
    path: serverStoragePath(path),
  }));
});
