import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { affiliate_id } from "@/server/api/routers/affiliates/const";

export const getCommissionReport = publicProcedure
  .input(
    z.object({
      from: z.date().optional(),
      to: z.date().optional(),
      merchant_id: z.string().optional(),
      trader_id: z.string().optional(),
      commission: z.string().optional(),
    })
  )
  .query(
    async ({
      ctx,
      input: { from, to, merchant_id, trader_id, commission },
    }) => {
      // let offset;
      // console.log("item per page ------>", page, items_per_page);
      // if (page && items_per_page) {
      // 	offset = (page - 1) * items_per_page;
      // }
      let deal_filter = {};
      switch (commission) {
        case "CPA":
          deal_filter = { DealType: "CPA" };
          break;

        case "NetDeposit":
          deal_filter = { DealType: "NetDeposit" };
          break;

        case "PNLRevShare":
          deal_filter = { DealType: "PNL RevShare" };

          break;
      }

      const data = await ctx.prisma.commissions.findMany({
        orderBy: {
          Date: "asc",
        },
        where: {
          ...deal_filter,
          Date: {
            gte: from,
            lt: to,
          },
          affiliate_id: affiliate_id,
          traderID: trader_id ? trader_id : "",
        },
        include: {
          merchant: {
            select: {
              name: true,
            },
          },
          affiliate: {
            select: {
              username: true,
            },
          },
        },
      });

      console.log("data ----->", data);

      return data;
    }
  );
