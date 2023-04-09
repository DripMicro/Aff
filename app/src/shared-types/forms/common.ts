import { z } from "zod";

export const numericCheckbox = z.coerce
  .number()
  .min(0)
  .max(1)
  .meta({ control: "Checkbox", choices: ["0", "1"] });

export const imUserTypes = [
  "Skype",
  "MSN",
  "Google Talk",
  "QQ",
  "ICQ",
  "Yahoo",
  "AIM",
];
