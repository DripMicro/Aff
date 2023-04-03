import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { affiliate_id } from "@/server/api/routers/affiliates/const";
import moment from "moment/moment";
import type { Prisma } from "@prisma/client";
import { formatISO } from "date-fns";

interface TypeFilter {
  merchant_id?: number;
  TraderID?: string;
  CreativeID?: number;
  Param?: string;
  Country?: string;
  Param2?: string;
}

const buildTypeFilter = (input: any): TypeFilter => {
  const typeFilter: TypeFilter = {};
  const keys = {
    merchant_id: "merchant_id",
    trader_id: "TraderID",
    banner_id: "CreativeID",
    parameter: "Param",
    country: "Country",
    parameter_2: "Param2",
  };

  Object.entries(keys).forEach(([key, value]) => {
    if (input[key]) {
      typeFilter[value as keyof TypeFilter] = input[key];
    }
  });

  return typeFilter;
};

export const getTraderReport = publicProcedure
  .input(
    z.object({
      from: z.date(),
      to: z.date(),
      pageSize: z.number(),
      page: z.number(),
      merchant_id: z.number().optional(),
      country: z.string().optional(),
      banner_id: z.number().optional(),
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
        pageSize,
        page,
        merchant_id,
        country,
        banner_id,
        trader_id,
        parameter,
        parameter_2,
        filter,
      },
    }) => {
      // TODO: check PHP why needed?
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
      // TODO: check PHP why needed?
      const resourceWallet = await ctx.prisma.merchants.findMany({
        where: {
          valid: 1,
        },
        select: {
          wallet_id: true,
          id: true,
        },
      });

      const baseTypeFilter = buildTypeFilter({
        merchant_id,
        country,
        banner_id,
        trader_id,
        parameter,
        parameter_2,
      });

      // type filter
      let type_filter: Prisma.reporttradersWhereInput = {};
      if (filter === "real") {
        type_filter = {
          ...baseTypeFilter,
          TraderStatus: "real",
        };
      } else if (filter === "lead") {
        type_filter = {
          ...baseTypeFilter,
          TraderStatus: "lead",
        };
      } else if (filter === "demo") {
        type_filter = {
          ...baseTypeFilter,
          TraderStatus: "demo",
        };
      } else if (filter === "frozen") {
        type_filter = {
          ...baseTypeFilter,
          TraderStatus: "frozen",
        };
      } else if (filter === "ftd" || filter === "totalftd") {
        type_filter = {
          ...baseTypeFilter,
          AND: [{ TraderStatus: "frozen" }, { TraderStatus: "demo" }],
          FirstDeposit: {
            gte: formatISO(from),
            lt: formatISO(to),
          },
        };
      } else if (filter === "activeTrader") {
        type_filter = {
          ...baseTypeFilter,
          QualificationDate: {
            gte: formatISO(from),
            lt: formatISO(to),
          },
          AND: [{ TraderStatus: "frozen" }, { TraderStatus: "demo" }],
        };
      }

      //trader resource
      let trader_report_resource;
      if (filter === "ftd" || filter === "totalftd") {
        // TODO: missing pagination use https://github.com/sandrewTx08/prisma-paginate
        trader_report_resource = await ctx.prisma.reporttraders.findMany({
          take: pageSize,
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

        // TODO: missing pagination use https://github.com/sandrewTx08/prisma-paginate
        trader_report_resource = await ctx.prisma.reporttraders.findMany({
          take: pageSize,
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
