import { z } from "zod";
import { schema as accountSchema } from "./account";
import { numericCheckbox } from "./common";

export const schema = z
  .object({
    username: z.string().describe("Username"),
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
