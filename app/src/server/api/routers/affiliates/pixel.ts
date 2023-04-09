import type {
  pixel_monitor_method,
  pixel_monitor_type,
  Prisma,
} from "@prisma/client";
import { z } from "zod";
import {
  addFreeTextSearchJSFilter,
  addFreeTextSearchWhere,
} from "../../../../../prisma/prisma-utils";
import { pixel_monitorModel } from "../../../../../prisma/zod";
import { upsertSchema } from "../../../../../prisma/zod-add-schema";
import { publicProcedure } from "../../trpc";
import { affiliate_id, merchant_id } from "./const";

const ChoicesSchema = z.array(
  z.object({ id: z.number().or(z.string()), title: z.string() })
);

export const getPixelMonitorMeta = publicProcedure
  .output(
    z.object({
      // pixel_type: ChoicesSchema,
      merchants: z.array(
        z.object({
          id: z.number(),
          title: z.string(),
          merchants_creative: ChoicesSchema,
        })
      ),
      type: ChoicesSchema,
      method: ChoicesSchema,
    })
  )
  .query(async ({ ctx }) => {
    const data = await ctx.prisma.merchants.findMany({
      select: {
        id: true,
        name: true,
        merchants_creative: {
          where: {
            product_id: 0,
            valid: 1,
          },
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return {
      merchants: [
        ...data.map(({ id, name, merchants_creative }) => ({
          id,
          title: name,
          merchants_creative,
        })),
        // {
        //   id: 99,
        //   title: "fake",
        //   merchants_creative: [{ id: 99, title: "fake2" }],
        // },
      ],
      type: [
        { id: "lead", title: "Lead" },
        { id: "account", title: "Account" },
        { id: "sale", title: "FTD" },
        { id: "qftd", title: "Qualified FTD" },
      ],
      method: [
        { id: "post", title: "Server To Server - POST" },
        { id: "get", title: "Server To Server - GET" },
        // { id: "client", title: "Client Side" },
      ],
    };
  });

export const getPixelMonitor = publicProcedure
  .output(
    z.array(
      pixel_monitorModel.extend({
        merchant: z.object({ name: z.string() }),
        merchants_creative: z.object({ title: z.string() }).nullish(),

        // Simplify form
        all_creative: z.boolean(),
      })
    )
  )
  .query(async ({ ctx }) => {
    // console.log(`muly:query`, {});
    const where: Prisma.pixel_monitorWhereInput = {
      affiliate_id,
      // merchant_id: merchant,
      // type: type ? (type as pixel_monitor_type) : undefined,
      // method: method ? (method as pixel_monitor_method) : undefined,
      // ...addFreeTextSearchWhere("pixelCode", pixel_code),
    };

    // return addFreeTextSearchJSFilter(
    //   await ctx.prisma.pixel_monitor.findMany({
    //     where,
    //     include: {
    //       merchant: {
    //         select: { name: true },
    //       },
    //     },
    //   }),
    //   "pixelCode",
    //   pixel_code
    // );

    const answer = await ctx.prisma.pixel_monitor.findMany({
      where,
      include: {
        merchant: {
          select: { name: true },
        },
        merchants_creative: {
          select: { title: true },
        },
      },
    });

    const m = answer.map(({ banner_id, ...rest }) => ({
      banner_id,
      all_creative: !banner_id,
      ...rest,
    }));

    // console.log(`muly:Answer":pixel`, { m });
    return m;
  });

// export const getMerchants = publicProcedure.query(async ({ ctx }) => {
//   const data = await ctx.prisma.merchants.findMany({
//     where: {
//       valid: 1,
//     },
//     select: {
//       id: true,
//       name: true,
//     },
//   });
//   return data;
// });

export const upsertPixelMonitor = publicProcedure
  .input(
    upsertSchema(
      pixel_monitorModel
        .pick({
          merchant_id: true,
          type: true,
          pixelCode: true,
          method: true,
        })
        .extend({
          id: pixel_monitorModel.shape.id.optional(),
          valid: pixel_monitorModel.shape.valid.nullish(),
          all_creative: z.boolean().nullish(),
          banner_id: z.number().nullish(),
        })
    )
  )
  .mutation(
    async ({ ctx, input: { id, valid, banner_id, all_creative, ...data } }) => {
      if (all_creative) {
        banner_id = 0;
      }

      console.log(`mupixel_monitor:upsert`, { banner_id, all_creative });

      return await (id
        ? ctx.prisma.pixel_monitor.update({
            where: { id },
            data: {
              banner_id: banner_id ?? 0,
              valid: valid ?? 1,
              ...data,
            },
          })
        : ctx.prisma.pixel_monitor.create({
            data: {
              id,
              banner_id: banner_id ?? 0,
              affiliate_id: affiliate_id,
              valid: valid ?? 1,
              ...data,
              rdate: new Date(),
              totalFired: 0,
              product_id: 0,
            },
          }));
    }
  );

export const deletePixelMonitor = publicProcedure
  .input(
    pixel_monitorModel.pick({
      id: true,
    })
  )
  .mutation(async ({ ctx, input: { id } }) => {
    return await ctx.prisma.pixel_monitor.delete({
      where: { id },
    });
  });
