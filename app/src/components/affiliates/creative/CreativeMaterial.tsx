import { QuerySelect } from "../../common/QuerySelect";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { CreativeMaterialTable } from "./CreativeMaterialTable";
import { QueryText } from "../../common/QueryText";
import type { merchants_creative_type } from "@prisma/client";
import { CreativeMaterialRow } from "./CreativeMaterialRow";
import { CreativeMaterialComponent } from "./CreativeMaterialComponent";
import { title } from "process";

export const CreativeMaterialTypeMap: {
  [keys in merchants_creative_type]: string;
} = {
  image: "Image",
  mobileleader: "Mobile Leader",
  mobilesplash: "Mobile Splash",
  flash: "Flash",
  widget: "Widget",
  link: "Text Link",
  mail: "E-Mail",
  content: "Content",
  script: "Script",
  coupon: "Coupon",
  html5: "HTML",
};

export const CreativeMaterial = () => {
  const router = useRouter();
  const { type, category, language, size, promotion, search } = router.query;

  // console.log(`muly:query`, { type, category, language, size, promotion });

  const { data: meta } = api.affiliates.getMerchantCreativeMeta.useQuery(
    undefined,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const { data } = api.affiliates.getMerchantCreative.useQuery(
    {
      type: type ? String(type) : undefined,
      category: category ? Number(category) : undefined,
      language: language ? Number(language) : undefined,
      size: size ? String(size) : undefined,
      promotion: promotion ? Number(promotion) : undefined,
      search: search ? String(search) : undefined,
    },
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );

  console.log(data);

  return (
    <div className="-ml-5 w-full pt-5 pb-4">
      <div className=" mb-5 block text-base font-medium">
        <span className="text-[#2262C6]">Marketing Tools</span> / Creative
        Materials
      </div>
      <div className="mb-5 grid grid-cols-2 gap-5 md:mb-7 lg:grid-cols-6">
        <QuerySelect
          label="Creative Type"
          choices={meta?.type}
          varName="type"
        />
        <QuerySelect
          label="Category"
          choices={meta?.merchants_creative_categories}
          varName="category"
        />
        <QuerySelect
          label="Language"
          choices={meta?.language}
          varName="language"
        />
        <QuerySelect label="Size" choices={meta?.size} varName="size" />
        <QuerySelect
          label="Promotion"
          choices={meta?.merchants_promotions}
          emptyTitle="General"
          varName="promotion"
        />
        <QueryText varName="search" label="Search Creative" />
      </div>
      {/* <div className="grid grid-cols-2 items-center gap-2 md:-mt-28 md:grid-cols-4">
        <div className="col-span-2 rounded p-2 md:p-5 ">
          <div className="w-full  bg-[#F9F9FF] py-2 px-3 "></div>
        </div>
        <div className="rounded p-2 md:p-5">
          <div className="">
            <div className=" text-[10px] "></div>
            <QuerySelect
              choices={meta?.merchants_promotions}
              emptyTitle="General"
              varName="promotion"
              label={""}
            />
          </div>
        </div>
        <div className=" rounded p-2 md:p-4">
          <div className="">
            <div className="mb-1 text-[10px]"></div>
            <QuerySelect
              choices={meta?.merchants_promotions}
              emptyTitle="General"
              varName="promotion"
              label={""}
            />
          </div>
        </div>
      </div> */}

      {/* <CreativeMaterialTable> */}
      {data?.map((item) => {
        const values = [
          // { title: "Id", value: item.id },
          { title: "Creative Name", value: item.title },
          { title: "Type", value: item.type },
          {
            title: "Promotion",
            value: String(item.promotion_id) || "General",
          },
          {
            title: "Category",
            value: item.category?.categoryname,
          },
          { title: "Size (WxH)", value: `${item.width}x${item.height}` },
          { title: "Language", value: item.language?.title },
        ];
        return (
          <CreativeMaterialComponent
            key={item.id}
            values={values}
            file={item.file || undefined}
            alt={item.alt}
            url={item.url}
          />
          // <CreativeMaterialRow
          //   key={item.id}
          //   values={values}
          //   file={item.file || undefined}
          //   alt={item.alt}
          //   url={item.url}
          // />
        );
      })}
      {/* </CreativeMaterialTable> */}
    </div>
  );
};
