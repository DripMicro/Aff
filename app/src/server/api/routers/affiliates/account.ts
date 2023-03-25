// affiliates

import { publicProcedure } from "../../trpc";
import { affiliate_id } from "./const";
import { affiliatesModel } from "../../../../../prisma/zod";
import { TRPCError } from "@trpc/server";
import { schema as schemaRegister } from "../../../../shared-types/forms/register";
import { schema as schemaLostPassword } from "../../../../shared-types/forms/lost-password";
import md5 from "md5";
import type { queryRawId } from "../../../db-utils";
import { getConfig } from "../../../config";
import type { PrismaClient } from "@prisma/client";
import { Awaitable, User } from "next-auth";
import type { AuthUser } from "../../../auth";
import type { affiliates } from ".prisma/client";
import { sentEmailTemplate } from "../../../email";
import { Prisma } from "@prisma/client";

export const getAccount = publicProcedure.query(async ({ ctx }) => {
  const data = await ctx.prisma.affiliates.findUnique({
    where: { id: affiliate_id },
  });

  if (!data) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Affiliate account ${affiliate_id} not found.`,
    });
  }

  return data;
});

export const updateAccount = publicProcedure
  .input(affiliatesModel.partial())
  .mutation(async ({ ctx, input }) => {
    const data = await ctx.prisma.affiliates.update({
      where: { id: affiliate_id },
      data: input,
    });

    return data;
  });

export const registerAccount = publicProcedure
  .input(schemaRegister)
  .mutation(async ({ ctx, input }) => {
    const { username, mail, password, ...data } = input;

    const [idUserName, idEmail] = await Promise.all([
      ctx.prisma
        .$queryRaw<queryRawId>`SELECT id FROM affiliates WHERE lower(username)=${username.toLowerCase()}`,
      ctx.prisma
        .$queryRaw<queryRawId>`SELECT id FROM affiliates WHERE lower(mail)=${mail.toLowerCase()}`,
    ]);

    console.log(`muly:idUserName`, { idUserName, idEmail });
    if (idUserName.length) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Username already exist",
      });
    }
    if (idEmail.length) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "This e-mail already exist in our records",
      });
    }

    // FocusOption/FocusOption-main/site/index.php L680
    const newData = await ctx.prisma.affiliates.create({
      data: {
        ...data,
        username: username.toLowerCase(),
        mail: mail.toLowerCase(),
        password: String(md5(password)),
        rdate: new Date(),
        type: "Affiliate",

        valid: 1,
        language_id: 0,
        ip: "TBD",
        group_id: 0,
        refer_id: 0,
        refer_banner_id: 0,
        website2: "",
        website3: "",
        street: "",
        postalCode: "",
        city: "",
        gender: "male",
        country: "",
        marketInfo: "",
        logged: 0,
        paymentMethod: "bank",
        pay_firstname: "",
        pay_lastname: "",
        pay_mail: "",
        pay_account: "",
        account_name: "",
        account_number: "",
        pay_info: "",
        pay_bank: "",
        pay_swift: "",
        pay_iban: "",
        pay_branch: "",
        pay_email: "",
        pay_address1: "",
        pay_address2: "",
        pay_city: "",
        pay_state: "",
        pay_zip: "",
        pay_country: 0,
        pay_company: "",
        merchants: "",
        credit: 0,
        sub_com: 2,
        showDeposit: 0,
        com_alert: 0,
        manager_private_note: "",
        apiToken: "",
        apiStaticIP: "",
        products: "",
        optinGuid: "",
        regReferUrl: "",
      },
    });
    return data;
  });

export const recoverPassword = publicProcedure
  .input(schemaLostPassword)
  .mutation(async ({ ctx, input }) => {
    console.log(`muly:recoverPassword`, { input });
    const { username, mail } = input;

    // FocusOption/FocusOption-main/site/index.php L1565

    // ${username.toLowerCase()}

    let affiliates: affiliates[] = [];
    if (username) {
      affiliates = await ctx.prisma.$queryRaw<
        affiliates[]
      >`SELECT id,mail,first_name,last_name FROM affiliates WHERE lower(username)=${username.toLowerCase()}`;
    } else if (mail) {
      affiliates = await ctx.prisma.$queryRaw<
        affiliates[]
      >`SELECT id,mail,first_name,last_name FROM affiliates WHERE lower(mail)=${mail.toLowerCase()}`;
    }

    console.log(`muly:affiliates:answer`, { affiliates });

    if (affiliates?.length && affiliates[0]) {
      const affiliate = affiliates[0];
      const { id, mail } = affiliate;
      const password = Math.random().toString(36).slice(-8);

      await ctx.prisma.affiliates.update({ where: { id }, data: { password } });

      await sentEmailTemplate("ResetPassword", { affiliate, password });
    }

    return true;
  });
