import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, HStack, Stack, useToast } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import * as z from "zod";
import type {
  affiliates_ticketsModelType,
  AffiliateTicketType,
} from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DataTable } from "../../common/data-table/DataTable";
import { ModalForm } from "../../common/forms/ModalForm";
import {
  ModalFormAction,
  ModalFormButton,
} from "../../common/modal/ModalFormButton";

const columnHelper = createColumnHelper<AffiliateTicketType>();

const schema = z.object({
  subject: z.string().describe("Ticket Subject"),
  reply_email: z.string().email().describe("Your Email"),
  text: z.string().describe("Ticket Content"),
});

const addProps = {
  valid: {
    choices: ["0", "1"],
    controlName: "Switch",
  },
};

type NewRecType = z.infer<typeof schema>;
type RecType = affiliates_ticketsModelType;

export const Tickets = () => {
  const { data, refetch } = api.affiliates.getTickets.useQuery();
  const upsertTicket = api.affiliates.upsertTicket.useMutation();
  const deleteTicket = api.affiliates.deleteTicket.useMutation();
  const [editRec, setEditRec] = useState<RecType | null>(null);
  const toast = useToast();

  console.log("data:", data);
  if (!data) {
    return null;
  }

  const handleDelete = () => {
    if (editRec?.id) {
      deleteTicket.mutate(
        { id: editRec.id },
        {
          onSuccess: () => {
            setEditRec(null);
            toast({
              title: "Ticket deleted",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            void refetch();
          },
          onError: (error) => {
            toast({
              title: "Failed to delete ticket",
              description: `Error: ${error.message}`,
              status: "error",
              duration: 10000,
              isClosable: true,
            });
          },
        }
      );
    }
  };

  const handleSubmit = async (values: NewRecType) => {
    await upsertTicket.mutateAsync({
      ...(editRec || {}),
      ...values,
    });
    await refetch();
  };

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
      cell: (info) => {
        return (
          <Button
            leftIcon={<EditIcon />}
            onClick={() => setEditRec(info.row.original)}
          >
            Edit
          </Button>
        );
      },
      header: "",
    }),
  ];

  const modal = (
    <ModalForm
      schema={schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit}
      formProps={
        editRec
          ? {
              title: "Edit Ticket",
              actionName: "Save",
              actions: (
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  colorScheme="red"
                  leftIcon={<DeleteIcon />}
                  isLoading={deleteTicket.isLoading}
                >
                  Delete
                </Button>
              ),
            }
          : {
              title: "Add Ticket",
              actionName: "Add",
            }
      }
      defaultValues={editRec ? editRec : undefined}
      props={{
        text: {
          controlName: "Textarea",
        },
      }}
    />
  );

  return (
    <Stack m={12} gap={4}>
      <DataTable data={data} columns={columns} />
      <HStack justifyContent="end" px={6}>
        <ModalFormButton actionName="Add" icon={<AddIcon />}>
          {modal}
        </ModalFormButton>
      </HStack>
      <ModalFormAction isOpen={!!editRec} onClose={() => setEditRec(null)}>
        {modal}
      </ModalFormAction>
    </Stack>
  );
};
