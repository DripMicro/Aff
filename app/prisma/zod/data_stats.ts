import * as z from "zod"
import * as imports from "../zod-add-schema"
import { data_stats_type, data_stats_currency } from "@prisma/client"
import { Completemerchants, RelatedmerchantsModel, Completedata_reg, Relateddata_regModel, Completeaffiliates, RelatedaffiliatesModel } from "./index"

export const data_statsModel = z.object({
  id: z.number().int(),
  rdate: z.date(),
  ctag: z.string(),
  affiliate_id: z.number().int(),
  group_id: z.number().int(),
  banner_id: z.number().int(),
  product_id: z.number().int(),
  profile_id: z.number().int(),
  country: z.string(),
  tranz_id: z.string(),
  trader_id: z.string(),
  sub_trader_id: z.number().int(),
  trader_alias: z.string(),
  type: z.nativeEnum(data_stats_type),
  amount: z.number(),
  freeParam: z.string(),
  freeParam2: z.string(),
  freeParam3: z.string(),
  freeParam4: z.string(),
  freeParam5: z.string(),
  merchant_id: z.number().int(),
  uid: z.string(),
  currency: z.nativeEnum(data_stats_currency).nullish(),
  campaign_id: z.string().nullish(),
  spread: z.number().nullish(),
  pnl: z.number().nullish(),
  turnover: z.number().nullish(),
})

export interface Completedata_stats extends z.infer<typeof data_statsModel> {
  merchant: Completemerchants
  data_reg: Completedata_reg
  affiliate: Completeaffiliates
}

/**
 * Relateddata_statsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relateddata_statsModel: z.ZodSchema<Completedata_stats> = z.lazy(() => data_statsModel.extend({
  merchant: RelatedmerchantsModel,
  data_reg: Relateddata_regModel,
  affiliate: RelatedaffiliatesModel,
}))
