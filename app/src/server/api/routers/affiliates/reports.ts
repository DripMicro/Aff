import type { data_install_type } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { z } from "zod";

import { formatISO, getUnixTime } from "date-fns";
import { convertPrismaResultsToNumbers } from "../../../../utils/prisma-convert";
import { publicProcedure } from "../../trpc";
import { affiliate_id, merchant_id } from "./const";

type ResultType = {
  [key: string]: any;
};

type CreativeType = {
  [key: string]: any;
};

type Total = {
  [key: string]: number;
};

type MerchantIds = {
  _sum?: {
    Impressions?: number;
    Clicks?: number;
  };
};

type TraderStats = {
  _sum?: {
    spread?: number;
    turnover?: number;
  };
};

type TotalFraud = {
  _sum?: {
    id?: number;
  };
};

type RegType = {
  totalDemo: number;
  totalReal: number;
  total_leads: number;
};

type listProfile = {
  [key: string]: object;
};

type MerchantArray = {
  [key: string]: object;
};

type TotalTraffic = {
  [key: string]: number;
};

type Country = {
  [key: string]: object;
};

type FTDAmount = {
  [key: string]: number;
};

type Row = {
  [key: string]: any;
};

export const QuickReportSummarySchema = z.object({
  Date: z.date().nullish(),
  merchant_id: z.number().nullish(),
  Year: z.number().nullish(),
  Month: z.number().nullish(),
  Week: z.number().nullish(),
  Impressions: z.number().nullish(),
  Clicks: z.number().nullish(),
  Install: z.number().nullish(),
  Leads: z.number().nullish(),
  Demo: z.number().nullish(),
  RealAccount: z.number().nullish(),
  FTD: z.number().nullish(),
  FTDAmount: z.number().nullish(),
  RawFTD: z.number().nullish(),
  RawFTDAmount: z.number().nullish(),
  Deposits: z.number().nullish(),
  DepositsAmount: z.number().nullish(),
  Bonus: z.number().nullish(),
  Withdrawal: z.number().nullish(),
  ChargeBack: z.number().nullish(),
  NetDeposit: z.number().nullish(),
  PNL: z.number().nullish(),
  Volume: z.number().nullish(),
  ActiveTrader: z.number().nullish(),
  Commission: z.number().nullish(),
  PendingDeposits: z.number().nullish(),
  PendingDepositsAmount: z.number().nullish(),
});

export const dataInstallSchema = z.object({
  id: z.number().nullish(),
  rdate: z.date().nullish(),
  ctag: z.number().nullish(),
  affiliate_id: z.number().nullish(),
  group_id: z.number().nullish(),
  banner_id: z.number().nullish(),
  profile_id: z.number().nullish(),
  product_id: z.number().nullish(),
  country: z.number().nullish(),
  trader_id: z.number().nullish(),
  phone: z.string().nullish(),
  trader_alias: z.string().nullish(),
  type: z.string().nullish(),
  freeParam: z.number().nullish(),
  freeParam2: z.number().nullish(),
  freeParam3: z.number().nullish(),
  freeParam4: z.number().nullish(),
  freeParam5: z.number().nullish(),
  merchant_id: z.number().nullish(),
  status: z.number().nullish(),
  lastUpdate: z.date().nullish(),
  platform: z.number().nullish(),
  uid: z.number().nullish(),
  email: z.number().nullish(),
  couponName: z.string().nullish(),
  campaign_id: z.number().nullish(),
  currentDate: z.date().nullish(),
});

export const CommissionReportSchema = z.object({
  merchant_id: z.number().nullish(),
  affiliate_id: z.number().nullish(),
  traderID: z.string().nullish(),
  transactionID: z.string().nullish(),
  Date: z.date().nullish(),
  Type: z.string().nullish(),
  Amount: z.number().nullish(),
  DealType: z.string().nullish(),
  Commission: z.number().nullish(),
  DealTypeCondition: z.string().nullish(),
  level: z.string().nullish(),
  subAffiliateID: z.number().nullish(),
  status: z.string().nullish(),
  updated: z.date().nullish(),
  merchant: z.object({
    name: z.string().nullish(),
  }),
  affiliate: z.object({
    username: z.string().nullish(),
  }),
});

export const CreativeReportSchema = z.object({
  id: z.string().nullish(),
  merchant_id: z.number().nullish(),
  affiliate_id: z.number().nullish(),
  totalViews: z.number().nullish(),
  totalClicks: z.number().nullish(),
  banner_id: z.number().nullish(),
});
const QuickReportSummarySchemaArray = z.array(QuickReportSummarySchema);
const dataInstallSchemaArray = z.array(dataInstallSchema);
const CreativeReportSchemaArray = z.array(CreativeReportSchema);

export const getQuickReportSummary = publicProcedure
  .input(
    z.object({
      from: z.date(),
      to: z.date(),
      display: z.string().optional(),
      merchant_id: z.number().optional(),
      page: z.number().int().optional(),
      items_per_page: z.number().int().optional(),
    })
  )
  .output(QuickReportSummarySchemaArray)
  .query(
    async ({
      ctx,
      input: { from, to, display = "", page, items_per_page },
    }) => {
      console.log(from, to);
      console.log("display type", display, merchant_id);
      let offset;
      if (page && items_per_page) {
        offset = (page - 1) * items_per_page;
      }
      let dasboardSQLperiod = Prisma.sql`GROUP BY d.MerchantId ORDER BY d.MerchantId ASC`;
      let dasboardSQLwhere = Prisma.empty;

      if (display === "monthly") {
        dasboardSQLperiod = Prisma.sql`GROUP BY d.MerchantId, YEAR(d.Date), MONTH(d.Date) ORDER BY YEAR(d.Date) ASC, MONTH(d.Date) ASC, d.MerchantId ASC`;
      }

      if (display === "weekly") {
        dasboardSQLperiod = Prisma.sql`GROUP BY d.MerchantId, YEAR(d.Date), WEEK(d.Date,1) ORDER BY YEAR(d.Date) ASC, WEEK(d.Date,1) ASC, d.MerchantId ASC`;
      }

      if (display === "daily") {
        dasboardSQLperiod = Prisma.sql`GROUP BY d.MerchantId, d.Date ORDER BY d.Date ASC, d.MerchantId ASC`;
      }

      if (merchant_id) {
        dasboardSQLwhere = Prisma.sql` AND d.MerchantId = '${merchant_id}`;
      }

      if (affiliate_id) {
        dasboardSQLwhere = Prisma.sql` AND d.AffiliateID = ${affiliate_id}`;
      }

      const data = await ctx.prisma.$queryRaw<
        z.infer<typeof QuickReportSummarySchema>[]
      >(Prisma.sql`select 
        d.Date,
        d.MerchantId AS merchant_id, 
        YEAR(d.Date) AS Year, 
        MONTH(d.Date) AS Month , 
        WEEK(d.Date) AS Week,
        sum(d.Impressions) as Impressions, 
        sum(d.Clicks) as Clicks,  
        sum(d.Install) as Install, 
        sum(d.Leads) as Leads,  
        sum(d.Demo) as Demo,  
        sum(d.RealAccount) as RealAccount,  
        sum(d.FTD) as FTD,  
        sum(d.FTDAmount) as FTDAmount,  
        sum(d.RawFTD) as RawFTD,  
        sum(d.RawFTDAmount) as RawFTDAmount,  
        sum(d.Deposits) as Deposits,  
        sum(d.DepositsAmount) as DepositsAmount, 
        sum(d.Bonus) as Bonus, 
        sum(d.Withdrawal) as Withdrawal, 
        sum(d.ChargeBack) as ChargeBack, 
        sum(d.NetDeposit) as NetDeposit, 
        sum(d.PNL) as PNL, 
        sum(d.Volume) as Volume, 
        sum(d.ActiveTrader) as ActiveTrader, 
        sum(d.Commission) as Commission, 
        sum(d.PendingDeposits) as PendingDeposits, 
        sum(d.PendingDepositsAmount) as PendingDepositsAmount 
        from Dashboard d
        INNER JOIN affiliates aff ON d.AffiliateID = aff.id
        WHERE 
          d.Date >= ${formatISO(from, { representation: "date" })}
        AND d.Date <  ${formatISO(to, {
          representation: "date",
        })} ${dasboardSQLwhere}  ${dasboardSQLperiod}`);

      console.log("data ----->", data);

      return data?.map(convertPrismaResultsToNumbers) || data;
    }
  );

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

export const getClicksReport = publicProcedure
  .input(
    z.object({
      from: z.date(),
      to: z.date(),
      merchant_id: z.number().optional(),
      unique_id: z.string().optional(),
      trader_id: z.string().optional(),
      type: z.string().optional(),
    })
  )
  .query(
    async ({
      ctx,
      input: { from, to, merchant_id, unique_id, trader_id, type },
    }) => {
      let type_filter = {};

      if (type === "clicks") {
        type_filter = {
          clicks: {
            gt: 0,
          },
        };
      }

      if (type === "views") {
        type_filter = {
          views: {
            gt: 0,
          },
        };
      }

      const listProfiles = await ctx.prisma.affiliates_profiles.findMany({
        where: {
          valid: 1,
        },
        select: {
          name: true,
          id: true,
        },
      });

      console.log("merchant id ------>", merchant_id);
      // const distinct_id = await ctx.prisma.data_reg.findMany({
      // 	select: {
      // 		uid: true,
      // 	},
      // 	where: {
      // 		merchant_id: merchant_id ? merchant_id : 1,
      // 		trader_id: trader_id ? trader_id : "",
      // 	},
      // 	take: 1,
      // });

      const totalRecords = await ctx.prisma.traffic.aggregate({
        where: {
          // uid: {
          //     gt:0,
          // },
          ...type_filter,
          AND: {
            uid: unique_id ? unique_id : "",
          },
          merchant_id: {
            gt: 0,
          },
          unixRdate: {
            gte: getUnixTime(from),
            lt: getUnixTime(to),
          },
        },
        _sum: {
          id: true,
        },
      });

      const clickww = await ctx.prisma.traffic.findMany({
        where: {
          unixRdate: {
            gte: getUnixTime(from),
            lt: getUnixTime(to),
          },
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
          // merchant_creative: {
          // 	select: {
          // 		url: true,
          // 		title: true,
          // 	},
          // },
          // language: {
          // 	select: {
          // 		title: true,
          // 	},
          // },
        },
        take: 10,
      });

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
        $sql = "SELECT data_reg.affiliate_id,data_reg.merchant_id,data_reg.initialftddate,tb1.rdate,data_reg.banner_id,data_reg.trader_id,data_reg.profile_id,tb1.amount, tb1.type AS data_sales_type  ,data_reg.country as country FROM data_sales as tb1 "

                 . "INNER JOIN data_reg AS data_reg ON
                 tb1.merchant_id = data_reg.merchant_id AND
                 tb1.trader_id = data_reg.trader_id AND
                 data_reg.type <> 'demo'  "
                 . "WHERE  tb1.trader_id = " .  $looped_trader_id
            //	 . ' and tb1.rdate between "' . $from . '" AND "' . $to . '"'
                . " and tb1.rdate >= '" . $regDate . "'"
                . " and tb1.merchant_id >0 "
                . (empty($group_id) ? '' : ' AND tb1.group_id = ' . $group_id . ' ')
                 . (!empty($affiliate_id) ? ' and tb1.affiliate_id = ' . $affiliate_id :' ')
                 . (isset($banner_id) && !empty($banner_id) ? ' AND data_reg.banner_id = "'.$banner_id.'"' :' ')
                 .(!empty($unique_id) ? ' and data_reg.uid = ' . $unique_id :' ');

       */

      /**
       * uncomment the include statement below to recreate the issue.
       */
      const salesww = await ctx.prisma.data_sales.findMany({
        include: {
          data_reg: {
            select: {
              affiliate_id: true,
              initialftdtranzid: true,
              banner_id: true,
              trader_id: true,
              country: true,
              profile_id: true,
            },
          },
        },
        where: {
          affiliate_id: affiliate_id,
          merchant_id: {
            gt: 0,
          },
        },
        take: 10,
      });

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
      return merged as Array<ResultType>;
    }
  );

export const getCreativeReport = publicProcedure
  .input(
    z.object({
      from: z.date().optional(),
      to: z.date().optional(),
      banner_id: z.string().optional(),
      type: z.string().optional(),
    })
  )
  .query(async ({ ctx, input: { from, to, banner_id, type } }) => {
    let creatives_stats_where = Prisma.empty;

    if (merchant_id) {
      creatives_stats_where = Prisma.sql`AND MerchantID=${merchant_id}`;
    }

    if (banner_id) {
      creatives_stats_where = Prisma.sql` AND BannerID=${banner_id} `;
    }

    const ww = await ctx.prisma.$queryRaw<
      z.infer<typeof CreativeReportSchema>[]
    >(
      Prisma.sql`SELECT CONCAT(Date,MerchantID,AffiliateID,BannerID) as id, MerchantID as merchant_id, AffiliateID as affiliate_id, SUM(Impressions) AS totalViews, SUM(Clicks) AS totalClicks, BannerID as banner_id 
                        FROM merchants_creative_stats WHERE (Date BETWEEN  ${from}  AND ${to} ) ${creatives_stats_where} GROUP BY BannerID limit 10`
    );

    const merchants = await ctx.prisma.merchants.findMany({
      where: {
        valid: 1,
        id: Number(merchant_id),
      },
    });

    let i = 0;
    let totalLeads = 0;
    let totalDemo = 0;
    let totalReal = 0;
    const ftd = 0;
    const totalCPI = 0;
    const ftd_amount = 0;
    const depositingAccounts = 0;
    const sumDeposits = 0;
    const bonus = 0;
    const cpaAmount = 0;
    const withdrawal = 0;
    const chargeback = 0;
    const volume = 0;
    const lots = 0;
    const totalCom = 0;
    const real_ftd = 0;
    const real_ftd_amount = 0;
    let totalImpresssions = 0;
    let totalClicks = 0;
    let totalLeadAccounts = 0;
    let totalRealAccounts = 0;
    let totalDemoAccounts = 0;
    let totalCPIM = 0;
    let totalFTD = 0;
    let totalFTDAmount = 0;
    let totalRealFTD = 0;
    let totalRealFTDAmount = 0;
    let totalDeposits = 0;
    let totalSumPNL = 0;
    let totalDepositAmount = 0;
    let totalVolume = 0;
    let totalBonusAmount = 0;
    let totalWithdrawalAmount = 0;
    const totalChargeBackAmount = 0;
    const totalPNL = 0;
    let reg = [] as any;
    let bannerInfo = [] as any;
    while (i < Object.keys(ww).length) {
      const banner_info = await ctx.prisma.merchants_creative.findMany({
        select: {
          id: true,
          title: true,
          type: true,
        },
        where: {
          id: Number(ww[i]) ? Number(ww[i]?.banner_id) : 1,
        },
      });

      bannerInfo = banner_info;

      if (type && banner_info[0]?.type !== type) {
        continue;
      }

      const regww = await ctx.prisma.$queryRaw(
        Prisma.sql`SELECT 
            dr.banner_id,
        SUM(cm.Commission) as comms, 
        SUM(IF(dr.type='lead', 1, 0)) AS total_leads, 
        SUM(IF(dr.type='demo', 1, 0)) AS total_demo, 
        SUM(IF(dr.type='real', 1, 0)) AS total_real 
        FROM 445094_devsite.data_reg dr 
        LEFT JOIN 445094_devsite.commissions cm ON dr.trader_id = cm.traderID AND cm.Date BETWEEN ${from} AND ${to}
       GROUP BY dr.banner_id`
      );

      const result: ResultType[] = regww as RegType[];

      if (result && Object.keys(result).length > 0) {
        let _index = 0;
        while (_index <= Object.keys(result).length) {
          totalDemo = result[_index]?.total_demo || 0;
          totalReal = result[_index]?.total_real || 0;
          totalLeads = result[_index]?.total_leads || 0;
          _index++;
        }
      }

      reg = regww;

      const ids: MerchantIds[] = ww as MerchantIds[];

      totalImpresssions += ids[i]?._sum?.Impressions ?? 0;
      totalClicks += ids[i]?._sum?.Clicks ?? 0;
      totalDemoAccounts += totalDemo;
      totalRealAccounts += totalReal;
      totalLeadAccounts += totalLeads;
      totalFTD += ftd;
      totalCPIM += totalCPI;
      totalRealFTD += real_ftd;
      totalRealFTDAmount += real_ftd_amount;
      totalDeposits += depositingAccounts;
      totalFTDAmount += ftd_amount;
      totalSumPNL += totalPNL;
      totalDepositAmount += sumDeposits;
      totalVolume += volume;
      totalBonusAmount += bonus;
      totalWithdrawalAmount += withdrawal;
      totalChargeBackAmount + chargeback;

      i++;
    }

    const merged = [];

    for (let i = 0; i < ww.length; i++) {
      merged.push({
        ...ww[i],
        ...merchants[0],
        ...reg[i],
        ...bannerInfo[0],
      });
    }

    return merged as Array<ResultType>;
  });

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
        take: 2,
      });

      const creativeArray: CreativeType = {};
      creativeArray["banner_ww"] = bannersww;
      creativeArray["banner_type"] = "Non LP Related";

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

      creativeArray["trafficRow"] = trafficRow;

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
      console.log("creative array ------>", trafficRow);

      return creativeArray;
    }
  );

export const getTraderReport = publicProcedure
  .input(
    z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      merchant_id: z.string().optional(),
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
        },
        select: {
          id: true,
          name: true,
        },
        take: 5,
      });

      // profile names
      const listProfiles: listProfile = {};

      listProfiles["wwProfiles"] = profileNames;

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
              gte: from,
              lt: to,
            },
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
      console.log("profile names ------>", listProfiles);

      return trader_report_resource;
    }
  );

export const getpixelLogReport = publicProcedure
  .input(
    z.object({
      from: z.date().optional(),
      to: z.date().optional(),
      merchant_id: z.string().optional(),
      country: z.string().optional(),
      banner_id: z.string().optional(),
      group_id: z.string().optional(),
    })
  )
  .query(
    async ({
      ctx,
      input: { from, to, merchant_id, country, banner_id, group_id },
    }) => {
      let type_filter = {};
      if (banner_id) {
        type_filter = {
          banner_id: banner_id,
        };
      }

      if (group_id) {
        type_filter = {
          group_id: group_id,
        };
      }

      if (country) {
        type_filter = {
          country: country,
        };
      }

      if (merchant_id) {
        type_filter = {
          merchant_id: merchant_id,
        };
      }

      /*
        SELECT pl.id as plid,
          pm.* ,
          pl.*,
          af.username, mr.name, af.group_id, mr.id, af.id as affiliate_id
        FROM pixel_logs AS pl
          left join pixel_monitor pm on
		    pm.id = pl.pixelCode
          left join merchants mr on
            pm.merchant_id = mr.id
          left join affiliates af on
		    pm.affiliate_id = af.id
                                    WHERE 2=2 and " . $globalWhere
                                            . " pl.dateTime BETWEEN '" . $from . "' AND '" . $to . "' "
                                            . " AND pm.merchant_id >0 "

                                            .$whereType

                                            . $where

                                    . " ORDER BY pl.dateTime ASC;";

          //}
       */
      const pixelReport = await ctx.prisma.pixel_logs.findMany({
        orderBy: {
          dateTime: "asc",
        },
        where: {
          ...type_filter,
          dateTime: {
            gte: from,
            lt: to,
          },
        },
        include: {
          pixel_monitor: {
            select: {
              affiliate: {
                select: {
                  username: true,
                  group_id: true,
                  id: true,
                },
              },
              merchant: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      return pixelReport;
    }
  );

export const getProfileReportData = publicProcedure
  .input(
    z.object({
      from: z.date(),
      to: z.date(),
      merchant_id: z.number().optional(),
      search_type: z.string().optional(),
    })
  )
  .query(async ({ ctx, input: { from, to, merchant_id, search_type } }) => {
    const arrGroup = await ctx.prisma.affiliates.findMany({
      select: {
        group_id: true,
      },
      where: {
        id: 500,
      },
    });

    const group_id = arrGroup[0]?.group_id;

    console.log("arr group", group_id);

    let type_filter = {};

    if (group_id) {
      type_filter = {
        group_id: group_id,
      };
    }
    // Initialize total counters per affiliate.
    let totalImpressionsM = 0;
    let totalClicksM = 0;
    const totalCPIM = 0;
    let totalLeadsAccountsM = 0;
    let totalDemoAccountsM = 0;
    let totalRealAccountsM = 0;
    let totalFTDM = 0;
    let totalDepositsM = 0;
    let totalFTDAmountM = 0;
    let totalDepositAmountM = 0;
    let totalVolumeM = 0;
    let totalBonusM = 0;
    const totalLotsM = 0;
    let totalWithdrawalM = 0;
    let totalChargeBackM = 0;
    const totalNetRevenueM = 0;
    let totalComsM = 0;
    const netRevenueM = 0;
    let totalFruadM = 0;
    const totalFrozensM = 0;
    let totalRealFtdM = 0;
    let totalRealFtdAmountM = 0;
    const totalPNLAmountM = 0;
    let isCasinoOrSportBets = false;
    let showLeadsAndDemo = false;
    const showCasinoFields = 0;

    // Initialize total counters per affiliate-merchant.
    let formula = "";
    let totalLeads = 0;
    let totalDemo = 0;
    let totalReal = 0;
    const ftd = 0;
    const cpi = 0;
    const pnl = 0;
    let totalLots = 0;
    let lotdate = new Date();
    let volume = 0;
    let bonus = 0;
    let spreadAmount = 0;
    const turnoverAmount = 0;
    let withdrawal = 0;
    let chargeback = 0;
    let revenue = 0;
    const ftd_amount = 0;
    let depositingAccounts = 0;
    let sumDeposits = 0;
    const netRevenue = 0;
    const totalCom = 0;
    const real_ftd = 0;
    const real_ftd_amount = 0;
    let totalPNL = 0;
    let merchant_name = "";
    const totalTraffic: TotalTraffic = {};
    let merchantId = 0;
    let profile_id = 0;
    let affiliate_id = 0;
    const displayForex = 0;
    let boolTierCplCount = false;
    let earliestTimeForNetRev = new Date();
    const deal_pnl = 0;
    const groupMerchantsPerAffiliate = 0;

    const dateRanges = [
      {
        from,
        to,
      },
    ];
    // switch (search_type) {
    //   case "monthly":

    //     break;

    //   default:
    //     break;
    // }

    console.log("date ranges ----->", dateRanges);
    dateRanges.forEach((date) => {
      (async () => {
        const ww = await ctx.prisma.affiliates_profiles.findMany({
          where: {
            valid: 1,
          },
          include: {
            affiliate: true,
          },
        });

        const merchant_count = await ctx.prisma.merchants.aggregate({
          _sum: {
            id: true,
          },
          where: {
            valid: 1,
            id: merchant_id ? merchant_id : 0,
          },
        });

        const merchant_ww = await ctx.prisma.merchants.findMany({
          where: {
            id: merchant_id ? merchant_id : 0,
          },
          select: {
            id: true,
            name: true,
            type: true,
            producttype: true,
            rev_formula: true,
            wallet_id: true,
          },
        });

        for (let i = 0; i <= Object.keys(merchant_ww).length; i++) {
          if (
            merchant_ww[i]?.producttype === "casino" ||
            merchant_ww[i]?.producttype === "sportbook" ||
            merchant_ww[i]?.producttype === "sportsbetting"
          ) {
            isCasinoOrSportBets = true;
            showLeadsAndDemo = true;
          }

          if (merchant_ww[i]?.producttype === "casino") {
          }

          formula = merchant_ww[i]?.rev_formula ?? "";
          merchant_name = merchant_ww[i]?.name ?? "";
          merchantId = merchant_ww[i]?.id ?? 0;
        }

        let where = "";

        if (!from && !to) {
          where = `sb.unixRdate BETWEEN ${getUnixTime(from)} AND ${getUnixTime(
            to
          )} AND `;
        }

        for (let i = 0; i <= Object.keys(ww).length; i++) {
          if ((ww[i]?.affiliate_id && ww[i]?.affiliate_id) || 0 > 0) {
            where = `sb.affiliate_id=${ww[i]?.affiliate_id ?? 0} AND `;
          }

          if (ww[i]?.id) {
            where = `sb.profile_id = ${ww[i]?.id ?? 0} AND`;
          }

          profile_id = ww[i]?.id ?? 0;
          affiliate_id = ww[i]?.affiliate.id || 0;
        }

        for (let i = 0; i <= Object.keys(merchant_ww).length; i++) {
          if (merchant_ww[i]?.id) {
            where = `sb.merchant_id=${merchant_ww[i]?.id ?? 0} AND `;
          }
        }

        const arrClicksAndImpressions = await ctx.prisma.traffic.groupBy({
          by: ["affiliate_id"],
          where: {
            type: "traffic",
            views: 1,
          },
          _sum: {
            clicks: true,
            views: true, // impressions
          },
        });

        for (let i = 0; i < Object.keys(arrClicksAndImpressions).length; i++) {
          totalTraffic["totalViews"] =
            arrClicksAndImpressions[i]?._sum.views ?? 0;
          totalTraffic["totalClicks"] =
            arrClicksAndImpressions[i]?._sum.clicks ?? 0;
        }
        const count = 1;
        const frozen = await ctx.prisma.data_reg.aggregate({
          where: {
            status: "frozen",
          },
          _count: {
            id: true,
          },
        });

        const regww = await ctx.prisma.data_reg.findMany({
          where: {
            rdate: {
              gte: from,
              lt: to,
            },
            profile_id: profile_id,
            merchant_id: merchantId,
          },
        });

        for (let i = 0; i < Object.keys(regww).length; i++) {
          const arrTierCplCountCommissionParams: Row = {};
          const strAffDealType = await ctx.prisma.affiliates_deals.findMany({
            orderBy: {
              id: "desc",
            },
            where: {
              affiliate_id: regww[i]?.affiliate_id,
              merchant_id: regww[i]?.merchant_id,
            },
            take: 1,
          });

          for (let j = 0; j < Object.keys(strAffDealType).length; j++) {
            if (
              strAffDealType[j]?.tier_type !== null &&
              strAffDealType[j]?.tier_type === "cpl_count"
            ) {
              boolTierCplCount = true;
            }
          }

          if (regww[i]?.type === "lead") {
            totalLeads++;
          }

          if (regww[i]?.type === "demo") {
            totalDemo++;
          }

          if (regww[i]?.type === "real") {
            const arrTemp: Row = {};
            if (!boolTierCplCount) {
              arrTemp["merchant_id"] = regww[i]?.merchant_id;
              arrTemp["affiliate_id"] = regww[i]?.affiliate_id;
              arrTemp["rdate"] = regww[i]?.rdate;
              arrTemp["banner_id"] = regww[i]?.banner_id;
              arrTemp["trader_id"] = regww[i]?.trader_id;
              arrTemp["profile_id"] = regww[i]?.profile_id;
            } else {
              if (
                Object.values(arrTierCplCountCommissionParams).includes(
                  regww[i]?.affiliate_id
                )
              ) {
                arrTierCplCountCommissionParams["amount"]++;
              } else {
                arrTemp["merchant_id"] = regww[i]?.merchant_id;
                arrTemp["affiliate_id"] = regww[i]?.affiliate_id;
                arrTemp["rdate"] = regww[i]?.rdate;
                arrTemp["banner_id"] = regww[i]?.banner_id;
                arrTemp["trader_id"] = regww[i]?.trader_id;
                arrTemp["profile_id"] = regww[i]?.profile_id;
                arrTemp["amount"] = 1;
                arrTemp["tier_type"] = "cpl_count";

                arrTierCplCountCommissionParams[
                  `${regww[i]?.affiliate_id ?? 0}`
                ] = {
                  from: date.from,
                  to: date.to,
                  onlyRevShare: 0,
                  groupId: -1,
                  arrDealTypeDefaults: [],
                  arrTemp: arrTemp,
                };
              }
            }

            totalReal++;
          }
        }

        const sales_ww = await ctx.prisma.data_sales.findMany({
          where: {
            merchant_id: merchantId,
            affiliate_id: affiliate_id,
            profile_id: profile_id,
            rdate: {
              gte: date.from,
              lt: date.to,
            },
          },
        });

        for (let i = 0; i < Object.keys(sales_ww).length; i++) {
          if (earliestTimeForNetRev > (sales_ww[i]?.rdate || new Date())) {
            earliestTimeForNetRev = sales_ww[i]?.rdate ?? new Date();
          }

          if (sales_ww[i]?.type === "deposit") {
            depositingAccounts++;
            sumDeposits += sales_ww[i]?.amount || 0;
          }

          if (sales_ww[i]?.type === "bonus") {
            bonus += sales_ww[i]?.amount || 0;
          }
          if (sales_ww[i]?.type === "revenue") {
            revenue += sales_ww[i]?.amount || 0;
          }
          if (sales_ww[i]?.type === "withdrawal") {
            withdrawal += sales_ww[i]?.amount || 0;
          }
          if (sales_ww[i]?.type === "chargeback") {
            chargeback += sales_ww[i]?.amount || 0;
          }
          if (sales_ww[i]?.type === "volume") {
            volume += sales_ww[i]?.amount || 0;
          }
        }

        if (displayForex) {
          const traderStats = await ctx.prisma.data_stats.groupBy({
            by: ["affiliate_id"],
            where: {
              affiliate_id: affiliate_id,
              profile_id: profile_id,
            },
            _sum: {
              spread: true,
              turnover: true,
            },
          });
          const traders: TraderStats[] = traderStats as TraderStats[];

          for (let i = 0; i < Object.keys(traders).length; i++) {
            spreadAmount = traders[i]?._sum?.spread ?? 0;
            volume = traders[i]?._sum?.turnover ?? 0;
          }

          const traderStats_2 = await ctx.prisma.data_stats.findMany({
            where: {
              profile_id: profile_id,
              merchant_id: merchantId,
              rdate: {
                gte: from,
                lt: to,
              },
            },
            select: {
              turnover: true,
              trader_id: true,
              rdate: true,
              affiliate_id: true,
              banner_id: true,
              profile_id: true,
            },
          });

          for (let i = 0; i < Object.keys(traderStats_2).length; i++) {
            totalLots = traderStats_2[i]?.turnover ?? 0;
            lotdate = traderStats_2[i]?.rdate ?? new Date();
          }
        }

        // if (deal_pnl > 0) {
        // 	const traders = ctx.prisma.`${pnlTable}`.findMany
        // } else {
        // }

        const total_fraud = await ctx.prisma.payments_details.groupBy({
          by: ["id"],
          _sum: {
            id: true,
          },
          where: {
            status: "canceled",
            affiliate_id: affiliate_id,
          },
        });
        const fraud: TotalFraud[] = total_fraud as TotalFraud[];

        for (let i = 0; i < Object.keys(fraud).length; i++) {
          totalFruadM += fraud[i]?._sum?.id ?? 0;
        }

        console.log("wwwwwww ----->", ww);
        console.log("merchant ----->", merchant_ww);

        console.log(
          "arr clicks and impressions ----->",
          arrClicksAndImpressions
        );

        totalImpressionsM += totalTraffic["totalViews"] ?? 0;
        totalClicksM += totalTraffic["totalClicks"] ?? 0;
        totalLeadsAccountsM += totalLeads;
        totalDemoAccountsM += totalDemo;
        totalRealAccountsM += totalReal;
        totalFTDM += ftd;
        totalDepositsM += depositingAccounts;
        totalDepositAmountM += sumDeposits;
        totalFTDAmountM += ftd_amount;
        totalVolumeM += volume;
        totalBonusM += bonus;
        totalWithdrawalM += withdrawal;
        totalChargeBackM += chargeback;
        totalComsM += totalCom;
        totalRealFtdAmountM += real_ftd_amount;
        totalRealFtdM += real_ftd;
        totalPNL += pnl;
      })().catch((err) => {
        throw err;
      });
    });

    return {
      totalImpressionsM,
      totalClicksM,
      totalLeadsAccountsM,
      totalDemoAccountsM,
      totalRealAccountsM,
      totalFTDM,
      totalDepositsM,
      totalDepositAmountM,
      totalFTDAmountM,
      totalVolumeM,
      totalBonusM,
      totalWithdrawalM,
      totalChargeBackM,
      totalComsM,
      totalRealFtdAmountM,
      totalRealFtdM,
      totalPNL,
    };
  });

export const getSubAffiliateReport = publicProcedure
  .input(
    z.object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
  )
  .query(async ({ ctx, input: { from, to } }) => {
    let viewsSum = 0;
    let clicksSum = 0;
    let totalLeads = 0;
    let totalDemo = 0;
    let totalReal = 0;
    let newFTD = 0;
    let ftdAmount = 0;
    let totalBonus = 0;
    let totalWithdrawal = 0;
    let totalChargeback = 0;
    let totalSumLots = 0;
    let totalCommission = 0;
    let totalPNL = 0;
    let total_deposits = 0;
    const merchantArray: MerchantArray = {};

    const mer_rsc = await ctx.prisma.merchants.findMany({
      where: {
        valid: 1,
      },
    });

    let displayForex;
    for (let index = 0; index < Object.keys(mer_rsc).length; index++) {
      if (mer_rsc[index]?.producttype === "forex") {
        displayForex = 1;
      }
    }
    console.log("merchant res");

    merchantArray["arrMerchant"] = mer_rsc;

    const affiliate_ww = await ctx.prisma.affiliates.findMany({
      where: {
        valid: 1,
      },
      select: {
        id: true,
        username: true,
      },
    });

    const total: Total = {};
    const affiliate: any = affiliate_ww;
    let _index = 0;
    while (_index < Object.keys(affiliate_ww).length) {
      let total_leads = 0;
      let total_demo = 0;
      let total_real = 0;
      const new_ftd = 0;
      let totalDeposits = 0;
      let depositsAmount = 0;
      let bonus = 0;
      let withdrawal = 0;
      let chargeback = 0;
      const thisComis = 0;
      let volume = 0;
      let totalLots = 0;
      let lotdate = new Date();
      const row: Row = {};
      const pnlRecordArray: Row = {};
      const deal_pnl = false;
      const tradersProccessedForLots: Row = {};

      console.log("affiliate id ", affiliate_ww[_index]?.id);
      const arrClicksAndImpressions = await ctx.prisma.sub_stats.aggregate({
        where: {
          affiliate_id: affiliate_ww[_index]?.id ?? 0,
        },
        _sum: {
          clicks: true,
          views: true,
        },
      });

      total["viewsSum"] = arrClicksAndImpressions._sum.views ?? 0;
      total["clicksSum"] = arrClicksAndImpressions._sum.clicks ?? 0;

      let line_views = 0;
      let line_clicks = 0;
      let line_leads = 0;
      let line_demo = 0;
      let line_real = 0;
      let line_ftd = 0;
      let line_lots = 0;
      let line_ftd_amount = 0;
      let line_deposits = 0;
      let line_deposits_amount = 0;
      let line_bonus = 0;
      let line_withdrawal = 0;
      let line_chargeback = 0;
      let line_comission = 0;
      const line_pnl = 0;

      line_views = total.viewsSum ?? 0;
      line_clicks = total.clicksSum ?? 0;

      for (const key in merchantArray) {
        const needToSkipMerchant = merchantArray[key] ?? 1;

        const ftd_amount: FTDAmount = {};
        ftd_amount["amount"] = 0;

        const regww = await ctx.prisma.data_reg.findMany({
          where: {
            merchant_id: mer_rsc[0]?.id ?? 1,
            rdate: {
              gte: from,
              lt: to,
            },
            affiliate_id: affiliate_ww[_index]?.id,
          },
          select: {
            id: true,
            type: true,
          },
        });

        let i = 0;
        while (i < Object.keys(regww).length) {
          if (regww[i]?.type === "lead") {
            total_leads++;
          }

          if (regww[i]?.type === "real") {
            total_real++;
          }

          if (regww[i]?.type === "demo") {
            total_demo++;
          }
          i++;
        }

        const sales_ww = await ctx.prisma.data_sales.findMany({
          where: {
            merchant_id: mer_rsc[0]?.id ?? 1,
            rdate: {
              gte: from,
              lt: to,
            },
            affiliate_id: affiliate_ww[_index]?.id,
          },
          select: {
            type: true,
            amount: true,
          },
        });

        let j = 0;
        while (j < Object.keys(sales_ww).length) {
          if (sales_ww[j]?.type === "deposit") {
            depositsAmount += sales_ww[j]?.amount ?? 0;
            totalDeposits++;
          }
          if (sales_ww[j]?.type === "bonus") {
            bonus += sales_ww[j]?.amount ?? 0;
          }

          if (sales_ww[j]?.type === "withdrawal") {
            withdrawal += sales_ww[j]?.amount ?? 0;
          }

          if (sales_ww[j]?.type === "chargeback") {
            chargeback += sales_ww[j]?.amount ?? 0;
          }

          if (sales_ww[j]?.type === "volume") {
            volume += sales_ww[j]?.amount ?? 0;
          }
          j++;
        }

        // if (!needToSkipMerchant) {
        //   const arrFtds =
        // }

        if (mer_rsc[0]?.producttype === "forex") {
          const traderStatus = await ctx.prisma.data_stats.findMany({
            select: {
              turnover: true,
              trader_id: true,
              rdate: true,
              affiliate_id: true,
              product_id: true,
              banner_id: true,
            },
            where: {
              affiliate_id: affiliate_ww[_index]?.id,
              merchant_id: mer_rsc[0].id ?? 1,
              rdate: {
                gte: from,
                lt: to,
              },
            },
          });

          let n = 0;
          while (n < Object.keys(traderStatus).length) {
            if (traderStatus[n]?.affiliate_id === null) {
              continue;
            }

            totalLots = traderStatus[n]?.turnover ?? 0;
            tradersProccessedForLots[
              `${mer_rsc[0]?.id ?? 1} - ${traderStatus[n]?.trader_id ?? 1}`
            ] = `${mer_rsc[0]?.id ?? 1}  - ${traderStatus[n]?.trader_id ?? 1}`;
            lotdate = traderStatus[n]?.rdate ?? new Date();
            row["merchant_id"] = mer_rsc[0]?.id ?? 1;
            row["affiliate_id"] = traderStatus[n]?.affiliate_id ?? 1;
            row["rdate"] = lotdate;
            row["banner_id"] = traderStatus[n]?.banner_id;
            row["trader_id"] = traderStatus[n]?.trader_id;
            row["profile_id"] = traderStatus[n]?.product_id;
            row["type"] = "lots";
            row["amount"] = totalLots;

            line_lots += totalLots;
            n++;
          }
        }

        if (deal_pnl) {
          pnlRecordArray["affiliate_id"] = "";
          pnlRecordArray["merchant_id"] = mer_rsc[0]?.id;
          pnlRecordArray["trader_id"] = "";
          pnlRecordArray["banner_id"] = "";
          pnlRecordArray["profile_id"] = "";
          pnlRecordArray["group_id"] = pnlRecordArray["searchInSql"] = "";
          pnlRecordArray["fromdate"] = from;
          pnlRecordArray["todate"] = to;
        }

        line_leads += total_leads;
        line_demo += total_demo;
        line_real += total_real;
        line_ftd += new_ftd;
        line_ftd_amount += ftd_amount["amount"];
        line_deposits += totalDeposits;
        line_deposits_amount += depositsAmount;
        line_bonus += bonus;
        line_withdrawal += withdrawal;
        line_chargeback += chargeback;
        line_comission += 0;
      }

      viewsSum += line_views;
      clicksSum += line_clicks;
      totalLeads += line_leads;
      totalDemo += line_demo;
      totalReal += line_real;
      newFTD += line_ftd;
      totalBonus += line_bonus;
      total_deposits += line_deposits;
      totalWithdrawal += line_withdrawal;
      totalPNL += line_pnl;
      ftdAmount += line_ftd_amount;
      totalChargeback += line_chargeback;
      totalCommission += line_comission;
      totalSumLots += line_lots;

      _index++;
    }

    return {
      viewsSum,
      clicksSum,
      totalLeads,
      totalDemo,
      totalReal,
      newFTD,
      totalBonus,
      total_deposits,
      totalWithdrawal,
      totalPNL,
      ftdAmount,
      totalChargeback,
      totalCommission,
      totalSumLots,
    };
  });

export const getDataInstall = publicProcedure.query(async ({ ctx }) => {
  const data = await ctx.prisma.data_install.findMany({
    select: {
      type: true,
    },
    where: {
      merchant_id: {
        gt: 1,
      },
      // valid: 1,
    },
  });

  return data;
});

export const getAllMerchants = publicProcedure.query(async ({ ctx }) => {
  const merchants = await ctx.prisma.merchants.findMany({
    where: {
      valid: 1,
    },
  });

  return merchants;
});

export const getAffiliateProfile = publicProcedure.query(async ({ ctx }) => {
  const affiliates = await ctx.prisma.affiliates_profiles.findMany({
    where: {
      valid: 1,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return affiliates;
});

export const getLongCountries = publicProcedure
  .input(
    z.object({
      table_type: z.string().optional(),
    })
  )
  .query(async ({ ctx, input: { table_type } }) => {
    const ww = await ctx.prisma.countries.findMany({
      where: {
        id: {
          gt: 1,
        },
      },
      select: {
        id: true,
        title: true,
        code: true,
      },
    });

    return ww;
  });
