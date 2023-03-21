import { Stack, Button, HStack, useToast } from "@chakra-ui/react";
import { DataTable } from "../../common/data-table/DataTable";
import { api } from "../../../utils/api";
import type { AffiliateDocumentType } from "../../../server/db-types";
import { createColumnHelper } from "@tanstack/react-table";
import * as z from "zod";
import axios from "axios";
import { ModalForm } from "../../common/forms/ModalForm";
import { AddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { format } from "date-fns";
import {
  ModalFormAction,
  ModalFormButton,
} from "../../common/modal/ModalFormButton";

const columnHelper = createColumnHelper<AffiliateDocumentType>();

const schema = z.object({
  documentType: z.string().describe("Document Type // Select a Document Type"),
  documentFile: z
    .any()
    // .refine((val) => val.length > 0, "File is required")
    .describe("Document File"),
});

type NewRecType = z.infer<typeof schema>;

export const Documents = () => {
  const { data, refetch } = api.affiliates.getDocuments.useQuery();
  const [editRec, setEditRec] = useState<null>(null);
  const toast = useToast();

  if (!data) {
    return null;
  }

  const handleSubmit = async (values: NewRecType) => {
    console.log(`muly:handleSubmit`, { values });

    const formData = new FormData();
    const strMonthYear = format(new Date(), "yyyy-MM-dd");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    formData.append("document_upload", values.documentFile);
    formData.append("doc_type", values.documentType);
    formData.append("affiliate_id", String(500));
    formData.append("monthyear", strMonthYear);
    // const url = "https://go.gamingaffiliates.co/ajax/UploadDocuments.php";
    const url = "/api/document-upload";
    const answer = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log(`muly:handleSubmit DONE`, { answer });
    await refetch();
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => Number(info.getValue()),
      header: "#",
    }),
    columnHelper.accessor("name", {
      cell: (info) => {
        const arrFileName = info.getValue().split(".");
        return <a href="#">{arrFileName[0]}</a>;
      },
      header: "Document Name",
    }),
    columnHelper.accessor("type", {
      cell: (info) => {
        const arrDocType = info.getValue().split("_");
        let strDocType = "";
        arrDocType.map((item) => {
          strDocType +=
            String(item[0]?.toUpperCase()) + String(item.substring(1)) + " ";
        });
        return <span>{strDocType}</span>;
      },
      header: "Type",
    }),
    columnHelper.accessor("rdate", {
      cell: (info) => format(new Date(info.getValue()), "MM/dd/yyyy hh:mm:ss"),
      header: "Date Received",
    }),
    columnHelper.accessor("doc_status", {
      cell: (info) => {
        const arrDocStatus = info.getValue().split("_");
        let strDocStatus = "";
        arrDocStatus.map((item) => {
          strDocStatus +=
            String(item[0]?.toUpperCase()) + String(item.substring(1)) + " ";
        });
        return <span>{strDocStatus}</span>;
      },
      header: "Status",
    }),
    columnHelper.accessor("edit-button" as any, {
      cell: (info) => {
        return <a href="#">view</a>;
      },
      header: "",
    }),
  ];

  const modal = (
    <ModalForm
      schema={schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit}
      formProps={{
        title: "Upload new document",
        actionName: "Submit Document",
      }}
      props={{
        documentType: {
          choices: [
            {
              id: "Passport_Driving_Licence",
              title: "Passport/Driving Licence",
            },
            { id: "Address_Verification", title: "Address Verification" },
            { id: "Company_Verification", title: "Company Verification" },
          ],
        },
        documentFile: {
          controlName: "File",
        },
      }}
    />
  );

  return (
    <Stack m={12} gap={4}>
      <DataTable data={data} columns={columns} />
      <HStack justifyContent="end" px={6}>
        <ModalFormButton actionName="Upload New Document" icon={<AddIcon />}>
          {modal}
        </ModalFormButton>
      </HStack>
      <ModalFormAction isOpen={!!editRec} onClose={() => setEditRec(null)}>
        {modal}
      </ModalFormAction>
    </Stack>
  );
};
