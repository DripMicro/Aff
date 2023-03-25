import * as z from "zod"
import * as imports from "../zod-add-schema"
import { Completepixel_monitor, Relatedpixel_monitorModel } from "./index"

export const pixel_logsModel = z.object({
  id: z.number().int(),
  dateTime: z.date(),
  firedUrl: z.string(),
  pixelCode: z.number().int(),
  pixelResponse: z.string(),
  product_id: z.number().int(),
})

export interface Completepixel_logs extends z.infer<typeof pixel_logsModel> {
  pixel_monitor: Completepixel_monitor
}

/**
 * Relatedpixel_logsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedpixel_logsModel: z.ZodSchema<Completepixel_logs> = z.lazy(() => pixel_logsModel.extend({
  pixel_monitor: Relatedpixel_monitorModel,
}))
