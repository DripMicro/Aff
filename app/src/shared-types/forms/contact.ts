import { z } from "zod";
import { imUserTypes } from "@/shared-types/forms/common";

export const schema = z.object({
  company: z.string().optional().describe("Company Name"),
  gender: z
    .enum(["EMPTY_ENUM_VALUE", "male", "female"])
    .optional()
    .describe("Salutation")
    .meta({
      // control: "RadioGroup",
      choices: [
        // { id: "", title: "" },
        { id: "male", title: "Mr." },
        { id: "female", title: "Ms." },
      ],
    }),
  first_name: z.string().optional().describe("First Name"),
  last_name: z.string().optional().describe("Last Name"),
  mail: z.string().email().optional().describe("Email"),
  phone: z.string().optional().describe("Phone Number"),
  IMUserType: z
    .string()
    .optional()
    .describe("Instant Message Type // Choose IM Type")
    .meta({
      choices: imUserTypes,
    }),
  IMUser: z.string().optional().describe("Instant Message Account"),
});
