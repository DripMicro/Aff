import * as z from "zod"
import * as imports from "../zod-add-schema"
import { merchants_creative_type } from "@prisma/client"
import { Completemerchants_creative_categories, Relatedmerchants_creative_categoriesModel, Completemerchants, RelatedmerchantsModel, Completelanguages, RelatedlanguagesModel, Completetraffic, RelatedtrafficModel } from "./index"

export const merchants_creativeModel = z.object({
  id: z.number().int(),
  rdate: z.date(),
  last_update: z.date(),
  valid: z.number().int(),
  admin_id: z.number().int(),
  merchant_id: z.number().int(),
  product_id: z.number().int(),
  language_id: z.number().int(),
  promotion_id: z.number().int(),
  title: z.string(),
  type: z.nativeEnum(merchants_creative_type),
  width: z.number().int(),
  height: z.number().int(),
  file: z.string(),
  url: z.string(),
  iframe_url: z.string(),
  alt: z.string(),
  scriptCode: z.string(),
  affiliate_id: z.number().int(),
  category_id: z.number().int(),
  featured: z.number().int(),
  affiliateReady: z.number().int(),
})

export interface Completemerchants_creative extends z.infer<typeof merchants_creativeModel> {
  category?: Completemerchants_creative_categories | null
  merchant: Completemerchants
  language: Completelanguages
  traffic: Completetraffic[]
}

/**
 * Relatedmerchants_creativeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedmerchants_creativeModel: z.ZodSchema<Completemerchants_creative> = z.lazy(() => merchants_creativeModel.extend({
  category: Relatedmerchants_creative_categoriesModel.nullish(),
  merchant: RelatedmerchantsModel,
  language: RelatedlanguagesModel,
  traffic: RelatedtrafficModel.array(),
}))
