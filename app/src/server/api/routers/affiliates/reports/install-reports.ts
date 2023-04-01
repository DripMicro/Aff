import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import {
  affiliate_id,
  merchant_id,
} from "@/server/api/routers/affiliates/const";
import { data_install_type } from "@prisma/client";

export const getInstallReport = publicProcedure
  .input(
    z.object({
      from: z.date().optional(),
      to: z.date().optional(),
      country: z.string().optional(),
      banner_id: z.string().optional(),
      trader_id: z.number().optional(),
      param: z.string().optional(),
      param2: z.string().optional(),
      filter: z.string().optional(),
    })
  )
  .query(
    async ({
      ctx,
      input: { from, to, country, banner_id, trader_id, param, param2, filter },
    }) => {
      // type filter
      let type_filter = {};
      if (merchant_id) {
        type_filter = {
          merchant_id: merchant_id,
        };
      }

      if (trader_id) {
        type_filter = {
          TraderID: trader_id,
        };
      }

      if (banner_id) {
        type_filter = {
          CreativeID: banner_id,
        };
      }

      if (param) {
        type_filter = {
          Param: param,
        };
      }

      if (country) {
        type_filter = {
          Country: country,
        };
      }

      if (param2) {
        type_filter = {
          Param2: param2,
        };
      }
      const data = await ctx.prisma.data_install.findMany({
        orderBy: {
          rdate: "asc",
        },
        where: {
          rdate: {
            gte: from,
            lt: to,
          },
          affiliate_id: affiliate_id,
          merchant_id: {
            gt: 0,
            equals: Number(merchant_id),
          },
          type:
            filter === "all"
              ? ("" as data_install_type)
              : (filter as data_install_type),
        },
      });
      let banner_info = [] as any;
      let aff_info = [] as any;
      for (let i = 0; i < Object.keys(data).length; i++) {
        const bannerInfo = await ctx.prisma.merchants_creative.findMany({
          include: {
            language: {
              select: {
                title: true,
              },
            },
          },
          where: {
            id: data[i]?.banner_id,
          },
          take: 1,
        });
        banner_info = bannerInfo;

        const affInfo = await ctx.prisma.affiliates.findMany({
          where: {
            valid: 1,
            id: affiliate_id,
          },
          take: 1,
        });
        aff_info = affInfo;
      }

      const merchants = await ctx.prisma.merchants.findMany({
        where: {
          valid: 1,
          id: merchant_id,
        },
      });

      const merged = [];

      for (let i = 0; i < data.length; i++) {
        merged.push({
          ...data[i],
          ...aff_info[i],
          ...banner_info[i],
          ...merchants[i],
        });
      }
      return merged as Array<Record<string, any>>;
    }
  );
