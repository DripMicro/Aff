import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";
import * as z from "zod";
import type { pixel_monitorModelType } from "../../../server/db-types";
import { api } from "../../../utils/api";

import Affiliates from "../../../layouts/AffiliatesLayout";
import { AvailableColumn } from "@/components/common/data-table/available-column";
import { useCRUD } from "@/components/common/forms/useCRUD";
import { PageHeader } from "@/components/common/page/page-header";
import { DataTable } from "@/components/common/data-table/DataTable";
import { Loading } from "@/components/common/Loading";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import type { PixelMonitorType } from "../../../server/db-types";
import type { ChoiceType, ZodMetaDataItem } from "@/utils/zod-meta";
import type { WizardInfo } from "@/components/common/wizard/useWizardFlow";

const columnHelper = createColumnHelper<PixelMonitorType>();

const createColumn = (
  id: keyof PixelMonitorType,
  header: string,
  isNumeric?: boolean
) =>
  columnHelper.accessor(id, {
    cell: (info) => info.getValue(),
    header,
    meta: { isNumeric },
  });

const schema = z.object({
  merchant_id: z.coerce.number().describe("Select Merchants"),
  type: z.enum(["lead", "account", "sale", "qftd"]).describe("Type"),
  all_creative: z
    .boolean()
    .optional()
    .describe("All Creative")
    .meta({
      beforeElement: () => <div className="">Select Creative</div>,
    }),
  banner_id: z.coerce
    .number()
    .optional()
    .describe("Creative")
    .meta({
      condition: (wizardInfo: WizardInfo, data?: any): ZodMetaDataItem => {
        console.log(`muly:banner_id:condition`, { wizardInfo, data });
        const merchant_id = data.merchant_id;
        const merchants: any[] =
          // @ts-ignore
          wizardInfo.props?.pixelMonitorFormMeta?.merchants;

        const merchant = merchants.find(
          // @ts-ignore
          ({ id }: ChoiceType) => id === Number(merchant_id)
        );

        return {
          choices: merchant?.merchants_creative,
          props: { disabled: !!data.all_creative },
        };
      },
    }),
  pixelCode: z.string().describe("Pixel Code").meta({ control: "Textarea" }),
  // pixelCode: z
  //   .string()
  //   .describe("Pixel Code")
  //   .meta({
  //     preprocess: (wizardInfo: WizardInfo): ZodMetaDataItem => {
  //       const form = useFormContext();
  //       const merchant_id = form.watch("merchant_id");
  //
  //       const merchant =
  //         wizardInfo.formContext.extraInfo?.pixelMonitorFormMeta?.merchants.find(
  //           // @ts-ignore
  //           ({ id }: ChoiceType) => id === Number(merchant_id)
  //         );
  //
  //       return { choices: merchant?.merchants_creative };
  //     },
  //   }),
  method: z.enum(["post", "get", "client"]).describe("Method"),
  valid: z.coerce
    .number()
    .nullish()
    .describe("Enable")
    .meta({ control: "Switch", choices: ["0", "1"] }),
});

type RecType = pixel_monitorModelType;

const PixelMonitor = () => {
  const { t } = useTranslation("affiliate");

  const { data: meta } = api.affiliates.getPixelMonitorMeta.useQuery(
    undefined,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const formContext = usePrepareSchema(t, schema, {
    pixelMonitorFormMeta: meta,
  });

  const { data, refetch } = api.affiliates.getPixelMonitor.useQuery(undefined, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const upsertPixelMonitor = api.affiliates.upsertPixelMonitor.useMutation();
  const deletePixelMonitor = api.affiliates.deletePixelMonitor.useMutation();

  // const handleNext = (values: object) => {
  //   const keys = Object.keys(values);
  //   keys.map((key) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  //     setFormState({ ...formState, [key]: (values as any)[key] });
  //   });
  //   nextStep();
  // };
  //
  // const handlePrevious = () => {
  //   prevStep();
  // };
  //
  // const handleSubmit = async () => {
  //   const values = formState;
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //   const merchant_id = parseInt(values.merchant_id);
  //
  //   if (!merchant_id) {
  //     throw new Error("Missing merchant_id");
  //   }
  //
  //   const rec = {
  //     ...(editRec || {}),
  //     ...values,
  //     merchant_id,
  //   };
  //
  //   await upsertPixelMonitor.mutateAsync(rec);
  //
  //   onClose();
  //   reset();
  //   setFormState(newRecValues);
  //   await refetch();
  // };
  //
  // const steps = [
  //   {
  //     id: 1,
  //     label: "Pixel Type",
  //     content: (
  //       <PixelTypeForm
  //         stepCount={5}
  //         activeStep={activeStep}
  //         values={formState}
  //         merchants={meta?.merchants}
  //         merchant_creative={meta?.merchants_creative}
  //         count={count}
  //         setCount={setCount}
  //         onNext={handleNext}
  //         onPrevious={handlePrevious}
  //       />
  //     ),
  //   },
  //   {
  //     id: 2,
  //     label: "Trigger",
  //     content: (
  //       <TriggerForm
  //         stepCount={5}
  //         activeStep={activeStep}
  //         values={formState}
  //         type={meta?.type}
  //         count={count}
  //         setCount={setCount}
  //         onNext={handleNext}
  //         onPrevious={handlePrevious}
  //       />
  //     ),
  //   },
  //   {
  //     id: 3,
  //     label: "Pixel Code",
  //     content: (
  //       <PixelCodeForm
  //         stepCount={5}
  //         activeStep={activeStep}
  //         values={formState}
  //         onNext={handleNext}
  //         onPrevious={handlePrevious}
  //         count={count}
  //         setCount={setCount}
  //       />
  //     ),
  //   },
  //   {
  //     id: 4,
  //     label: "Method",
  //     content: (
  //       <MethodForm
  //         stepCount={5}
  //         activeStep={activeStep}
  //         values={formState}
  //         method={meta?.method}
  //         count={count}
  //         setCount={setCount}
  //         onNext={handleNext}
  //         onPrevious={handlePrevious}
  //       />
  //     ),
  //   },
  //   {
  //     id: 5,
  //     label: "Finish",
  //     content: (
  //       <FinishForm
  //         count={count}
  //         setCount={setCount}
  //         onSubmit={handleSubmit}
  //         onPrevious={handlePrevious}
  //       />
  //     ),
  //   },
  // ];

  const { editDialog, createDialog } = useCRUD<RecType>({
    formContext,
    schema,
    refetch: async () => {
      await refetch();
    },
    onDelete: (rec: RecType) => deletePixelMonitor.mutateAsync({ id: rec.id }),
    onUpsert: (rec: RecType) => upsertPixelMonitor.mutateAsync(rec),
    text: {
      edit: "Edit",
      editTitle: "Edit Pixel Monitor",
      add: "Create Pixel Monitor",
      addTitle: "Create Pixel Monitor",
      deleteTitle: "Deleted Pixel Monitor",
    },
    props: {
      merchant_id: { choices: meta?.merchants },
      type: { choices: meta?.type },
      method: { choices: meta?.method },
    },
  });

  const columns = [
    createColumn("id", "id"),
    columnHelper.accessor("type", {
      cell: (info) =>
        meta?.type.find(({ id }) => id === info.getValue())?.title ??
        info.getValue(),
      header: "Pixel Type",
    }),
    columnHelper.accessor("merchant", {
      cell: (info) => info.getValue().name,
      header: "Merchant",
    }),
    columnHelper.accessor("merchants_creative", {
      cell: (info) => info.getValue()?.title,
      header: "Creative",
    }),
    createColumn("pixelCode", "Pixel Code"),
    createColumn("totalFired", "Total Fired"),
    columnHelper.accessor("method", {
      cell: (info) =>
        meta?.method.find(({ id }) => id === info.getValue())?.title ??
        info.getValue(),
      header: "Method",
    }),
    columnHelper.accessor("valid", {
      cell: (info) => <AvailableColumn value={info.getValue() === 1} />,
      header: "Status",
    }),
    columnHelper.accessor("edit-button" as any, {
      cell: (info) => editDialog(info.row.original),
      header: "",
    }),
  ];

  // console.log(`muly:PixelMonitor`, { data });

  return data ? (
    <>
      <PageHeader title="Pixel Monitor">{createDialog}</PageHeader>
      <DataTable data={data} columns={columns} />
    </>
  ) : (
    <Loading />
  );
};

export default PixelMonitor;

PixelMonitor.getLayout = Affiliates;
