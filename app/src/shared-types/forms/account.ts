import { z } from "zod";

export const schema = z.object({
  username: z.string().describe("Username"),
  password: z
    .string()
    .optional()
    .describe("Password")
    .meta({ type: "password" }),
  // passwordRepeat: z
  //   .string()
  //   .optional()
  //   .describe("Repeat Password")
  //   .meta({ type: "password" }),
  newsletter: z.coerce
    .number()
    .min(0)
    .max(1)
    .describe("Yes, I would like to receive the Affiliate newsletter")
    .meta({ control: "Checkbox", choices: ["0", "1"] }),
});
// .refine(
//   ({ passwordRepeat, password }) => {
//     return (password || "") === (passwordRepeat || "");
//   },
//   {
//     message: "Passwords do not match. Please re-enter your passwords.",
//     path: ["passwordRepeat"],
//   }
// );
