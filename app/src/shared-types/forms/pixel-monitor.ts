import { z } from "zod";
import { pixel_monitorModel } from "../../../prisma/zod";

export const schema = z.object({
  merchant_id: z.any().describe("Merchant // Select Merchant"),
  type: pixel_monitorModel.shape.type.describe("Trigger // Select Trigger"),
  pixelCode: z.string().describe("Pixel Code"),
  method: pixel_monitorModel.shape.method.describe("Method // Select Method"),
  valid: z.coerce.number().describe("Status"),
});
