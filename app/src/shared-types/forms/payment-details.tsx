import { z } from "zod";
import { affiliates_paymentMethod } from "@prisma/client";

export const schema = z
  .object({
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
    pay_firstname: z
      .string()
      .optional()
      .describe("First Name")
      .meta({
        beforeElement: () => <h3 className="col-span-2">Basic Information</h3>,
      }),
    pay_lastname: z.string().optional().describe("Last Name"),
    pay_address1: z.string().optional().describe("Address 1"),
    pay_address2: z.string().optional().describe("Address 2"),
    pay_city: z.string().optional().describe("City"),
    pay_zip: z.string().optional().describe("Zip Code"),
    pay_country: z.coerce.number().optional().describe("Country"),

    // Transfer Details

    // availableCurrencies
    preferredCurrency: z
      .string()
      .optional()
      .describe("Preferred Currency")
      .meta({
        choices: ["USD", "EUR"],
        beforeElement: () => <h3 className="col-span-2">Transfer Details</h3>,
      }),
    pay_info: z
      .string()
      .optional()
      .describe("More Information")
      .meta({ control: "Textarea" }),
    pay_email: z.string().email().describe("Payment Email"),
    pay_account: z.string().describe("Account"),
    pay_bank: z.string().describe("Bank Name"),
    pay_iban: z.string().describe("IBAN"),
    pay_branch: z.string().describe("Branch"),
    pay_swift: z.string().describe("Swift"),
    account_name: z.string().describe("Account Name"),
    account_number: z.string().describe("Account Number"),
  })
  .meta({ className: "md:grid md:grid-cols-2" });
