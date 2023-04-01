import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { affiliate_id } from "@/server/api/routers/affiliates/const";
import moment from "moment/moment";

export const getTraderReport = publicProcedure
  .input(
    z.object({
      from: z.date().optional(),
      to: z.date().optional(),
      merchant_id: z.number().optional(),
      country: z.string().optional(),
      banner_id: z.string().optional(),
      trader_id: z.string().optional(),
      parameter: z.string().optional(),
      parameter_2: z.string().optional(),
      filter: z.string().optional(),
    })
  )
  .query(
    async ({
      ctx,
      input: {
        from,
        to,
        merchant_id,
        country,
        banner_id,
        trader_id,
        parameter,
        parameter_2,
        filter,
      },
    }) => {
      const profileNames = await ctx.prisma.affiliates_profiles.findMany({
        where: {
          valid: 1,
          affiliate_id: affiliate_id,
        },
        select: {
          id: true,
          name: true,
        },
        take: 5,
      });

      // list of wallets
      const resourceWallet = await ctx.prisma.merchants.findMany({
        where: {
          valid: 1,
        },
        select: {
          wallet_id: true,
          id: true,
        },
      });

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

      if (parameter) {
        type_filter = {
          Param: parameter,
        };
      }

      if (country) {
        type_filter = {
          Country: country,
        };
      }

      if (parameter_2) {
        type_filter = {
          Param2: parameter_2,
        };
      }
      if (filter === "real") {
        type_filter = {
          TraderStatus: "real",
        };
      } else if (filter === "lead") {
        type_filter = {
          TraderStatus: "lead",
        };
      } else if (filter === "demo") {
        type_filter = {
          TraderStatus: "demo",
        };
      } else if (filter === "frozen") {
        type_filter = {
          TraderStatus: "frozen",
        };
      } else if (filter === "ftd" || filter === "totalftd") {
        type_filter = {
          AND: [{ TraderStatus: "frozen" }, { TraderStatus: "demo" }],
          FirstDeposit: {
            gte: from,
            lt: to,
          },
        };
      } else if (filter === "activeTrader") {
        type_filter = {
          QualificationDate: {
            gte: from,
            lt: to,
          },
          AND: [{ TraderStatus: "frozen" }, { TraderStatus: "demo" }],
        };
      }

      //trader resource
      let trader_report_resource;
      if (filter === "ftd" || filter === "totalftd") {
        trader_report_resource = await ctx.prisma.reporttraders.findMany({
          orderBy: {
            RegistrationDate: "desc",
            TraderID: "asc",
          },
          where: {
            ...type_filter,
            affiliate_id: affiliate_id,
          },
          include: {
            data_reg: {
              select: {
                saleStatus: true,
                freeParam5: true,
              },
            },
            affiliate: {
              select: {
                group_id: true,
              },
            },
          },
        });
      } else {
        // "SELECT rt.*,
        //    dr.saleStatus as SaleStatusOriginal,
        //    dr.freeParam5 as freeParam5,
        //    aff.group_id as GroupID
        //    FROM ReportTraders rt
        //      INNER JOIN affiliates aff ON rt.AffiliateID = aff.id
        //      INNER JOIN data_reg dr ON dr.trader_id = rt.TraderID
        //    WHERE 1=1 ".$where."
        //    ORDER BY RegistrationDate DESC, rt.TraderID ASC";

        trader_report_resource = await ctx.prisma.reporttraders.findMany({
          orderBy: {
            TraderID: "asc",
          },
          where: {
            ...type_filter,
            RegistrationDate: {
              gte: moment(from).toISOString(),
              lt: moment(to).toISOString(),
            },
            affiliate_id: affiliate_id,
          },
          include: {
            data_reg: {
              select: {
                saleStatus: true,
                freeParam5: true,
              },
            },
            affiliate: {
              select: {
                group_id: true,
              },
            },
          },
        });
      }
      // console.log("profile names ------>", listProfiles);
      console.log("profile names ------>", trader_report_resource);

      const merged = [];

      for (let i = 0; i < trader_report_resource.length; i++) {
        merged.push({
          ...trader_report_resource[i],
          sub_trader_count: "",
          totalLots: 0,
        });
      }

      return merged;
    }
  );
