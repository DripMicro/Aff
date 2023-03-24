import * as z from "zod"
import * as imports from "../zod-add-schema"
import { Completemerchants_creative, Relatedmerchants_creativeModel, Completesub_banners, Relatedsub_bannersModel, Completetraffic, RelatedtrafficModel } from "./index"

export const languagesModel = z.object({
  id: z.number().int(),
  rdate: z.date(),
  valid: z.number().int(),
  lngCode: z.string(),
  title: z.string(),
  displayText: z.string(),
  textDirection: z.string(),
})

export interface Completelanguages extends z.infer<typeof languagesModel> {
  merchants_creative: Completemerchants_creative[]
  sub_banners: Completesub_banners[]
  traffic: Completetraffic[]
}

/**
 * RelatedlanguagesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedlanguagesModel: z.ZodSchema<Completelanguages> = z.lazy(() => languagesModel.extend({
  merchants_creative: Relatedmerchants_creativeModel.array(),
  sub_banners: Relatedsub_bannersModel.array(),
  traffic: RelatedtrafficModel.array(),
}))
