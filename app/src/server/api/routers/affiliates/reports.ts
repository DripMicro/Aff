import { z } from "zod";
import { publicProcedure } from "../../trpc";

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
const dataInstallSchemaArray = z.array(dataInstallSchema);
const CreativeReportSchemaArray = z.array(CreativeReportSchema);

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
    select: {
      id: true,
      name: true,
    },
  });

  return merchants.map(({ id, name }) => ({ id, title: name }));
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
