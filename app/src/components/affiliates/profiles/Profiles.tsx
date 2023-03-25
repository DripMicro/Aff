import { DataTable } from "../../common/data-table/DataTable";
import { api } from "../../../utils/api";
import type { AffiliateProfileType } from "../../../server/db-types";
import { createColumnHelper } from "@tanstack/react-table";
import * as z from "zod";
import { CheckIcon } from "@chakra-ui/icons";
import React from "react";
import type { affiliates_profilesModelType } from "../../../server/db-types";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { useCRUD } from "@/components/common/forms/useCRUD";

const columnHelper = createColumnHelper<AffiliateProfileType>();

export const schema = z.object({
  name: z.string().describe("Profile Name"),
  url: z.string().url().describe("URL"),
  description: z.string().optional().describe("Description"),
  source_traffic: z.string().optional().describe("Traffic Source"),
  valid: z.coerce
    .number()
    .describe("Available")
    .meta({ choices: ["0", "1"], control: "Switch" }),
});

type RecType = affiliates_profilesModelType;

export const Profiles = () => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);

  const { data, refetch } = api.affiliates.getProfiles.useQuery();
  const upsertProfile = api.affiliates.upsertProfile.useMutation();
  const deleteProfile = api.affiliates.deleteProfile.useMutation();

  const { editDialog, createDialog } = useCRUD<RecType>({
    formContext,
    schema,
    refetch: async () => {
      await refetch();
    },
    onDelete: (rec: RecType) => deleteProfile.mutateAsync({ id: rec.id }),
    onUpsert: (rec: RecType) => upsertProfile.mutateAsync(rec),
    text: {
      edit: "Edit",
      editTitle: "Edit Profile",
      add: "Add",
      addTitle: "Add Profile",
    },
  });

  if (!data) {
    return null;
  }

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "#",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Profile Name",
    }),
    columnHelper.accessor("url", {
      cell: (info) => info.getValue(),
      header: "URL",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "Description",
      // meta: {
      //   isNumeric: true,
      // },
    }),
    columnHelper.accessor("source_traffic", {
      cell: (info) => info.getValue(),
      header: "Traffic Source",
    }),
    columnHelper.accessor("valid", {
      // cell: (info) => info.getValue(),
      cell: (info) => {
        return info.getValue() ? <CheckIcon /> : null;
      },
      header: "Available",
    }),
    columnHelper.accessor("edit-button" as any, {
      cell: (info) => editDialog(info.row.original),
      header: "",
    }),
  ];

  return (
    <div className="m-12 gap-4">
      <DataTable data={data} columns={columns} />
      <div className="flex flex-row justify-end px-6">{createDialog}</div>
    </div>
  );
};
