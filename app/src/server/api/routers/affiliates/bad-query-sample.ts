import { publicProcedure } from "@/server/api/trpc";
import { sub } from "date-fns";
import {
  affiliate_id,
  merchant_id,
} from "@/server/api/routers/affiliates/const";

export const badQuerySample = publicProcedure.query(async ({ ctx }) => {
  const from = sub(new Date(), { months: 6 });
  const to = new Date();

  const arrFtd = await ctx.prisma.data_reg.findMany({
    where: {
      NOT: {
        type: "demo",
      },
      // FTDqualificationDate: {
      //   gt: from,
      //   lt: to,
      // },
      affiliate_id: affiliate_id ? affiliate_id : 1,
      merchant_id: merchant_id ? merchant_id : 1,
    },
  });

  return arrFtd;
});
