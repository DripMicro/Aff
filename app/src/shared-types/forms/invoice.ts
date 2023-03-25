import { z } from "zod";

export const schema = z.object({
  street: z.string().optional().describe("Street"),
  postalCode: z.string().optional().describe("Postal / Zip Code"),
  city: z.string().optional().describe("City"),
  country: z.string().optional().describe("Country"),
});
