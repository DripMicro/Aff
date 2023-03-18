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
// import type { schema as schemaPixelMonitor } from "../../../shared-types/forms/pixel-monitor";
import { api } from "../../../utils/api";
import { DataTable } from "../../common/data-table/DataTable";
import { ModalForm } from "../../common/forms/ModalForm";
import { ModalFormAction } from "../../common/modal/ModalFormButton";
import { QuerySelect } from "../../common/QuerySelect";
import { QueryText } from "../../common/QueryText";
import { FinishForm } from "./FinishForm";
import { MethodForm } from "./MethodForm";
import { PixelCodeForm } from "./PixelCodeForm";
import { PixelTypeForm } from "./PixelTypeForm";
import { TriggerForm } from "./TriggerForm";

const columnHelper = createColumnHelper<PixelMonitorType>();

const schema = z.object({
  merchant_id: z.any().describe("Select Merchants"),
  type: z.enum(["lead", "account", "sale", "qftd"]).describe("Type"),
  pixelCode: z.string().describe("Pixel Code"),
  method: z.enum(["post", "get", "client"]).describe("Method"),
  valid: z.coerce.number().describe("Status"),
});

type NewRecType = z.infer<typeof schema>;
type RecType = pixel_monitorModelType;

const newRecValues: NewRecType = {
  merchant_id: "",
  type: "account",
  pixelCode: "",
  method: "get",
  valid: 1,
};

export const PixelMonitor = () => {
  const router = useRouter();
  const { pixel_type, merchant, pixel_code, type, method } = router.query;

  const [editRec, setEditRec] = useState<RecType | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const toast = useToast();

  const [formState, setFormState] = useState<NewRecType>(newRecValues);

  const { data: meta } = api.affiliates.getPixelMonitorMeta.useQuery();

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

  if (!data) {
    return null;
  }

  const handleDelete = () => {
    if (editRec?.id) {
      deletePixelMonitor.mutate(
        { id: editRec.id },
        {
          onSuccess: () => {
            setEditRec(null);
            toast({
              title: "Pixel Monitor deleted",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            void refetch();
          },
          onError: (error) => {
            toast({
              title: "Failed to delete pixel monitor",
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

  const handleUpdate = async (values: NewRecType) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const merchant_id = parseInt(values.merchant_id);

    if (!merchant_id) {
      throw new Error("Missing merchant_id");
    }

    await upsertPixelMonitor.mutateAsync({
      ...(editRec || {}),
      ...values,
      merchant_id,
    });
    await refetch();
  };

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const merchant_id = parseInt(values.merchant_id);

    if (!merchant_id) {
      throw new Error("Missing merchant_id");
    }

    const rec = {
      ...(editRec || {}),
      ...values,
      merchant_id,
    };

    await upsertPixelMonitor.mutateAsync(rec);

    onClose();
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
      header: "Action",
    }),
  ];

  const modal = (
    <ModalForm
      schema={schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleUpdate}
      formProps={
        editRec
          ? {
              title: "Edit Pixel Monitor",
              actionName: "Update",
              actions: (
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  colorScheme="red"
                  leftIcon={<DeleteIcon />}
                  isLoading={deletePixelMonitor.isLoading}
                >
                  Delete
                </Button>
              ),
            }
          : {
              title: "Add Pixel Monitor",
              actionName: "Add",
            }
      }
      // @ts-ignore
      defaultValues={editRec ? editRec : { valid: 1 }}
      props={{
        merchant_id: {
          choices: meta?.merchants,
        },
        type: {
          choices: meta?.type,
        },
        pixelCode: {
          controlName: "Textarea",
        },
        method: {
          choices: meta?.method,
        },
        valid: {
          choices: ["0", "1"],
          controlName: "Switch",
        },
      }}
    />
  );

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
          onClick={onOpen}
          variant="outline"
          colorScheme="blue"
          leftIcon={<AddIcon />}
        >
          New Pixel Monitor
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Pixel Monitor</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
            </ModalBody>

            {/* <ModalFooter>
              {activeStep === steps.length ? (
                <Flex p={4}>
                  <Button mx="auto" size="sm" onClick={reset}>
                    Reset
                  </Button>
                </Flex>
              ) : (
                <Flex width="100%" justify="flex-end">
                  <Button
                    isDisabled={activeStep === 0}
                    mr={4}
                    onClick={prevStep}
                    size="md"
                    variant="ghost"
                  >
                    Prev
                  </Button>
                  <Button size="md" onClick={nextStep}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Flex>
              )}
            </ModalFooter> */}
          </ModalContent>
        </Modal>
        <ModalFormAction isOpen={!!editRec} onClose={() => setEditRec(null)}>
          {modal}
        </ModalFormAction>
      </HStack>
    </Stack>
  );
};
