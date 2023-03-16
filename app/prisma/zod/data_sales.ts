import * as z from "zod"
import * as imports from "../zod-add-schema"
import { data_sales_type, data_sales_status, data_sales_currency } from "@prisma/client"
import { Completemerchants, RelatedmerchantsModel, Completeaffiliates, RelatedaffiliatesModel } from "./index"

export const data_salesModel = z.object({
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
  type: z.nativeEnum(data_sales_type),
  status: z.nativeEnum(data_sales_status),
  amount: z.number(),
  original_amount: z.number(),
  positionSum: z.number(),
  freeParam: z.string(),
  freeParam2: z.string(),
  freeParam3: z.string(),
  freeParam4: z.string(),
  freeParam5: z.string(),
  merchant_id: z.number().int(),
  uid: z.string(),
  campaign_id: z.string().nullish(),
  currency: z.nativeEnum(data_sales_currency),
  pendingRelationRecord: z.number().int(),
  created_by_admin_id: z.number().int(),
  spread: z.number().nullish(),
  pnl: z.number().nullish(),
  turnover: z.number().nullish(),
  dummySource: z.number().int(),
  currentDate: z.date(),
  isSelfDeposit: z.boolean(),
})

export interface Completedata_sales extends z.infer<typeof data_salesModel> {
  merchant: Completemerchants
  affiliate: Completeaffiliates
}

/**
 * Relateddata_salesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relateddata_salesModel: z.ZodSchema<Completedata_sales> = z.lazy(() => data_salesModel.extend({
  merchant: RelatedmerchantsModel,
  affiliate: RelatedaffiliatesModel,
}))
