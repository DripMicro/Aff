import * as z from "zod"
import * as imports from "../zod-add-schema"
import { pixel_monitor_type, pixel_monitor_method } from "@prisma/client"
import { Completemerchants_creative, Relatedmerchants_creativeModel, Completemerchants, RelatedmerchantsModel, Completeaffiliates, RelatedaffiliatesModel, Completepixel_logs, Relatedpixel_logsModel } from "./index"

export const pixel_monitorModel = z.object({
  id: z.number().int(),
  type: z.nativeEnum(pixel_monitor_type),
  method: z.nativeEnum(pixel_monitor_method),
  rdate: z.date(),
  valid: z.number().int(),
  affiliate_id: z.number().int(),
  merchant_id: z.number().int(),
  pixelCode: z.string(),
  totalFired: z.number().int(),
  product_id: z.number().int(),
  banner_id: z.number().int().nullish(),
})

export interface Completepixel_monitor extends z.infer<typeof pixel_monitorModel> {
  merchants_creative?: Completemerchants_creative | null
  merchant: Completemerchants
  affiliate: Completeaffiliates
  pixel_logs: Completepixel_logs[]
}

/**
 * Relatedpixel_monitorModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedpixel_monitorModel: z.ZodSchema<Completepixel_monitor> = z.lazy(() => pixel_monitorModel.extend({
  merchants_creative: Relatedmerchants_creativeModel.nullish(),
  merchant: RelatedmerchantsModel,
  affiliate: RelatedaffiliatesModel,
  pixel_logs: Relatedpixel_logsModel.array(),
}))
