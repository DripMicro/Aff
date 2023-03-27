import Affiliates from "../../../layouts/AffiliatesLayout";
import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  CloseIcon,
  EditIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import {
  Stack,
  Button,
  HStack,
  useToast,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { DataTable } from "../../common/data-table/DataTable";
import { api } from "../../../utils/api";
import type { AffiliateProfileType } from "../../../server/db-types";
import { createColumnHelper } from "@tanstack/react-table";
import * as z from "zod";
import { ModalForm } from "../../common/forms/ModalForm";
import {
  ModalFormAction,
  ModalFormButton,
} from "../../common/modal/ModalFormButton";
import SupportDropDown from "../../Dropdowns/SupportDropdown";
import type { affiliates_profilesModelType } from "../../../server/db-types";

interface Data {
  propsdata: object;
}

const columnHelper = createColumnHelper<AffiliateProfileType>();

const schema = z.object({
  name: z.string().describe("Profile Name"),
  description: z.string().optional().describe("Description"),
  source_traffic: z.string().optional().describe("Traffic Source"),
  url: z.string().url().describe("URL"),
  valid: z.coerce.number().describe("Available"),
});

const addProps = {
  valid: {
    choices: ["0", "1"],
    controlName: "Switch",
  },
};

type NewRecType = z.infer<typeof schema>;
type RecType = affiliates_profilesModelType;
const SupportComponent = (props: Data) => {
  // console.log(props.propsdata.title)
  const [expanded1, setExpanded1] = useState(true);

  const { data, refetch } = api.affiliates.getProfiles.useQuery();
  const upsertProfile = api.affiliates.upsertProfile.useMutation();
  const deleteProfile = api.affiliates.deleteProfile.useMutation();
  const [editRec, setEditRec] = useState<RecType | null>(null);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!data) {
    return null;
  }

  console.log("Data: ", data);

  const handleDelete = () => {
    if (editRec?.id) {
      deleteProfile.mutate(
        { id: editRec.id },
        {
          onSuccess: () => {
            setEditRec(null);
            toast({
              title: "Profile deleted",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            void refetch();
          },
          onError: (error) => {
            toast({
              title: "Failed to delete profile",
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
    console.log(`muly:handleSubmit`, { values });
    await upsertProfile.mutateAsync({
      ...(editRec || {}),
      ...values,
      description: values.description || "",
      source_traffic: values.source_traffic || "",
    });
    await refetch();
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "#",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Profile Name",
    }),
    columnHelper.accessor("url", {
      cell: (info) => info.getValue(),
      header: "URL",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "Description",
      // meta: {
      //   isNumeric: true,
      // },
    }),
    columnHelper.accessor("source_traffic", {
      cell: (info) => info.getValue(),
      header: "Traffic Source",
    }),
    columnHelper.accessor("valid", {
      // cell: (info) => info.getValue(),
      cell: (info) => {
        return info.getValue() ? (
          <CheckIcon color="#50B8B6" marginLeft="8" />
        ) : (
          <CloseIcon color="#FE6969" marginLeft="8" width="2" height="2" />
        );
      },
      header: "Available",
    }),
    columnHelper.accessor("edit-button" as any, {
      cell: (info) => {
        return (
          <Button
            leftIcon={<EditIcon />}
            onClick={() => setEditRec(info.row.original)}
            fontSize="text-xs"
            width="14"
            height="7"
          >
            Edit
          </Button>
        );
      },
      header: "Action",
    }),
  ];

  // const modal = (
  //   <ModalForm
  //     schema={schema}
  //     // eslint-disable-next-line @typescript-eslint/no-misused-promises
  //     onSubmit={handleSubmit}
  //     formProps={
  //       editRec
  //         ? {
  //           title: "Edit profile",
  //           actionName: "Save",
  //           actions: (
  //             <Button
  //               onClick={handleDelete}
  //               variant="outline"
  //               colorScheme="red"
  //               leftIcon={<DeleteIcon />}
  //               isLoading={deleteProfile.isLoading}
  //             >
  //               Delete
  //             </Button>
  //           ),
  //         }
  //         : {
  //           title: "Add profile",
  //           actionName: "Save",
  //         }
  //     }
  //     defaultValues={editRec ? editRec : { valid: 1 }}
  //     props={addProps}
  //   />

  // );
  return (
    <div className="mt-2 flex  h-auto cursor-pointer flex-col justify-between rounded-lg bg-[#F9FBFF]  px-3 pt-3 transition-all duration-500 md:py-2 md:px-5">
      <div className="text-base font-medium md:text-xl  ">
        <div className="flex">
          <button
            className="mt-2 h-7 w-7 rounded-md bg-[#2262C6] text-center text-sm font-medium text-white"
            onClick={() => setExpanded1(!expanded1)}
          >
            {expanded1 ? <AddIcon /> : <MinusIcon />}
          </button>
          <div className="mt-2 pl-2 text-xs font-medium text-[#636363] md:mt-2.5 md:pl-5 md:text-sm">
            What’s the difference between FTD and Deposits?
          </div>
        </div>

        <div
          className={
            "  mt-3.5 text-left  text-xs   font-medium transition duration-150 ease-in-out md:mt-4 md:text-sm" +
            (expanded1 ? " max-h-px truncate " : "")
          }
        >
          <div className="w-full rounded-[5px]  pt-3 pb-20  md:mb-10 md:rounded-[15px]">
            <div className=" pl-9 text-xs font-medium text-[#656565] md:pl-12 md:text-base ">
              ‘FTD’ = First Time Deposit. ‘Deposits’ = Total deposits
            </div>
            <div className="ml-10">
              <Image className="mt-5 md:mt-2" src="/img/table.PNG" alt="www" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportComponent;
