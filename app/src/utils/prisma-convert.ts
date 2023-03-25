import { map } from "rambda";
import { Decimal } from "decimal.js";

export const convertPrismaResultsToNumbers = (
  data: Record<string, unknown>
) => {
  return map((val, key) => {
    // console.log(`muly:convertPrismaResultsToNumbers ${val} ${key}`, {
    //   d: val instanceof Decimal,
    //   isDecimal: val?.isDecimal,
    //   is: Decimal.isDecimal(val),
    // });
    if (Decimal.isDecimal(val)) {
      val = val.toNumber();
    } else if (typeof val === "bigint") {
      val = Number(val);
    }

    return val;
  }, data);
};
