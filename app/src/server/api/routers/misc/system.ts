import * as z from "zod";
import { publicProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { castError } from "../../../../utils/errors";
import * as Sentry from "@sentry/nextjs";
import { executeAdminCommand } from "../../../process/admin-commands";

export const runAdminCommand = publicProcedure
  .input(
    z.object({
      cmd: z.string(),
      secret: z.string().optional(),
      data: z.any().optional(),
    })
  )
  .output(z.object({ message: z.string(), results: z.any() }))
  .mutation(async ({ ctx, input: { cmd, secret, data } }) => {
    if (
      secret !== process.env.LEGACY_PHP_ACCESS_TOKEN // &&
      // !ctx?.user?.email?.endsWith("@orderio.me")
    ) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    try {
      const start = Date.now();
      const answer = await executeAdminCommand(ctx.prisma, cmd, data);
      const message = `admin-command [${cmd}]: ${answer?.message} ${
        (Date.now() - start) / 1000
      }sec`;

      Sentry.setExtra("data", data);
      Sentry.captureMessage(message);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      console.log(message, { data, answer });
      return {
        message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        results: answer.results,
      };
    } catch (_err) {
      const err = castError(_err);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      Sentry.setExtras({ cmd, data });
      Sentry.captureException(_err);
      console.error(`executeAdminCommand`, { err: err.stack });
      return {
        message: `Error executeAdminCommand ${err.message}`,
        results: err.stack,
      };
    }
  });

export const simulateServerError = publicProcedure.mutation(
  ({ ctx, input }) => {
    throw new Error("simualateServerError");
  }
);
