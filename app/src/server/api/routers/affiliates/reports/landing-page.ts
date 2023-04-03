import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import type { data_sales_type } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { affiliate_id } from "@/server/api/routers/affiliates/const";

export const getLandingPageData = publicProcedure
  .input(
    z.object({
      from: z.date().optional(),
      to: z.date().optional(),
      merchant_id: z.number().optional(),
      url: z.string().optional(),
      creative_type: z.string().optional(),
    })
  )
  .query(
    async ({ ctx, input: { from, to, merchant_id, url, creative_type } }) => {
      const bannersww = await ctx.prisma.merchants_creative.findMany({
        where: {
          merchant_id: merchant_id,
          valid: 1,
        },
        include: {
          language: {
            select: {
              title: true,
            },
          },
          merchant: {
            select: {
              name: true,
            },
          },
        },
        take: 5,
      });

      //clicks and impressions
      const trafficRow = await ctx.prisma.traffic.groupBy({
        by: ["banner_id", "id"],
        _sum: {
          clicks: true,
          views: true,
        },
        where: {
          merchant_id: {
            gt: 0,
          },
          rdate: {
            gte: from,
            lt: to,
          },
        },
      });

      const regww = await ctx.prisma.data_reg.findMany({
        include: {
          merchant: {
            select: {
              name: true,
            },
          },
        },
        where: {
          merchant_id: {
            gt: 0,
          },
          rdate: {
            gte: from,
            lt: to,
          },
        },
      });

      //Qualified

      const group_id = null;
      const trader_id = null;
      const selected_group_id = group_id
        ? Prisma.sql` and group_id = ${group_id}`
        : Prisma.empty;

      const FILTERbyTrader = trader_id
        ? Prisma.sql` and trader_id=  ${trader_id}`
        : Prisma.empty;

      const arrFtd = await ctx.prisma.$queryRaw(Prisma.sql`
			SELECT * FROM data_reg where type<>'demo' and FTDqualificationDate>'0000-00-00 00:00:00' and FTDqualificationDate >${from} and FTDqualificationDate < ${to} and affiliate_id = ${affiliate_id} and merchant_id = ${merchant_id}
			${selected_group_id}
			${FILTERbyTrader}
			`);

      interface SalesWWType {
        affiliate_id: number;
        merchant_id: number;
        initialftddate: string;
        rdate: Date;
        banner_id: number;
        trader_id: string;
        group_id: number;
        profile_id: number;
        amount: number;
        type: data_sales_type;
        country: string;
        tranz_id: number;
      }

      const banner_id = null;
      const cond_group_id = group_id
        ? Prisma.sql`AND tb1.group_id = ${group_id}`
        : Prisma.empty;

      const cond_banner_id = banner_id
        ? Prisma.sql` AND tb1.banner_id = ${banner_id}`
        : Prisma.empty;

      const cond_affiliate_id = affiliate_id
        ? Prisma.sql`AND tb1.affiliate_id = ${affiliate_id}`
        : Prisma.empty;

      const salesww = await ctx.prisma.$queryRaw<SalesWWType[]>`select * from (
			SELECT data_reg.merchant_id,data_reg.affiliate_id,data_reg.initialftddate,tb1.rdate,tb1.tranz_id,data_reg.banner_id,data_reg.trader_id,data_reg.group_id,data_reg.profile_id,tb1.amount, tb1.type AS data_sales_type  ,data_reg.country as country FROM data_sales as tb1 
					  INNER JOIN merchants_creative mc on mc.id= tb1.banner_id 
					 INNER JOIN data_reg AS data_reg ON tb1.merchant_id = data_reg.merchant_id AND tb1.trader_id = data_reg.trader_id AND data_reg.type <> 'demo'  
					 WHERE tb1.merchant_id> 0 and mc.valid=1 and tb1.rdate BETWEEN ${from} AND ${to}
					 ${cond_banner_id} ${cond_group_id} ${cond_affiliate_id}
					  ) a group by merchant_id , tranz_id , data_sales_type
`;
      let bonus = 0;
      let withdrawal = 0;
      let chargeback = 0;
      let volume = 0;
      const SalesArray = [];
      for (let i = 0; i < salesww.length; i++) {
        if (salesww[i]?.type === "bonus") {
          bonus = salesww[i]?.amount ?? 0;
          SalesArray.push({
            bonus: salesww[i]?.amount ?? 0,
          });
        }
        if (salesww[i]?.type === "withdrawal") {
          withdrawal = salesww[i]?.amount ?? 0;
          SalesArray.push({
            withdrawal: salesww[i]?.amount ?? 0,
          });
        }

        if (salesww[i]?.type === "chargeback") {
          chargeback = salesww[i]?.amount ?? 0;
          SalesArray.push({
            chargeback: salesww[i]?.amount ?? 0,
          });
        }

        if (salesww[i]?.type === "volume") {
          volume = salesww[i]?.amount ?? 0;
          SalesArray.push({
            volume: salesww[i]?.amount ?? 0,
          });
        }
      }

      const revww: any = await ctx.prisma.data_stats.findMany({
        select: {
          affiliate_id: true,
          banner_id: true,
          merchant_id: true,
          merchant: {
            select: {
              producttype: true,
              name: true,
            },
          },
          // data_reg: {
          // 	select: {
          // 		country: true,
          // 	},
          // },
        },
        where: {
          rdate: {
            gt: from,
            lt: to,
          },
          merchant_id: {
            gt: 0,
          },
          banner_id: banner_id ? banner_id : 0,
        },
      });

      const merchantww = await ctx.prisma.merchants.findMany({
        where: {
          producttype: "Forex",
          valid: 1,
        },
      });

      let traderStats: any[] = [];

      for (let i = 0; i < merchantww.length; i++) {
        const ts = await ctx.prisma.data_stats.groupBy({
          by: ["banner_id"],
          _sum: {
            spread: true,
            pnl: true,
            turnover: true,
          },
          where: {
            affiliate_id: affiliate_id,
            merchant_id: merchantww[i]?.id ? merchantww[i]?.id : 1,
            // banner_id: banner_id ? banner_id : 0,
            // group_id: group_id ? group_id : 0,
            rdate: {
              gt: from,
              lt: to,
            },
          },
        });
        traderStats = ts;
      }

      const creativeArray = [];
      const traffic: any = Object.values(trafficRow);
      for (let i = 0; i < bannersww.length; i++) {
        creativeArray.push({
          ...bannersww[i],
          ...traffic[i],
          ...regww[i],
          ...revww[i],
          ...SalesArray[i],
          volume: traderStats[i]?._sum?.turnover ?? 0,
          cpi: 0,
        });
      }

      console.log("creative array ---->", creativeArray);

      return creativeArray as Record<string, any>;
    }
  );
