import type { PrismaClient } from "@prisma/client";
import type { AuthUser } from "./auth";
import md5 from "md5";
import { getConfig } from "./config";

export const loginAccount = async (
  prisma: PrismaClient,
  username: string,
  password: string
): Promise<AuthUser | null> => {
  //C:\aff\FocusOption\FocusOption-main\site\index.php L175
  //$strSql = "SELECT id, username, password,valid,emailVerification
  // FROM affiliates
  // WHERE LOWER(username) = LOWER('" . strtolower($username) . "') AND
  // (password) = '" . (($admin>0 || $manager>0) ? strtolower($password):  strtolower(md5($password))) . "' ";

  const user = await prisma.$queryRaw<
    {
      id: number;
      mail: string;
      first_name: string;
      last_name: string;
      password: string;
      valid: number;
      emailVerification: number;
    }[]
  >`SELECT id,mail,password,valid,emailVerification FROM affiliates WHERE lower(username)=${username.toLowerCase()}`;

  if (!user.length || user[0]?.password !== md5(password)) {
    throw new Error("Login incorrect");
  }

  const { id, first_name, last_name, mail, emailVerification, valid } = user[0];

  const config = await getConfig(prisma);
  if (config.BlockLoginUntillEmailVerification && !emailVerification) {
    throw new Error("Please verify your email before you login");
  }

  if (!valid) {
    throw new Error("User Not validated");
  }

  return {
    id: String(id),
    email: mail,
    name: `${first_name || ""} ${last_name || ""}`.trim() || mail,
    image: null,
    type: "affiliate",
  };
};
