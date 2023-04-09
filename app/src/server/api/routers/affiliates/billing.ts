import { publicProcedure } from "../../trpc";
import { affiliate_id } from "./const";
import { z } from "zod";
import {
  addFreeTextSearchJSFilter,
  addFreeTextSearchWhere,
} from "../../../../../prisma/prisma-utils";
import { indexBy, map } from "rambda";
import { TRPCError } from "@trpc/server";

export const getPaymentsPaid = publicProcedure
  .input(
    z.object({
      search: z.string().optional(),
    })
  )
  .query(async ({ ctx, input: { search } }) => {
    const where = {
      // affiliate_id,
      // valid: 1,
      // ...addFreeTextSearchWhere("paymentID", search),
    };

    const [payments_details, payments_paid] = await Promise.all([
      ctx.prisma.payments_details.groupBy({
        by: ["paymentID"],
        where: { affiliate_id },
        // _sum: {
        //   amount: true,
        // },
        _count: {
          id: true,
        },
      }),
      addFreeTextSearchJSFilter(
        await ctx.prisma.payments_paid.findMany({
          where,
          orderBy: [{ id: "desc" }],
        }),
        "paymentID",
        search
      ),
    ]);

    const detailDict = indexBy("paymentID", payments_details);
    console.log(`muly:where`, {
      where,
      payments_details: payments_details.map((a) => ({
        ...a,
        // sum: a._sum.amount,
      })),
      // payments_paid,
      search,
      t: typeof search,
    });
    return map(
      ({ paymentID, ...data }) => ({
        paymentID,
        ...data,
        totalFTD: detailDict[paymentID]?._count.id,
        // amount: detailDict[paymentID]?._sum.amount,
      }),
      payments_paid
    );
  });

export const getPaymentDetails = publicProcedure
  .input(z.object({ paymentId: z.string() }))
  .query(async ({ ctx, input: { paymentId } }) => {
    if (!paymentId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Invalid paymentID.`,
      });
    }

    const [payments_details, payments_paid] = await Promise.all([
      ctx.prisma.payments_details.findMany({
        where: { paymentID: paymentId },
      }),
      ctx.prisma.payments_paid.findUnique({
        where: { paymentID: paymentId },
      }),
    ]);

    return { payments_details, payments_paid };
  });
