import * as z from "zod"
import * as imports from "../zod-add-schema"
import { traffic_bannerType, traffic_type, traffic_platform } from "@prisma/client"
import { Completemerchants, RelatedmerchantsModel, Completeaffiliates, RelatedaffiliatesModel, Completemerchants_creative, Relatedmerchants_creativeModel, Completelanguages, RelatedlanguagesModel } from "./index"

export const trafficModel = z.object({
  id: z.number().int(),
  rdate: z.date(),
  unixRdate: z.number().int(),
  ctag: z.string(),
  uid: z.string(),
  ip: z.string(),
  admin_id: z.number().int(),
  affiliate_id: z.number().int(),
  group_id: z.number().int(),
  banner_id: z.number().int(),
  merchant_id: z.number().int(),
  profile_id: z.number().int(),
  language_id: z.number().int(),
  promotion_id: z.number().int(),
  valid: z.boolean(),
  title: z.string(),
  bannerType: z.nativeEnum(traffic_bannerType),
  type: z.nativeEnum(traffic_type),
  width: z.number().int(),
  height: z.number().int(),
  file: z.string(),
  url: z.string(),
  alt: z.string(),
  platform: z.nativeEnum(traffic_platform),
  os: z.string(),
  osVersion: z.string(),
  browser: z.string(),
  broswerVersion: z.string(),
  userAgent: z.string(),
  country_id: z.string(),
  refer_url: z.string(),
  param: z.string(),
  param2: z.string(),
  param3: z.string(),
  param4: z.string(),
  param5: z.string(),
  views: z.number().int(),
  clicks: z.number().int(),
  product_id: z.number().int(),
})

export interface Completetraffic extends z.infer<typeof trafficModel> {
  merchant: Completemerchants
  affiliate: Completeaffiliates
  merchant_creative: Completemerchants_creative
  language: Completelanguages
}

/**
 * RelatedtrafficModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedtrafficModel: z.ZodSchema<Completetraffic> = z.lazy(() => trafficModel.extend({
  merchant: RelatedmerchantsModel,
  affiliate: RelatedaffiliatesModel,
  merchant_creative: Relatedmerchants_creativeModel,
  language: RelatedlanguagesModel,
}))
