import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { merchant_id } from "@/server/api/routers/affiliates/const";
import type { CreativeReportSchema } from "@/server/api/routers/affiliates/reports";

type RegType = {
  totalDemo: number;
  totalReal: number;
  total_leads: number;
};

type MerchantIds = {
  _sum?: {
    Impressions?: number;
    Clicks?: number;
  };
};

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

      const result: Record<string, any>[] = regww as RegType[];

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

    return merged as Array<Record<string, any>>;
  });
