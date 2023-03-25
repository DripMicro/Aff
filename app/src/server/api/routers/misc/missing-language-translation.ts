import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { env } from "../../../../env.mjs";
import { TRPCError } from "@trpc/server";
import { callAsync } from "../../../../utils/call-async";
import { forEach, map, uniq, uniqBy } from "rambda";
import PMap from "../../../../utils/p-map";
import fs from "fs";
// import { promises as fsp } from "fs";

const translationSchema = z.object({
  ns: z.string(),
  key: z.string(),
  fallbackValue: z.string().optional(),
});

type TranslationData = string | { [key: string]: TranslationData };
type translationSchemaType = z.infer<typeof translationSchema>;

let queue: translationSchemaType[] = [];
let timeout: ReturnType<typeof setTimeout> | undefined;

const updateMissing = () => {
  const loadNSData = (lang: string, ns: string) => {
    console.log(`muly:loadNSData ${`./public/locales/${lang}/${ns}.json`}`, {
      pwd: process.cwd(),
    });
    return JSON.parse(
      fs.readFileSync(`./public/locales/${lang}/${ns}.json`, "utf8")
    ) as TranslationData;
  };
  const saveNSData = (lang: string, ns: string, nsData: TranslationData) => {
    console.log(`muly:saveNSData`, { nsData });
    fs.writeFileSync(
      `./public/locales/${lang}/${ns}.json`,
      JSON.stringify(nsData, null, 2)
    );
  };

  const appendMissingTranslation = (
    nsData: TranslationData,
    item: translationSchemaType,
    lang: string
  ) => {
    let changed = false;
    const path: string[] = item.key.split(".");
    let obj: TranslationData = nsData;
    // console.log(`muly:appendMissingTranslation`, {
    //   item,
    //   path,
    // });
    path.slice(0, path.length - 1).forEach((key) => {
      if (typeof obj !== "string") {
        if (!obj[key]) {
          console.log(`muly:ADD:BRANCH FULL`, {
            key,
            path,
            obj,
          });
          obj[key] = {};
        }
        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        obj = obj[key]!;
      } else {
        throw new Error(
          `Invalid translation key in ${lang} ${item.ns} ${item.key}`
        );
      }
    });

    const tail = path[path.length - 1];
    // @ts-ignore
    if (tail && !obj[tail]) {
      console.log(`muly:ADD:LEAF`, { tail, path, key: item.key, obj });
      // @ts-ignore
      obj[tail] = item.fallbackValue;
      changed = true;
    }

    return changed;
  };

  const q = [...queue];
  queue = [];
  const langs = ["en"];

  console.log(`muly:updateMissing A`, {});

  const pairs: { ns: string; lang: string }[] = [];
  forEach((ns) => {
    forEach((lang) => {
      pairs.push({ ns, lang });
    }, langs);
  }, uniq(map(({ ns }) => ns, q)));

  console.log(`muly:updateMissing B`, { pairs });

  map(({ ns, lang }) => {
    let changed = false;
    const nsData = loadNSData(lang, ns);
    q.filter((item) => item.ns === ns).forEach((item) => {
      changed = appendMissingTranslation(nsData, item, lang) || changed;
    });

    if (changed) {
      saveNSData(lang, ns, nsData);
    } else {
      console.log(`muly:Nothing changed, not saving ${lang} ${ns}`);
    }
  }, pairs);
};

export const missingLanguageTranslation = publicProcedure
  .input(translationSchema)
  .mutation(({ ctx, input }) => {
    if (env.NODE_ENV !== "development") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    console.log(`muly:missingLanguageTranslation`, { input });
    queue.push(input);
    clearTimeout(timeout);
    timeout = setTimeout(updateMissing, 5000);
  });
