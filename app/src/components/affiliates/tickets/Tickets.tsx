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

const columnHelper = createColumnHelper<AffiliateTicketType>();

export const schema = z.object({
  subject: z.string().describe("Ticket Subject"),
  reply_email: z.string().email().describe("Your Email"),
  text: z.string().describe("Ticket Content"),
});

type RecType = affiliates_ticketsModelType;

export const Tickets = () => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);

  const { data, refetch } = api.affiliates.getTickets.useQuery();
  const upsertTicket = api.affiliates.upsertTicket.useMutation();
  const deleteTicket = api.affiliates.deleteTicket.useMutation();
  const [editRec, setEditRec] = useState<RecType | null>(null);

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
      add: "Add",
      addTitle: "Add Ticket",
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
    columnHelper.accessor("ticket_id", {
      cell: (info) => info.getValue(),
      header: "Ticket ID",
    }),
    columnHelper.accessor("rdate", {
      cell: (info) => format(new Date(info.getValue()), "MM/dd/yyyy hh:mm:ss"),
      header: "Date",
    }),
    columnHelper.accessor("subject", {
      cell: (info) => info.getValue(),
      header: "Ticket Subject",
    }),
    columnHelper.accessor("last_update", {
      cell: (info) => format(new Date(info.getValue()), "MM/dd/yyyy hh:mm:ss"),
      header: "Last Response",
    }),
    columnHelper.accessor("status", {
      cell: (info) => info.getValue(),
      header: "Current Status",
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
