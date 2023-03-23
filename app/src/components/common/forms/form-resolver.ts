import { zodResolver } from "@hookform/resolvers/zod";

export const formResolver =
  (schema: any) => async (data: any, context: any, options: any) => {
    try {
      const answer = await zodResolver(schema)(data, context, options);
      if (Object.keys(answer.errors).length) {
        console.log("formResolver: validation result", {
          zod: answer,
          data,
          context,
          options,
        });
      }
      return Promise.resolve(answer);
    } catch (err: any) {
      console.log(`muly:Error`, { err: err.stack });
      throw err;
    }
  };
