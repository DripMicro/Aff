import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const getPixelLogReport = publicProcedure
  .input(
    z.object({
      from: z.date().optional(),
      to: z.date().optional(),
      merchant_id: z.number().optional(),
      country: z.string().optional(),
      banner_id: z.string().optional(),
      group_id: z.string().optional(),
    })
  )
  .query(
    async ({
      ctx,
      input: { from, to, merchant_id, country, banner_id, group_id },
    }) => {
      let type_filter = {};
      if (banner_id) {
        type_filter = {
          banner_id: banner_id,
        };
      }

      if (group_id) {
        type_filter = {
          group_id: group_id,
        };
      }

      if (country) {
        type_filter = {
          country: country,
        };
      }

      if (merchant_id) {
        type_filter = {
          merchant_id: merchant_id,
        };
      }

      /*
              SELECT pl.id as plid,
                pm.* ,
                pl.*,
                af.username, mr.name, af.group_id, mr.id, af.id as affiliate_id
              FROM pixel_logs AS pl
                left join pixel_monitor pm on
                  pm.id = pl.pixelCode
                left join merchants mr on
                  pm.merchant_id = mr.id
                left join affiliates af on
                  pm.affiliate_id = af.id
                                          WHERE 2=2 and " . $globalWhere
                                                  . " pl.dateTime BETWEEN '" . $from . "' AND '" . $to . "' "
                                                  . " AND pm.merchant_id >0 "

                                                  .$whereType

                                                  . $where

                                          . " ORDER BY pl.dateTime ASC;";

                //}
             */
      const pixelReport = await ctx.prisma.pixel_logs.findMany({
        orderBy: {
          dateTime: "asc",
        },
        where: {
          ...type_filter,
          dateTime: {
            gte: from,
            lt: to,
          },
        },
        include: {
          pixel_monitor: {
            select: {
              affiliate: {
                select: {
                  username: true,
                  group_id: true,
                  id: true,
                  valid: true,
                },
              },
              merchant: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      return pixelReport;
    }
  );
