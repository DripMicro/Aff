/* eslint-disable
      @typescript-eslint/no-unsafe-assignment,
      @typescript-eslint/no-unsafe-return,
      @typescript-eslint/no-unsafe-member-access,
      @typescript-eslint/no-unsafe-call,
      @typescript-eslint/no-unsafe-argument
*/

import type { RefinementCtx } from "zod";

export const preTransformDates = (schema: any, value: any) => {
  const isDate = (field: any): boolean => {
    return (
      field &&
      (field._def.typeName === "ZodDate" || isDate(field._def.innerType))
    );
  };

  const keys = Object.keys(schema.shape);
  for (const key of keys) {
    const field = schema.shape[key];
    if (value[key] && isDate(field)) {
      // console.log(
      //   `muly:preTransformDates ${key} ${field._def.typeName} ${field._def.innerType?._def.typeName}`,
      //   { field }
      // );

      value[key] = new Date(value[key]);
    }
  }

  return value;
};

export const zodRefineCheckArrayDuplicate = (
  value: unknown,
  field: string,
  ctx: RefinementCtx
) => {
  if (value) {
    if (Array.isArray(value)) {
      value.forEach((item: any, index: number) => {
        if (
          item[field] &&
          value.findIndex((item2) => item[field] === item2[field]) !== index
        ) {
          const path = [];
          path[index] = field;
          ctx.addIssue({
            code: "custom",
            message: "Duplicate value",
            path: [`[${index}].${field}`],
          });
        }
      });
    } else {
      console.error(`zodRefineCheckArrayDuplicate, inavlid value`, {
        value,
        field,
        ctx,
      });
      ctx.addIssue({
        code: "custom",
        message: "Not array value",
        path: [`${field}`],
      });
    }
  }
};
