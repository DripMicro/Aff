import { z } from "zod";

import type { merchants_creative_type, Prisma } from "@prisma/client";
import { countBy, map, sortBy, uniq, uniqBy } from "rambda";
import {
  addFreeTextSearchJSFilter,
  addFreeTextSearchWhere,
} from "../../../../../prisma/prisma-utils";
import { SelectSchema } from "../../../db-schema-utils";
import { publicProcedure } from "../../trpc";
import { affiliate_id, merchant_id } from "./const";
import { serverStoragePath } from "../../../../components/utils";

export const getMerchantCreativeMeta = publicProcedure
  .output(
    z.object({
      merchants_creative_categories: SelectSchema(z.number()),
      merchants_promotions: SelectSchema(z.number()),
      language: SelectSchema(z.number()),
      type: SelectSchema(z.string()),
      size: SelectSchema(z.string()),
    })
  )
  .query(async ({ ctx }) => {
    // SELECT * FROM affiliates WHERE id='500' AND valid='1'

    const data = await ctx.prisma.merchants.findUnique({
      where: { id: merchant_id },
      select: {
        id: true,
        merchants_creative_categories: {
          where: { valid: true },
          select: { id: true, categoryname: true },
        },

        merchants_promotions: {
          where: { valid: 1, affiliate_id },
          select: {
            id: true,
            title: true,
          },
        },

        merchants_creative: {
          where: { valid: 1 },
          select: {
            id: true,
            // to distinct
            language: { select: { id: true, title: true } },

            // to distinct
            type: true,

            // to distinct
            width: true,
            height: true,
          },
        },
      },
    });

    if (!data) {
      throw new Error("Failed to get");
    }

    return {
      merchants_creative_categories: map(
        ({ id, categoryname }) => ({ id, title: categoryname }),
        data.merchants_creative_categories
      ),
      merchants_promotions: data.merchants_promotions,
      language: sortBy(
        ({ id, title }: { id: number; title: string }) => id,
        uniqBy(
          ({ id }): number => id,
          data.merchants_creative.map(({ language: { id, title } }) => ({
            id,
            title,
          }))
        )
      ),
      type: map(
        (i) => ({ id: i, title: i }),
        uniq(data.merchants_creative.map(({ type }) => type))
      ),
      size: sortBy(
        ({ id, title }) => {
          const [width, height] = id.split("x").map(Number);
          return (width || 0) * (height || 0);
        },
        Object.values(
          map(
            (count: number, value) => ({
              id: value,
              title: `${value} (${count})`,
            }),
            countBy(
              (text) => text,
              data.merchants_creative.map(
                ({ width, height }) => `${width}x${height}`
              )
            )
          )
        )
      ),
    };
  });

export const getMerchantCreative = publicProcedure
  .input(
    z.object({
      category: z.number().optional(),
      promotion: z.number().optional(),
      language: z.number().optional(),
      type: z.string().optional(), //merchants_creativeModel.shape.type.nullish(),
      size: z.string().optional(),
      search: z.string().optional(),
    })
  )
  .query(
    async ({
      ctx,
      input: { category, promotion, language, type, size, search },
    }) => {
      const [width, height] = size
        ? size.split("x").map(Number)
        : [undefined, undefined];

      const where: Prisma.merchants_creativeWhereInput = {
        merchant_id,
        product_id: 0,
        valid: 1,
        category_id: category,
        promotion_id: promotion,
        language_id: language,
        type: type ? (type as merchants_creative_type) : undefined,
        width,
        height,
        ...addFreeTextSearchWhere("title", search),
      };

      console.log(`muly:merchants_creative:findMany`, {
        where,
        select: {
          language: {
            select: { title: true },
          },
          merchants_creative_categories: { select: { categoryname: true } },
        },
      });

      const answer = map(
        ({ file, ...data }) => ({ ...data, file: serverStoragePath(file) }),
        addFreeTextSearchJSFilter(
          await ctx.prisma.merchants_creative.findMany({
            where,
            include: {
              language: {
                select: { title: true },
              },
              category: { select: { categoryname: true } },
            },
          }),
          "title",
          search
        )
      );

      return answer;
    }
  );
//
