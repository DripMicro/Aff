import { DataTable } from "../../common/data-table/DataTable";
import { api } from "../../../utils/api";
import type { AffiliateDocumentType } from "../../../server/db-types";
import { createColumnHelper } from "@tanstack/react-table";
import * as z from "zod";
import axios from "axios";
import React, { useState } from "react";
import { format } from "date-fns";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { useTranslation } from "next-i18next";
import { useCRUD } from "@/components/common/forms/useCRUD";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/common/page/page-header";
import { Loading } from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { ViewIcon } from "lucide-react";

const columnHelper = createColumnHelper<AffiliateDocumentType>();

export const schema = z.object({
  documentType: z
    .string()
    .describe("Document Type // Select a Document Type")
    .meta({
      choices: [
        {
          id: "Passport_Driving_Licence",
          title: "Passport/Driving Licence",
        },
        { id: "Address_Verification", title: "Address Verification" },
        { id: "Company_Verification", title: "Company Verification" },
      ],
    }),
  documentFile: z
    .any()
    // .refine((val) => val.length > 0, "File is required")
    .describe("Document File")
    .meta({ control: "File" }),
});

type NewRecType = z.infer<typeof schema>;

export const Documents = () => {
  const { t } = useTranslation("affiliate");
  const { data, refetch } = api.affiliates.getDocuments.useQuery();
  const formContext = usePrepareSchema(t, schema);
  const { toast } = useToast();

  const handleUpload = async (values: NewRecType) => {
    console.log(`muly:handleUpload`, { values });

    if (values.documentFile.size > 10_000_000) {
      throw new Error(
        t(
          "document.too_big",
          "Document, too big, Maximum document size is 10MB"
        ) || ""
      );
    }

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
    return values;
  };

  const { createDialog } = useCRUD<NewRecType>({
    formContext,
    schema,
    refetch: async () => {
      await refetch();
    },
    onDelete: null,
    onUpsert: (rec: NewRecType) => handleUpload(rec),
    text: {
      edit: "Edit",
      editTitle: "Edit Document",
      addTitle: "Upload New Document",
      add: "Upload New Document",
      deleteTitle: "Delete Document",
    },
  });

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
      cell: (info) => (
        <Button variant="text">
          <ViewIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      ),
      header: "",
    }),
  ];

  console.log(`muly:Documents`, { data });

  return data ? (
    <>
      <PageHeader title="Documents">{createDialog}</PageHeader>
      <DataTable data={data} columns={columns} />
    </>
  ) : (
    <Loading />
  );
};
