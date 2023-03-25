import { z } from "zod";
import { affiliates_paymentMethod } from "@prisma/client";

export const schema = z.object({
  paymentMethod: z
    .nativeEnum(affiliates_paymentMethod)
    .describe("Payment Method")
    .meta({
      choices: [
        { id: "bank", title: "Wire Transfer" },
        { id: "skrill", title: "Skrill" },
        { id: "paypal", title: "Paypal" },
        { id: "neteller", title: "Neteller" },
        { id: "webmoney", title: "WebMoney" },
        { id: "chinaunionpay", title: "China Union Pay" },
      ],
    }),
  // Basic Information
  pay_firstname: z.string().optional().describe("First Name"),
  pay_lastname: z.string().optional().describe("Last Name"),
  pay_address1: z.string().optional().describe("Address 1"),
  pay_address2: z.string().optional().describe("Address 2"),
  pay_city: z.string().optional().describe("City"),
  pay_zip: z.string().optional().describe("Zip Code"),
  pay_country: z.coerce.number().optional().describe("Country"),

  // Transfer Details

  // availableCurrencies
  preferredCurrency: z.string().optional().describe("Preferred Currency"),
  pay_info: z
    .string()
    .optional()
    .describe("More Information")
    .meta({ control: "Textarea" }),
  pay_email: z.string().email().optional().describe("Payment Email"),
  pay_account: z.string().optional().describe("Account"),
});
