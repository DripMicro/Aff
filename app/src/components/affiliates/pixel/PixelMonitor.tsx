import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useRouter } from "next/router";
import { useState } from "react";
import * as z from "zod";
import type {
  PixelMonitorType,
  pixel_monitorModelType,
} from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DataTable } from "../../common/data-table/DataTable";
import { QuerySelect } from "../../common/QuerySelect";
import { QueryText } from "../../common/QueryText";
import { FinishForm } from "./FinishForm";
import { MethodForm } from "./MethodForm";
import { PixelCodeForm } from "./PixelCodeForm";
import { PixelTypeForm } from "./PixelTypeForm";
import { TriggerForm } from "./TriggerForm";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import * as React from "react";
import { useCRUD } from "@/components/common/forms/useCRUD";

const columnHelper = createColumnHelper<PixelMonitorType>();

const schema = z.object({
  merchant_id: z.number().describe("Select Merchants"),
  type: z.enum(["lead", "account", "sale", "qftd"]).describe("Type"),
  pixelCode: z.string().describe("Pixel Code").meta({
    control: "Textarea",
  }),
  method: z.enum(["post", "get", "client"]).describe("Method"),
  valid: z.coerce
    .number()
    .describe("Status")
    .meta({
      choices: ["0", "1"],
      control: "Switch",
    }),
});

type NewRecType = z.infer<typeof schema>;
type RecType = pixel_monitorModelType;

const newRecValues: NewRecType = {
  merchant_id: 0,
  type: "account",
  pixelCode: "",
  method: "get",
  valid: 1,
};

export const PixelMonitor = () => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);

  const router = useRouter();
  const { pixel_type, merchant, pixel_code, type, method } = router.query;

  const [editRec, setEditRec] = useState<RecType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [formState, setFormState] = useState<NewRecType>(newRecValues);

  const { data: meta } = api.affiliates.getPixelMonitorMeta.useQuery();

  console.log(`muly:PixelMonitor`, { formState, meta });

  const { data, refetch } = api.affiliates.getPixelMonitor.useQuery(
    {
      pixel_type: pixel_type ? String(pixel_type) : undefined,
      merchant: merchant ? Number(merchant) : undefined,
      pixel_code: pixel_code ? String(pixel_code) : undefined,
      type: type ? String(type) : undefined,
      method: method ? String(method) : undefined,
    },
    { keepPreviousData: true }
  );
  const upsertPixelMonitor = api.affiliates.upsertPixelMonitor.useMutation();
  const deletePixelMonitor = api.affiliates.deletePixelMonitor.useMutation();

  const { editDialog } = useCRUD<RecType>({
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
      add: "Add",
      addTitle: "New Pixel Monitor",
    },
  });

  if (!data) {
    return null;
  }

  const handleNext = (values: object) => {
    const keys = Object.keys(values);
    keys.map((key) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      setFormState({ ...formState, [key]: (values as any)[key] });
    });
    nextStep();
  };

  const handlePrevious = () => {
    prevStep();
  };

  const handleSubmit = async () => {
    const values = formState;
    console.log(`muly:handleSubmit`, { values });
    const merchant_id = values.merchant_id;

    if (!merchant_id) {
      throw new Error("Missing merchant_id");
    }

    const rec = {
      ...(editRec || {}),
      ...values,
      merchant_id,
    };

    await upsertPixelMonitor.mutateAsync(rec);

    setIsOpen(false);
    reset();
    setFormState(newRecValues);
    await refetch();
  };

  const steps = [
    {
      id: 1,
      label: "Pixel Type",
      content: (
        <PixelTypeForm
          stepCount={5}
          activeStep={activeStep}
          values={formState}
          merchants={meta?.merchants}
          merchant_creative={meta?.merchants_creative}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      ),
    },
    {
      id: 2,
      label: "Trigger",
      content: (
        <TriggerForm
          stepCount={5}
          activeStep={activeStep}
          values={formState}
          type={meta?.type}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      ),
    },
    {
      id: 3,
      label: "Pixel Code",
      content: (
        <PixelCodeForm
          stepCount={5}
          activeStep={activeStep}
          values={formState}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      ),
    },
    {
      id: 4,
      label: "Method",
      content: (
        <MethodForm
          stepCount={5}
          activeStep={activeStep}
          values={formState}
          method={meta?.method}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      ),
    },
    {
      id: 5,
      label: "Finish",
      content: (
        <FinishForm onSubmit={handleSubmit} onPrevious={handlePrevious} />
      ),
    },
  ];

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "#",
    }),
    columnHelper.accessor("merchant.name", {
      cell: (info) => info.getValue(),
      header: "Merchant",
    }),
    columnHelper.accessor("pixelCode", {
      cell: (info) => info.getValue(),
      header: "Pixel Code",
    }),
    columnHelper.accessor("type", {
      cell: (info) => {
        switch (info.getValue()) {
          case "account":
            return "Account";
          case "sale":
            return "FTD";
          case "lead":
            return "Lead";
          case "qftd":
            return "Qualified FTD";
          default:
            return "";
        }
      },
      header: "Type",
    }),
    columnHelper.accessor("method", {
      cell: (info) => info.getValue().toUpperCase(),
      header: "Method",
    }),
    columnHelper.accessor("valid", {
      cell: (info) => {
        return (
          <Image
            src={info.getValue() === 1 ? "/docs_green.jpg" : "/docs_red.png"}
            boxSize="15px"
            objectFit="cover"
            alt="Dan Abramov"
            display="inline-block"
          />
        );
      },
      header: "Status",
    }),
    columnHelper.accessor("edit-button" as any, {
      cell: (info) => editDialog(info.row.original),
      header: "Action",
    }),
  ];

  return (
    <Stack m={12} gap={2}>
      <Flex direction="row" gap={2}>
        <QuerySelect
          label="Pixel Type"
          choices={meta?.pixel_type}
          varName="pixel_type"
        />
        <QuerySelect
          label="Merchant"
          choices={meta?.merchants}
          varName="merchant"
        />
        <QueryText varName="pixel_code" label="Pixel Code" />
        <QuerySelect label="Type" choices={meta?.type} varName="type" />
        <QuerySelect label="Method" choices={meta?.method} varName="method" />
      </Flex>
      <DataTable data={data} columns={columns} />
      <HStack justifyContent="end">
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          colorScheme="blue"
          leftIcon={<AddIcon />}
        >
          New Pixel Monitor
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Pixel Monitor</DialogTitle>
            </DialogHeader>
            <Flex flexDir="column" width="100%">
              <Steps activeStep={activeStep} size="sm">
                {steps.map(({ id, label, content }) => {
                  return (
                    <Step key={id} label={label}>
                      {content}
                    </Step>
                  );
                })}
              </Steps>
            </Flex>
          </DialogContent>
        </Dialog>
      </HStack>
    </Stack>
  );
};
