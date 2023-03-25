import { QuerySelect } from "../../common/QuerySelect";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { QueryText } from "../../common/QueryText";
import { CreativeMaterialTable } from "../creative/CreativeMaterialTable";
import { CreativeMaterialRow } from "../creative/CreativeMaterialRow";
import { CreativeMaterialComponent } from '../creative/CreativeMaterialComponent';

export const SubCreativeMaterial = () => {
  const router = useRouter();
  const { type, search } = router.query;

  const { data: meta } = api.affiliates.getMerchantSubCreativeMeta.useQuery();

  const { data } = api.affiliates.getMerchantSubCreative.useQuery(
    {
      type: type ? String(type) : undefined,
      search: search ? String(search) : undefined,
    },
    { keepPreviousData: true }
  );

  return (
    <div className="pt-5 pb-4 w-full -ml-5">
      <div className=" mb-5 block font-medium text-base">
        <span className="text-[#2262C6]">Marketing Tools</span> / Sub Creative Materials
      </div>
      <div className="flex justify-between items-center">
        <div className=" font-medium text-sm">
          <QuerySelect
            label="Creative Type"
            choices={meta?.type}
            varName="type"
          />
        </div>
        <div className="md:mt-3 font-medium md:text-sm text-lg">
          <QueryText varName="search" label="Search Creative" />
        </div>
      </div>
      {data?.map((item) => {
        const values = [
          { title: "Creative Name", value: item.title },
          { title: "Format", value: item.type },
          {
            title: "Landing URL",
            value: String(item.promotion_id) || "General",
          },
          { title: "Size (WxH)", value: `${item.width}x${item.height}` },
          { title: "Impressions", value: `${String(item.views)}` },
          { title: "Clicks", value: `${String(item.clicks)}` },
        ];

        return (
          <CreativeMaterialComponent
            key={item.id}
            values={values}
            file={item.file}
            alt={item.alt}
            url={item.url}
          />
        );
      })}
    </div>
    // <Flex direction="column" gap={2}>

    //   <Flex direction="row" gap={2}>
    // <QuerySelect
    //   label="Creative Type"
    //   choices={meta?.type}
    //   varName="type"
    // />
    // <QueryText varName="search" label="Search Creative" />
    //   </Flex>
    //   <CreativeMaterialTable>
    // {data?.map((item) => {
    //   const values = [
    //     { title: "Creative Name", value: item.title },
    //     { title: "Format", value: item.type },
    //     {
    //       title: "Landing URL",
    //       value: String(item.promotion_id) || "General",
    //     },
    //     { title: "Size (WxH)", value: `${item.width}x${item.height}` },
    //     { title: "Impressions", value: `${String(item.views)}` },
    //     { title: "Clicks", value: `${String(item.clicks)}` },
    //   ];

    //   return (
    //     <CreativeMaterialRow
    //       key={item.id}
    //       values={values}
    //       file={item.file}
    //       alt={item.alt}
    //       url={item.url}
    //     />
    //   );
    // })}
    //   </CreativeMaterialTable>
    // </Flex>
  );
};
