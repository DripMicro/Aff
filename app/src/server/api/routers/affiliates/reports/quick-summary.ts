import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import {
  affiliate_id,
  merchant_id,
} from "@/server/api/routers/affiliates/const";
import { Prisma } from "@prisma/client";
import { formatISO } from "date-fns";
import { convertPrismaResultsToNumbers } from "@/utils/prisma-convert";
import { QuickReportSummarySchema } from "@/server/api/routers/affiliates/reports";

const QuickReportSummarySchemaArray = z.array(QuickReportSummarySchema);

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
