import { map } from "rambda";
import { z } from "zod";
import { serverStoragePath } from "../../../../components/utils";
import { publicProcedure } from "../../trpc";
import { affiliate_id, merchant_id } from "./const";

export const getDashboard = publicProcedure
  .input(
    z.object({
      from: z.date(),
      to: z.date(),
    })
  )
  .query(async ({ ctx, input: { from, to } }) => {
    const data = await ctx.prisma.dashboard.groupBy({
      by: ["merchant_id"],
      where: {
        merchant_id: merchant_id ? merchant_id : 1,
        affiliate_id,
        Date: {
          gt: from,
          lte: to,
        },
      },
      _sum: {
        Clicks: true,
        Impressions: true,
        Install: true,
        Leads: true,
        Demo: true,
        RealAccount: true,
        FTD: true,
        FTDAmount: true,
        Deposits: true,
        DepositsAmount: true,
        Bonus: true,
        RawFTD: true,
        RawFTDAmount: true,
        Withdrawal: true,
        ChargeBack: true,
        NetDeposit: true,
        PNL: true,
        ActiveTrader: true,
        Commission: true,
        PendingDeposits: true,
        PendingDepositsAmount: true,
      },
    });

    return data;
  });

export const getTopMerchantCreative = publicProcedure.query(async ({ ctx }) => {
  const data = await ctx.prisma.merchants_creative.findMany({
    where: {
      merchant_id,
      valid: 1,
      affiliateReady: 1,
      featured: 1,
      NOT: {
        file: {
          contains: "%tmp%",
        },
      },
    },
    include: {
      merchant: {
        select: { name: true },
      },
      language: {
        select: { title: true },
      },
      category: { select: { categoryname: true } },
    },
    orderBy: {
      id: "desc",
    },
    take: 5,
  });

  return map(
    ({ file, ...data }) => ({ ...data, file: serverStoragePath(file) }),
    data
  );
});

const dateList = (
  from: Date,
  to: Date
): { year: number; month: number; label: string }[] => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = [];
  const startYear = from.getFullYear();
  const endYear = to.getFullYear();
  for (let i = startYear; i <= endYear; i++) {
    const endMonth = i != endYear ? 11 : to.getMonth();
    const startMonth = i === startYear ? from.getMonth() : 0;

    for (let j = startMonth; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      const temp = {
        year: i,
        month: j,
        label: months[j] || "ERROR",
      };
      data.push(temp);
    }
  }
  return data;
};

export const getPerformanceChart = publicProcedure
  .input(
    z.object({
      from: z.date(),
      to: z.date(),
    })
  )
  .query(async ({ ctx, input: { from, to } }) => {
    return await Promise.all(
      dateList(from, to).map(async (item) => {
        const from = new Date(item.year, item.month, 1);
        const to = new Date(item.year, item.month + 1, 0);

        const data = await ctx.prisma.dashboard.groupBy({
          by: ["merchant_id"],
          where: {
            affiliate_id,
            merchant_id: merchant_id ? merchant_id : 1,
            Date: {
              gt: from,
              lte: to,
            },
          },
          _sum: {
            FTD: true,
            RealAccount: true,
          },
        });

        return {
          date: `${item.label}, ${item.year}`,
          Accounts: data[0] ? data[0]._sum.RealAccount : 0,
          "Active Traders": data[0] ? data[0]._sum.FTD : 0,
        };
      })
    );
  });

export const getConversionChart = publicProcedure
  .input(
    z.object({
      from: z.date(),
      to: z.date(),
    })
  )
  .query(async ({ ctx, input: { from, to } }) => {
    return await Promise.all(
      dateList(from, to).map(async (item) => {
        const from = new Date(item.year, item.month, 1);
        const to = new Date(item.year, item.month + 1, 0);

        const data = await ctx.prisma.dashboard.groupBy({
          by: ["merchant_id"],
          where: {
            affiliate_id,
            merchant_id: merchant_id ? merchant_id : 1,
            Date: {
              gt: from,
              lte: to,
            },
          },
          _sum: {
            FTD: true,
            RealAccount: true,
          },
        });

        let conversions = 0;
        if (data) {
          if (data[0]?._sum.RealAccount && data[0]?._sum.FTD) {
            conversions = (data[0]?._sum.FTD / data[0]?._sum.RealAccount) * 100;
          }
        }
        return {
          date: `${item.label}, ${item.year}`,
          Conversions: conversions,
        };
      })
    );
  });

export const getCountryReport = publicProcedure.query(async ({ ctx }) => {
  const data = await ctx.prisma.commissions.groupBy({
    by: ["merchant_id", "affiliate_id"],
    where: {
      affiliate_id,
      merchant_id: merchant_id ? merchant_id : 1,
    },
    _sum: {
      Commission: true,
    },
  });

  const merchants = await ctx.prisma.merchants.findMany({
    where: {
      id: {
        in: data.map(({ merchant_id }) => merchant_id),
      },
    },
  });

  return data.map((item) => {
    const merchant = merchants.find((d) => d.id === item.merchant_id);
    return {
      ...item,
      country: merchant?.country,
    };
  });
});

export const getReportsHiddenCols = publicProcedure.query(async ({ ctx }) => {
  const level = "affiliate";
  const location = level + "->dashStatCols";
  const data = await ctx.prisma.reports_fields.findFirst({
    where: {
      user_id: affiliate_id,
      userlevel: level,
      location: location,
    },
  });
  return data?.removed_fields.split("|") || "";
});

export const upsertReportsField = publicProcedure
  .input(
    z.object({
      remove_fields: z.string(),
    })
  )
  .mutation(async ({ ctx, input: { remove_fields } }) => {
    const level = "affiliate";
    const location = level + "->dashStatCols";
    const exists = await ctx.prisma.reports_fields.findFirst({
      where: {
        user_id: affiliate_id,
        userlevel: level,
        location: location,
      },
    });

    return await (exists
      ? ctx.prisma.reports_fields.update({
          where: {
            id: exists.id,
          },
          data: {
            removed_fields: remove_fields,
          },
        })
      : ctx.prisma.reports_fields.create({
          data: {
            userlevel: level,
            user_id: affiliate_id,
            rdate: new Date(),
            location: location,
            removed_fields: remove_fields,
          },
        }));
  });
