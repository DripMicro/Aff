import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { getUnixTime } from "date-fns";
import { affiliate_id } from "@/server/api/routers/affiliates/const";
import { data_sales_type, Prisma } from "@prisma/client";

export const getClicksReport = publicProcedure
  .input(
    z.object({
      from: z.date(),
      to: z.date(),
      merchant_id: z.number().optional(),
      unique_id: z.string().optional(),
      trader_id: z.string().optional(),
      type: z.enum(["clicks", "views"]).optional(),
    })
  )
  .query(
    async ({
      ctx,
      input: { from, to, merchant_id, unique_id, trader_id, type },
    }) => {
      type TypeFilter = {
        clicks?: {
          gt: number;
        };
        views?: {
          gt: number;
        };
      };

      const getTypeFilter = (type?: "clicks" | "views"): TypeFilter => {
        if (type === "clicks" || type === "views") {
          return { [type]: { gt: 0 } };
        }
        return {};
      };

      const listProfiles = async () =>
        ctx.prisma.affiliates_profiles.findMany({
          where: { valid: 1 },
          select: { name: true, id: true },
        });

      const getTotalRecords = async (
        type_filter: TypeFilter,
        unique_id: string | undefined,
        from: Date,
        to: Date
      ) =>
        ctx.prisma.traffic.aggregate({
          where: {
            ...type_filter,
            AND: { uid: unique_id || "" },
            merchant_id: { gt: 0 },
            unixRdate: {
              gte: getUnixTime(from),
              lt: getUnixTime(to),
            },
          },
          _sum: { id: true },
        });

      const getClickWW = async (from: Date, to: Date) =>
        ctx.prisma.traffic.findMany({
          where: {
            unixRdate: {
              gte: getUnixTime(from),
              lt: getUnixTime(to),
            },
          },
          include: {
            merchant: { select: { name: true } },
            affiliate: { select: { username: true } },
          },
          take: 10,
        });

      const type_filter = getTypeFilter(type);
      const list_profiles = await listProfiles();
      const totalRecords = await getTotalRecords(
        type_filter,
        unique_id,
        from,
        to
      );
      const clickww = await getClickWW(from, to);
      const regArr = [];

      if (Object.keys(clickww).length > 0) {
        for (let key = 0; key < Object.keys(clickww).length; key++) {
          if (Number(clickww[key]?.uid) > 0) {
            const regg = await ctx.prisma.data_reg.findMany({
              where: {
                merchant_id: {
                  gt: 0,
                },
                affiliate_id: affiliate_id,
                rdate: {
                  gte: clickww[key]?.rdate,
                },
                // uid: clickww[key]?.uid,
              },
              take: 1,
            });
            let leads = 0;
            let demo = 0;
            let real = 0;

            for (let i = 0; i < Object.keys(regg).length; i++) {
              regArr.push({
                id: regg[i]?.id,
                rdate: regg[i]?.rdate,
                affiliate_id: regg[i]?.affiliate_id,
                trader_id: regg[i]?.trader_id,
                merchant_id: regg[i]?.merchant_id,
                trader_alias: regg[i]?.trader_alias,
                sales_status: regg[i]?.saleStatus,
              });

              if (regg[i]?.type === "lead") {
                leads += 1;
              }

              if (regg[i]?.type === "demo") {
                demo += 1;
              }

              if (regg[i]?.type === "real") {
                real += 1;
              }
            }
          }
        }
      }

      /*
              $sql = "SELECT data_reg.affiliate_id,data_reg.merchant_id,data_reg.initialftddate,tb1.rdate,data_reg.banner_id,data_reg.trader_id,data_reg.profile_id,tb1.amount, tb1.type AS data_sales_type  ,data_reg.country as country
              FROM data_sales as tb1 "
      
                       . "INNER JOIN data_reg AS data_reg ON
                       tb1.merchant_id = data_reg.merchant_id AND
                       tb1.trader_id = data_reg.trader_id AND
                       data_reg.type <> 'demo'  "
                       . "WHERE  tb1.trader_id = " .  $looped_trader_id
                      . " and tb1.rdate >= '" . $regDate . "'"
                      . " and tb1.merchant_id >0 "
                      . (empty($group_id) ? '' : ' AND tb1.group_id = ' . $group_id . ' ')
                       . (!empty($affiliate_id) ? ' and tb1.affiliate_id = ' . $affiliate_id :' ')
                       . (isset($banner_id) && !empty($banner_id) ? ' AND data_reg.banner_id = "'.$banner_id.'"' :' ')
                       .(!empty($unique_id) ? ' and data_reg.uid = ' . $unique_id :' ');
      
             */

      interface SalesWWType {
        affiliate_id: number;
        merchant_id: number;
        initialftddate: string;
        rdate: Date;
        banner_id: number;
        trader_id: string;
        profile_id: number;
        amount: number;
        type: data_sales_type;
        country: string;
      }

      const group_id = null;
      const cond_group_id = group_id
        ? Prisma.sql`AND tb1.group_id = ${group_id}`
        : Prisma.empty;

      const cond_unique_id = unique_id
        ? Prisma.sql`AND data_reg.uid = ${unique_id}`
        : Prisma.empty;

      const salesww = await ctx.prisma.$queryRaw<SalesWWType[]>`SELECT     
           data_reg.affiliate_id,
           data_reg.merchant_id,
           data_reg.initialftddate,
           tb1.rdate,
           data_reg.banner_id,
           data_reg.trader_id,
           data_reg.profile_id,
           tb1.amount,
           tb1.type         AS data_sales_type ,
           data_reg.country AS country
FROM       data_sales       AS tb1
INNER JOIN data_reg         AS data_reg
ON         tb1.merchant_id = data_reg.merchant_id
AND        tb1.trader_id = data_reg.trader_id
AND        data_reg.type <> 'demo'
WHERE      tb1.trader_id = ${trader_id}
AND        tb1.rdate >= ${from}
AND        tb1.merchant_id >0
${cond_group_id}
${cond_unique_id}
`;
      // (empty($group_id) ? '' : ' AND tb1.group_id = ' . $group_id . ' ')                 . (!empty($affiliate_id) ? ' and tb1.affiliate_id = ' . $affiliate_id :' ')                 . (isset($banner_id) && !empty($banner_id) ? ' AND data_reg.banner_id = "'.$banner_id.'"' :' ')
      // .(!empty($unique_id) ? ' and data_reg.uid = ' . $unique_id :' ');`;

      /**
       * uncomment the include statement below to recreate the issue.
       */
      // const salesww = await ctx.prisma.data_sales.findMany({
      //   include: {
      //     data_reg: {
      //       select: {
      //         affiliate_id: true,
      //         initialftdtranzid: true,
      //         banner_id: true,
      //         trader_id: true,
      //         country: true,
      //         profile_id: true,
      //       },
      //     },
      //   },
      //   where: {
      //     affiliate_id: affiliate_id,
      //     merchant_id: {
      //       gt: 0,
      //     },
      //   },
      //   take: 10,
      // });

      // 		const salesww = await ctx.prisma
      // 			.$queryRaw(Prisma.sql`SELECT data_reg.affiliate_id,data_reg.merchant_id,data_reg.initialftddate,tb1.rdate,data_reg.banner_id,data_reg.trader_id,data_reg.profile_id,tb1.amount, tb1.type AS data_sales_type  ,data_reg.country as country FROM data_sales as tb1

      //   INNER JOIN data_reg AS data_reg ON tb1.merchant_id = data_reg.merchant_id AND tb1.trader_id = data_reg.trader_id AND data_reg.type = 'demo'
      //   WHERE tb1.merchant_id > 0`);
      console.log("sales ww ------>", salesww);
      let bonus = 0;
      let volume = 0;
      let chargeback = 0;
      let withdrawal = 0;
      let depositingAccounts = 0;
      let sumDeposits = 0;
      const balance_sheet = [];

      for (let i = 0; i < salesww.length; i++) {
        if (salesww[i]?.type === "deposit") {
          depositingAccounts += 1;
          sumDeposits += salesww[i]?.amount || 0;
        }
        if (salesww[i]?.type === "bonus") {
          bonus += salesww[i]?.amount || 0;
        }

        if (salesww[i]?.type === "withdrawal") {
          withdrawal += salesww[i]?.amount || 0;
        }

        if (salesww[i]?.type === "volume") {
          volume += salesww[i]?.amount || 0;
        }

        if (salesww[i]?.type === "chargeback") {
          chargeback += salesww[i]?.amount || 0;
        }

        balance_sheet.push({
          volume,
          bonus,
          chargeback,
          withdrawal,
        });
      }

      const revww = await ctx.prisma.data_stats.findMany({
        include: {
          merchant: {
            select: {
              producttype: true,
            },
          },
        },
      });

      const merged = [];

      for (let i = 0; i < clickww.length; i++) {
        merged.push({
          ...clickww[i],
          ...regArr[i],
          ...balance_sheet[i],
        });
      }
      // console.log(regArr);
      // console.log(balance_sheet);

      return merged;
    }
  );
