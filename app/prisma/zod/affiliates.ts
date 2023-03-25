import * as z from "zod"
import * as imports from "../zod-add-schema"
import { affiliates_gender, affiliates_paymentMethod, affiliates_qualify_type, affiliates_type } from "@prisma/client"
import { Completeaffiliates_deals, Relatedaffiliates_dealsModel, Completeaffiliates_msgs, Relatedaffiliates_msgsModel, Completeaffiliates_notes, Relatedaffiliates_notesModel, Completeaffiliates_profiles, Relatedaffiliates_profilesModel, Completeaffiliates_static_data, Relatedaffiliates_static_dataModel, Completeaffiliates_tickets, Relatedaffiliates_ticketsModel, Completeaffiliates_traffic, Relatedaffiliates_trafficModel, Completedashboard, RelateddashboardModel, Completedata_install, Relateddata_installModel, Completedata_reg, Relateddata_regModel, Completedata_sales, Relateddata_salesModel, Completedata_sales_pending, Relateddata_sales_pendingModel, Completedata_stats, Relateddata_statsModel, Completemerchants_affiliate_level, Relatedmerchants_affiliate_levelModel, Completepayments_details, Relatedpayments_detailsModel, Completepayments_paid, Relatedpayments_paidModel, Completeproducts_affiliates_deals, Relatedproducts_affiliates_dealsModel, Completereporttraders, RelatedreporttradersModel, Completestats_banners, Relatedstats_bannersModel, Completesub_stats, Relatedsub_statsModel, Completetrackerconversion, RelatedtrackerconversionModel, Completetraffic, RelatedtrafficModel, Completecommissions, RelatedcommissionsModel, Completepixel_monitor, Relatedpixel_monitorModel } from "./index"

export const affiliatesModel = z.object({
  id: z.number().int(),
  rdate: z.date(),
  valid: z.number().int(),
  lang: z.string(),
  language_id: z.number().int(),
  ip: z.string(),
  group_id: z.number().int(),
  refer_id: z.number().int(),
  refer_banner_id: z.number().int(),
  username: z.string(),
  password: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  mail: z.string(),
  website: z.string(),
  website2: z.string(),
  website3: z.string(),
  phone: z.string(),
  street: z.string(),
  postalCode: z.string(),
  city: z.string(),
  gender: z.nativeEnum(affiliates_gender),
  company: z.string(),
  country: z.string(),
  marketInfo: z.string(),
  newsletter: z.number().int(),
  IMUser: z.string(),
  IMUserType: z.string(),
  logged: z.number().int(),
  paymentMethod: z.nativeEnum(affiliates_paymentMethod),
  pay_firstname: z.string(),
  pay_lastname: z.string(),
  pay_mail: z.string(),
  pay_account: z.string(),
  account_name: z.string(),
  account_number: z.string(),
  pay_info: z.string(),
  pay_bank: z.string(),
  pay_swift: z.string(),
  pay_iban: z.string(),
  pay_branch: z.string(),
  pay_email: z.string(),
  pay_address1: z.string(),
  pay_address2: z.string(),
  pay_city: z.string(),
  pay_state: z.string(),
  pay_zip: z.string(),
  pay_country: z.number().int(),
  pay_company: z.string(),
  preferredCurrency: z.string(),
  merchants: z.string(),
  credit: z.number(),
  sub_com: z.number(),
  showDeposit: z.number().int(),
  com_alert: z.number().int(),
  show_credit: z.number().int().nullish(),
  manager_private_note: z.string(),
  status_id: z.number().int(),
  accounts_pixel_params_replacing: z.string(),
  sales_pixel_params_replacing: z.string(),
  apiAccessType: z.string(),
  apiToken: z.string(),
  apiStaticIP: z.string(),
  isIB: z.boolean(),
  qualify_amount: z.number().nullish(),
  qualify_type: z.nativeEnum(affiliates_qualify_type).nullish(),
  profilePermissionID: z.number().int(),
  type: z.nativeEnum(affiliates_type),
  products: z.string(),
  optinGuid: z.string(),
  emailVerification: z.number().int(),
  pendingDepositExclude: z.number().int(),
  selected_language_id: z.number().int(),
  blockNewTraffic: z.number().int(),
  isDefaultAffiliate: z.boolean(),
  regReferUrl: z.string(),
})

export interface Completeaffiliates extends z.infer<typeof affiliatesModel> {
  affiliates_deals: Completeaffiliates_deals[]
  affiliates_msgs: Completeaffiliates_msgs[]
  affiliates_notes: Completeaffiliates_notes[]
  affiliates_profiles: Completeaffiliates_profiles[]
  affiliates_static_data: Completeaffiliates_static_data[]
  affiliates_tickets: Completeaffiliates_tickets[]
  affiliates_traffic: Completeaffiliates_traffic[]
  dashboard: Completedashboard[]
  data_install: Completedata_install[]
  data_reg: Completedata_reg[]
  data_sales: Completedata_sales[]
  data_sales_pending: Completedata_sales_pending[]
  data_stats: Completedata_stats[]
  merchants_affiliate_level: Completemerchants_affiliate_level[]
  payments_details: Completepayments_details[]
  payments_paid: Completepayments_paid[]
  products_affiliates_deals: Completeproducts_affiliates_deals[]
  reporttraders: Completereporttraders[]
  stats_banners: Completestats_banners[]
  sub_stats: Completesub_stats[]
  trackerconversion: Completetrackerconversion[]
  traffic: Completetraffic[]
  commission: Completecommissions[]
  pixel_monitor: Completepixel_monitor[]
}

/**
 * RelatedaffiliatesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedaffiliatesModel: z.ZodSchema<Completeaffiliates> = z.lazy(() => affiliatesModel.extend({
  affiliates_deals: Relatedaffiliates_dealsModel.array(),
  affiliates_msgs: Relatedaffiliates_msgsModel.array(),
  affiliates_notes: Relatedaffiliates_notesModel.array(),
  affiliates_profiles: Relatedaffiliates_profilesModel.array(),
  affiliates_static_data: Relatedaffiliates_static_dataModel.array(),
  affiliates_tickets: Relatedaffiliates_ticketsModel.array(),
  affiliates_traffic: Relatedaffiliates_trafficModel.array(),
  dashboard: RelateddashboardModel.array(),
  data_install: Relateddata_installModel.array(),
  data_reg: Relateddata_regModel.array(),
  data_sales: Relateddata_salesModel.array(),
  data_sales_pending: Relateddata_sales_pendingModel.array(),
  data_stats: Relateddata_statsModel.array(),
  merchants_affiliate_level: Relatedmerchants_affiliate_levelModel.array(),
  payments_details: Relatedpayments_detailsModel.array(),
  payments_paid: Relatedpayments_paidModel.array(),
  products_affiliates_deals: Relatedproducts_affiliates_dealsModel.array(),
  reporttraders: RelatedreporttradersModel.array(),
  stats_banners: Relatedstats_bannersModel.array(),
  sub_stats: Relatedsub_statsModel.array(),
  trackerconversion: RelatedtrackerconversionModel.array(),
  traffic: RelatedtrafficModel.array(),
  commission: RelatedcommissionsModel.array(),
  pixel_monitor: Relatedpixel_monitorModel.array(),
}))
