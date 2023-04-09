import { DataTable } from "../../common/data-table/DataTable";
import { api } from "../../../utils/api";
import type { AffiliateProfileType } from "../../../server/db-types";
import { createColumnHelper } from "@tanstack/react-table";
import * as z from "zod";
import React from "react";
import type { affiliates_profilesModelType } from "../../../server/db-types";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { useCRUD } from "@/components/common/forms/useCRUD";
import Affiliates from "../../../layouts/AffiliatesLayout";
import { AvailableColumn } from "@/components/common/data-table/available-column";
import { PageHeader } from "@/components/common/page/page-header";
import { Loading } from "@/components/common/Loading";

const columnHelper = createColumnHelper<AffiliateProfileType>();
const createColumn = (id: keyof AffiliateProfileType, header: string) =>
  columnHelper.accessor(id, {
    cell: (info) => info.getValue(),
    header,
  });

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

  const { data, refetch } = api.affiliates.getProfiles.useQuery(undefined, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
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
      deleteTitle: "Delete Profile",
    },
  });

  const columns = [
    createColumn("id", "#"),
    createColumn("name", "Profile Name"),
    createColumn("url", "URL"),
    createColumn("description", "Description"),
    createColumn("source_traffic", "Traffic Source"),
    columnHelper.accessor("valid", {
      // cell: (info) => info.getValue(),
      cell: (info) => <AvailableColumn value={!!info.getValue()} />,
      header: "Available",
    }),
    columnHelper.accessor("edit-button" as any, {
      cell: (info) => editDialog(info.row.original),
      header: "",
    }),
  ];

  return data ? (
    <>
      <PageHeader title="Profile">{createDialog}</PageHeader>
      <DataTable data={data} columns={columns} />
    </>
  ) : (
    <Loading />
  );
};

Profiles.getLayout = Affiliates;
