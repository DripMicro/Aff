import * as z from "zod"
import * as imports from "../zod-add-schema"
import { merchants_type, merchants_qualify_type } from "@prisma/client"
import { Completemerchants_affiliate_level, Relatedmerchants_affiliate_levelModel, Completemerchants_creative, Relatedmerchants_creativeModel, Completeaffiliates_traffic, Relatedaffiliates_trafficModel, Completeapicredentials, RelatedapicredentialsModel, Completecron_logs, Relatedcron_logsModel, Completedata_install, Relateddata_installModel, Completedata_reg, Relateddata_regModel, Completedata_sales, Relateddata_salesModel, Completedata_sales_pending, Relateddata_sales_pendingModel, Completedata_stats, Relateddata_statsModel, Completemerchants_creative_categories, Relatedmerchants_creative_categoriesModel, Completemerchants_promotions, Relatedmerchants_promotionsModel, Completestats_banners, Relatedstats_bannersModel, Completesub_banners, Relatedsub_bannersModel, Completetraders_tag, Relatedtraders_tagModel, Completetraffic, RelatedtrafficModel, Completedashboard, RelateddashboardModel, Completecommissions, RelatedcommissionsModel, Completepixel_monitor, Relatedpixel_monitorModel } from "./index"

export const merchantsModel = z.object({
  id: z.number().int(),
  rdate: z.date(),
  valid: z.number().int(),
  pos: z.number().int(),
  name: z.string(),
  type: z.nativeEnum(merchants_type),
  website: z.string(),
  address: z.string(),
  zipCode: z.string(),
  manager: z.string(),
  country: z.string(),
  email: z.string(),
  contract: z.string(),
  name_1: z.string(),
  mail_1: z.string(),
  phone_1: z.string(),
  name_2: z.string(),
  mail_2: z.string(),
  phone_2: z.string(),
  name_3: z.string(),
  mail_3: z.string(),
  phone_3: z.string(),
  name_4: z.string(),
  mail_4: z.string(),
  phone_4: z.string(),
  name_5: z.string(),
  mail_5: z.string(),
  phone_5: z.string(),
  cpa_amount: z.number(),
  dcpa_amount: z.number(),
  revenue_amount: z.number(),
  cpl_amount: z.number(),
  cpi_amount: z.number(),
  cpc_amount: z.number(),
  pnl_amount: z.number(),
  cpm_amount: z.number(),
  min_cpa_amount: z.number(),
  tier_amount: z.boolean(),
  default_commissions: z.number(),
  params: z.string(),
  incomingParam: z.string(),
  incomingParamAlternative: z.string(),
  flashTag: z.string(),
  cron_file: z.string(),
  producttype: z.string(),
  campaignparamname: z.string(),
  campaignid: z.string(),
  campaignispartofparams: z.boolean(),
  LogoURL: z.string(),
  StylingURL: z.string(),
  toAutoRelateCampToAff: z.boolean(),
  apiType: z.string(),
  defaultAffiliateID: z.number().int(),
  APIurl: z.string(),
  APIuser: z.string(),
  APIpass: z.string(),
  api_token2: z.string(),
  API_whiteLabelId: z.string(),
  apiToken: z.string(),
  extraMemberParamName: z.string(),
  extraMemberParamValue: z.string(),
  isMustField: z.string(),
  mustFields: z.string(),
  showDataForAffiliateSince: z.date(),
  PaymentColors: z.string(),
  lastSaleStatusUpade: z.date().nullish(),
  lastSaleStatusUpdate: z.date(),
  rev_formula: z.string(),
  wallet_id: z.number().int(),
  revenue_spread_amount: z.number(),
  positions_rev_share: z.number(),
  lots_amount: z.number(),
  qualify_amount: z.number().nullish(),
  qualify_type: z.nativeEnum(merchants_qualify_type).nullish(),
  subbrandof: z.string(),
  showLeadsNdemo: z.boolean(),
  lowestAmountPendingDeposit: z.number(),
  postbackIPlimit: z.string(),
  randomKey: z.string(),
  isSelfManaged: z.number().int(),
  cronjoburl: z.string(),
})

export interface Completemerchants extends z.infer<typeof merchantsModel> {
  merchants_affiliate_level: Completemerchants_affiliate_level[]
  merchants_creative: Completemerchants_creative[]
  affiliates_traffic: Completeaffiliates_traffic[]
  apicredentials: Completeapicredentials[]
  cron_logs: Completecron_logs[]
  data_install: Completedata_install[]
  data_reg: Completedata_reg[]
  data_sales: Completedata_sales[]
  data_sales_pending: Completedata_sales_pending[]
  data_stats: Completedata_stats[]
  merchants_creative_categories: Completemerchants_creative_categories[]
  merchants_promotions: Completemerchants_promotions[]
  stats_banners: Completestats_banners[]
  sub_banners: Completesub_banners[]
  traders_tag: Completetraders_tag[]
  traffic: Completetraffic[]
  dashboard: Completedashboard[]
  commissions: Completecommissions[]
  pixel_monitor: Completepixel_monitor[]
}

/**
 * RelatedmerchantsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedmerchantsModel: z.ZodSchema<Completemerchants> = z.lazy(() => merchantsModel.extend({
  merchants_affiliate_level: Relatedmerchants_affiliate_levelModel.array(),
  merchants_creative: Relatedmerchants_creativeModel.array(),
  affiliates_traffic: Relatedaffiliates_trafficModel.array(),
  apicredentials: RelatedapicredentialsModel.array(),
  cron_logs: Relatedcron_logsModel.array(),
  data_install: Relateddata_installModel.array(),
  data_reg: Relateddata_regModel.array(),
  data_sales: Relateddata_salesModel.array(),
  data_sales_pending: Relateddata_sales_pendingModel.array(),
  data_stats: Relateddata_statsModel.array(),
  merchants_creative_categories: Relatedmerchants_creative_categoriesModel.array(),
  merchants_promotions: Relatedmerchants_promotionsModel.array(),
  stats_banners: Relatedstats_bannersModel.array(),
  sub_banners: Relatedsub_bannersModel.array(),
  traders_tag: Relatedtraders_tagModel.array(),
  traffic: RelatedtrafficModel.array(),
  dashboard: RelateddashboardModel.array(),
  commissions: RelatedcommissionsModel.array(),
  pixel_monitor: Relatedpixel_monitorModel.array(),
}))
