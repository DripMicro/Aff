import { z } from "zod";
import { schema as accountSchema } from "./account";
import { imUserTypes, numericCheckbox } from "./common";

const account = accountSchema.innerType().shape;

export const schema = z
  .object({
    username: account.username.meta({ className: "col-span-2 w-100" }),
    first_name: z.string().describe("First Name"),
    last_name: z.string().describe("Last Name"),
    mail: z.string().email().describe("Email"),
    password: z.string().describe("Password"),
    passwordRepeat: z.string().describe("Repeat Password"),
    phone: z.string().describe("Phone Number"),
    IMUserType: z
      .string()
      .describe("Instant Message Type // Choose IM Type")
      .default("")
      .meta({ choices: imUserTypes }),
    IMUser: z.string().describe("IM Account").default(""),
    lang: z.string().describe("Language"),
    company: z.string().describe("Company Name").default(""),
    website: z.string().url().describe("Website"),
    approvedTerms: numericCheckbox.describe(
      "I have read and accepted theTerms & Conditions"
    ),
    newsletter: numericCheckbox.describe(
      "Yes, I would like to receive the Affiliate newsletter"
    ),
  })
  .refine(
    ({ passwordRepeat, password }) => {
      return (password || "") === (passwordRepeat || "");
    },
    {
      message: "Passwords do not match. Please re-enter your passwords.",
      path: ["passwordRepeat"],
    }
  )
  .meta({ className: "grid grid-cols-2" });
