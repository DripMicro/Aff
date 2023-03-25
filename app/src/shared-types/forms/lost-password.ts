import { z } from "zod";
import { schema as accountSchema } from "./account";
import { numericCheckbox } from "./common";

const account = accountSchema.innerType().shape;

export const schema = z
  .object({
    username: account.username.optional(),
    mail: z.string().email().optional().describe("email"),
  })
  .refine(
    ({ username, mail }) => {
      return username || mail;
    },
    {
      message: "Please choose username or password.",
      path: ["username"],
    }
  );
