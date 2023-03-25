import { z } from "zod";
import { schema as accountSchema } from "./account";
import { numericCheckbox } from "./common";

const account = accountSchema.innerType().shape;

export const schema = z.object({
  username: account.username,
  password: z.string().describe("Password"),
});
