import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useState } from "react";
import * as z from "zod";
import type {
  affiliates_ticketsModelType,
  AffiliateTicketType,
} from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DataTable } from "../../common/data-table/DataTable";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { useCRUD } from "@/components/common/forms/useCRUD";
import { PageHeader } from "@/components/common/page/page-header";
import { Loading } from "@/components/common/Loading";

const columnHelper = createColumnHelper<AffiliateTicketType>();
const createColumn = (id: keyof AffiliateTicketType, header: string) =>
  columnHelper.accessor(id, {
    cell: (info) => info.getValue(),
    header,
  });

export const schema = z.object({
  subject: z.string().describe("Ticket Subject"),
  reply_email: z.string().email().describe("Your Email"),
  text: z.string().describe("Ticket Content").meta({ control: "Textarea" }),
});

type RecType = affiliates_ticketsModelType;

export const Tickets = () => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);

  const { data, refetch } = api.affiliates.getTickets.useQuery();
  const upsertTicket = api.affiliates.upsertTicket.useMutation();
  const deleteTicket = api.affiliates.deleteTicket.useMutation();

  const { editDialog, createDialog } = useCRUD<RecType>({
    formContext,
    schema,
    refetch: async () => {
      await refetch();
    },
    onDelete: (rec: RecType) => deleteTicket.mutateAsync({ id: rec.id }),
    onUpsert: (rec: RecType) => upsertTicket.mutateAsync(rec),
    text: {
      edit: "Edit",
      editTitle: "Edit Ticket",
      add: "Create New Ticket",
      addTitle: "Create New Ticket",
      deleteTitle: "Delete Ticket",
    },
  });

  const columns = [
    createColumn("id", "#"),
    createColumn("ticket_id", "Ticket ID"),
    columnHelper.accessor("rdate", {
      cell: (info) => format(new Date(info.getValue()), "MM/dd/yyyy hh:mm:ss"),
      header: "Date",
    }),
    createColumn("subject", "Ticket Subject"),
    columnHelper.accessor("last_update", {
      cell: (info) => format(new Date(info.getValue()), "MM/dd/yyyy hh:mm:ss"),
      header: "Last Response",
    }),
    createColumn("status", "Current Status"),
    columnHelper.accessor("edit-button" as any, {
      cell: (info) => editDialog(info.row.original),
      header: "",
    }),
  ];

  return data ? (
    <>
      <PageHeader title="Support">{createDialog}</PageHeader>
      <DataTable data={data} columns={columns} />
    </>
  ) : (
    <Loading />
  );
};
