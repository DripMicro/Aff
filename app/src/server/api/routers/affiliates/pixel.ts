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

export const getPixelMonitorMeta = publicProcedure.query(async ({ ctx }) => {
  const data = await ctx.prisma.merchants.findUnique({
    where: {
      id: merchant_id,
    },
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

  if (!data) {
    throw new Error("Failed to get");
  }

  return {
    pixel_type: [{ id: "merchants", title: "Merchants" }],
    merchants: [{ id: data.id, title: data.name }],
    merchants_creative: data.merchants_creative,
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
  .input(
    z.object({
      pixel_type: z.string().optional(),
      merchant: z.number().optional(),
      pixel_code: z.string().optional(),
      type: z.string().optional(),
      method: z.string().optional(),
    })
  )
  .query(
    async ({
      ctx,
      input: { pixel_type, merchant, pixel_code, type, method },
    }) => {
      const where: Prisma.pixel_monitorWhereInput = {
        affiliate_id,
        merchant_id: merchant,
        type: type ? (type as pixel_monitor_type) : undefined,
        method: method ? (method as pixel_monitor_method) : undefined,
        ...addFreeTextSearchWhere("pixelCode", pixel_code),
      };

      console.log(`muly:pixel_monitor:findMany`, {
        where,
        select: {
          merchant: {
            select: { name: true },
          },
        },
      });

      return addFreeTextSearchJSFilter(
        await ctx.prisma.pixel_monitor.findMany({
          where,
          include: {
            merchant: {
              select: { name: true },
            },
          },
        }),
        "pixelCode",
        pixel_code
      );
    }
  );

export const getMerchants = publicProcedure.query(async ({ ctx }) => {
  const data = await ctx.prisma.merchants.findMany({
    where: {
      valid: 1,
    },
    select: {
      id: true,
      name: true,
    },
  });
  return data;
});

export const upsertPixelMonitor = publicProcedure
  .input(
    upsertSchema(
      pixel_monitorModel
        .pick({
          merchant_id: true,
          type: true,
          pixelCode: true,
          method: true,
          valid: true,
        })
        .extend({
          id: pixel_monitorModel.shape.id.optional(),
        })
    )
  )
  .mutation(async ({ ctx, input: { id, ...data } }) => {
    return await (id
      ? ctx.prisma.pixel_monitor.update({
          where: { id },
          data: {
            ...data,
          },
        })
      : ctx.prisma.pixel_monitor.create({
          data: {
            id,
            ...data,
            affiliate_id: affiliate_id,
            rdate: new Date(),
            valid: 1,
            totalFired: 0,
            product_id: 0,
            banner_id: 0,
          },
        }));
  });

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
