import { z } from "zod";

export const schema = z.object({
  username: z.string().describe("Username"),
  password: z.string().describe("Password").meta({ type: "password" }),
});
