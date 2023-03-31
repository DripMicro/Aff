import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
  CheckIcon,
  InfoIcon,
} from "@chakra-ui/icons";
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
import {
  Step,
  Steps,
  //   StepLabel,
  //   StepIcon,
  //   useColorModeValue,
  useSteps,
} from "chakra-ui-steps";
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

import Affiliates from "../../../layouts/AffiliatesLayout";
import TableDropDown from "../../Dropdowns/TableDropdown";
import { PixelMonitorDataTable } from "../../common/data-table/PixelMonitor_DataTable";

const columnHelper = createColumnHelper<PixelMonitorData>();

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

type PixelMonitorData = {
  id: number;
  pixeltype: string;
  merchant: string[];
  creative: string[];
  pixelcode: string;
  type: string[];
  totalfired: number;
  method: string[];
  status: number;
};

const ex_data = [
  {
    id: 0,
    pixeltype: "Merchant",
    merchant: ["Ck Casino"],
    creative: ["Ck Casino"],
    pixelcode: "pixel",
    type: ["Ck Casino"],
    totalfired: 0,
    method: ["Ck Casino"],
    status: 0,
  },
  {
    id: 1,
    pixeltype: "Merchant",
    merchant: ["Ck Casino"],
    creative: ["Ck Casino"],
    pixelcode: "pixel",
    type: ["Ck Casino"],
    totalfired: 0,
    method: ["Ck Casino"],
    status: 0,
  },
  {
    id: 2,
    pixeltype: "Merchant",
    merchant: ["Ck Casino"],
    creative: ["Ck Casino"],
    pixelcode: "pixel",
    type: ["Ck Casino"],
    totalfired: 0,
    method: ["Ck Casino"],
    status: 0,
  },
];

const PixelMonitor = () => {
  const router = useRouter();
  const { pixel_type, merchant, pixel_code, type, method } = router.query;

  const [editRec, setEditRec] = useState<PixelMonitorData | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [count, setCount] = useState(1);
  const [state, setState] = useState(false);
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
  console.log("QueryPiexlMonitor: ", data);

  // const handleDelete = () => {
  //   if (editRec?.id) {
  //     deletePixelMonitor.mutate(
  //       { id: editRec.id },
  //       {
  //         onSuccess: () => {
  //           setEditRec(null);
  //           toast({
  //             title: "Pixel Monitor deleted",
  //             status: "success",
  //             duration: 5000,
  //             isClosable: true,
  //           });
  //           void refetch();
  //         },
  //         onError: (error) => {
  //           toast({
  //             title: "Failed to delete pixel monitor",
  //             description: `Error: ${error.message}`,
  //             status: "error",
  //             duration: 10000,
  //             isClosable: true,
  //           });
  //         },
  //       }
  //     );
  //   }
  // };

  // const handleUpdate = async (values: NewRecType) => {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //   const merchant_id = parseInt(values.merchant_id);

  //   if (!merchant_id) {
  //     throw new Error("Missing merchant_id");
  //   }

  //   await upsertPixelMonitor.mutateAsync({
  //     ...(editRec || {}),
  //     ...values,
  //     merchant_id,
  //   });
  //   await refetch();
  // };

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
          count={count}
          setCount={setCount}
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
          count={count}
          setCount={setCount}
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
          count={count}
          setCount={setCount}
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
          count={count}
          setCount={setCount}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      ),
    },
    {
      id: 5,
      label: "Finish",
      content: (
        <FinishForm
          count={count}
          setCount={setCount}
          onSubmit={handleSubmit}
          onPrevious={handlePrevious}
        />
      ),
    },
  ];

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "id",
    }),
    columnHelper.accessor("pixeltype", {
      cell: (info) => info.getValue(),
      header: "Pixel Type ",
    }),
    columnHelper.accessor("merchant", {
      cell: (info) => info.getValue(),
      header: "Merchant",
    }),
    columnHelper.accessor("creative", {
      cell: (info) => info.getValue(),
      header: "Creative",
    }),
    columnHelper.accessor("pixelcode", {
      cell: (info) => info.getValue(),
      header: "Pixel Code",
    }),
    columnHelper.accessor("type", {
      cell: (info) => {
        info.getValue();
      },
      header: "Type",
    }),
    columnHelper.accessor("totalfired", {
      cell: (info) => info.getValue(),
      header: "Total Fired",
    }),
    columnHelper.accessor("method", {
      cell: (info) => info.getValue(),
      header: "Method",
    }),
    columnHelper.accessor("status", {
      cell: (info) => {
        return (
          <Image
            src={info.getValue() === 1 ? "/docs_green.jpg" : "/docs_red.png"}
            boxSize="20px"
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
        console.log("info: ", info.getValue());
        return (
          // <Image src="/action.png" className="content-center" ml={6} onClick={() => handleClick(info)}/>
          <div className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-right align-middle text-xs">
            <TableDropDown
              setEditRec={setEditRec}
              setState={setState}
              state={state}
              info={info.row.original}
            />
          </div>
        );
      },
      header: "Action",
    }),
  ];

  console.log("editRec: ", editRec);

  console.log("Pixel Monitor editRec: editRec ", editRec);
  return (
    <div className="pt-5 pb-4">
      <div className="mb-5 block px-6 text-base font-medium">
        <span className="text-[#2262C6]">Dashboard</span> - Attributions
      </div>
      <div className="md:flex">
        <div className="relative hidden flex-1  rounded-md p-2 px-2 drop-shadow md:ml-5 md:block md:px-3 md:pt-1.5 md:pb-2">
          <input
            className="placeholder-blueGray-300 text-blueGray-700 h-10 w-96 rounded  border bg-white px-3 py-3 text-sm shadow "
            placeholder="Search Merchant.."
          />
          <label className="  absolute  mt-2 -ml-6">
            <SearchIcon color="#B3B3B3" />
          </label>
        </div>
        <HStack justifyContent="end">
          <button
            onClick={onOpen}
            className="mb-7 hidden h-10 w-44 rounded-md bg-blue-600 text-sm text-stone-50 outline md:block"
          >
            New Pixel Monitor
          </button>
          <Modal isOpen={isOpen} onClose={onClose} isCentered size="5xl">
            <ModalOverlay />
            <ModalContent ml={4} mr={4}>
              <div className="mb-2 mr-2 ml-2 flex items-end justify-between pl-6 pt-4 md:pl-8 ">
                <div className="font-xl font-normal text-[#000000]">
                  Add New Pixel Monitor
                </div>
                <img
                  alt="..."
                  className="mr-4 h-10 w-10 rounded-full align-middle "
                  src="/img/icons/close.png"
                  onClick={onClose}
                />
              </div>
              <ModalBody>
                <div className="flex">
                  {steps.map(({ id, label, content }) => {
                    return (
                      <>
                        <div key={id} className="flex-1">
                          <div className="flex items-center">
                            {count >= id ? (
                              count > id ? (
                                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-dashed border-[#2262C6] bg-[#F4F4F4] text-center text-xs text-[#2262C6] md:h-12 md:w-12 md:text-base">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="14"
                                    viewBox="0 0 18 14"
                                    fill="none"
                                  >
                                    <path
                                      d="M6.00039 11.2L1.80039 7L0.400391 8.4L6.00039 14L18.0004 2L16.6004 0.599998L6.00039 11.2Z"
                                      fill="#2262C6"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-dashed border-[#2262C6] bg-[#F4F4F4] text-center text-[8px] font-medium text-[#2262C6] md:h-12 md:w-12 md:text-base">
                                  0{id}
                                </div>
                              )
                            ) : (
                              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-dashed border-[#727272] bg-[#F4F4F4] text-center text-[8px] font-medium text-black md:h-12 md:w-12 md:text-base">
                                0{id}
                              </div>
                            )}
                            <div className=" ml-1 text-[8px] text-[#000000] md:ml-2 md:text-base">
                              {label}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div>
                  {steps.map(({ id, label, content }) => {
                    return <div key={id}>{count === id ? content : null}</div>;
                  })}
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </HStack>
      </div>

      <div className="rounded-[5px] bg-white pt-3 pl-3 pb-20 shadow-md md:mb-10 md:rounded-[15px]">
        <PixelMonitorDataTable
          data={ex_data}
          columns={columns}
          editRec={editRec?.id}
          state={state}
        />
        <div className="flex  justify-end ">
          <button
            onClick={onOpen}
            className="mb-7 mr-3 mt-6 h-10 w-44 rounded-md bg-blue-600 text-sm text-stone-50 outline md:hidden"
          >
            New Pixel Monitor
          </button>
        </div>
      </div>
    </div>
  );
};

export default PixelMonitor;

PixelMonitor.getLayout = Affiliates;
