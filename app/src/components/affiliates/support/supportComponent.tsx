import Affiliates from "../../../layouts/AffiliatesLayout";
import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import { Stack, Button, HStack, useToast } from "@chakra-ui/react";
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
import type { affiliates_profilesModelType } from "../../../server/db-types";

interface Data {
  propsdata: object;
}

const columnHelper = createColumnHelper<AffiliateProfileType>();

const schema = z.object({
  name: z.string().describe("Profile Name"),
  url: z.string().url().describe("URL"),
  description: z.string().optional().describe("Description"),
  source_traffic: z.string().optional().describe("Traffic Source"),
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

  if (!data) {
    return null;
  }

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
    columnHelper.accessor(" ", {
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
        return info.getValue() ? <CheckIcon /> : null;
      },
      header: "Available",
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
              title: "Edit profile",
              actionName: "Save",
              actions: (
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  colorScheme="red"
                  leftIcon={<DeleteIcon />}
                  isLoading={deleteProfile.isLoading}
                >
                  Delete
                </Button>
              ),
            }
          : {
              title: "Add profile",
              actionName: "Add",
            }
      }
      defaultValues={editRec ? editRec : { valid: 1 }}
      props={addProps}
    />
  );
  return (
    <div className="h-auto px-2 mt-2 md:px-7 md:py-2 pt-3 bg-[#F9FBFF] rounded-lg  flex flex-col justify-between transition-all duration-500 cursor-pointer">
      <div className="text-base md:text-xl font-medium  ">
        <div className="flex">
          <button
            className="mt-2 w-7 h-7 rounded-md bg-[#2262C6] text-center text-white font-medium text-sm"
            onClick={() => setExpanded1(!expanded1)}
          >
            {expanded1 ? <AddIcon /> : <MinusIcon />}
          </button>
          {/* {props.propsdata.title}wwww */}
          <div className="font-medium mt-2 pl-2 md:mt-2.5 md:pl-5 text-xs md:text-sm text-[#636363]">
            What’s the difference between FTD and Deposits?
          </div>
        </div>

        <div
          className={
            "  text-left text-xs p-3 md:text-sm  md:pr-56  mt-3.5 md:mt-4 font-medium  transition duration-150 ease-in-out" +
            (expanded1 ? " max-h-px truncate " : "")
          }
        >
          <Stack m={12} gap={4}>
            <DataTable data={data} columns={columns} />
            <HStack justifyContent="end" px={6}>
              <ModalFormButton actionName="Add" icon={<AddIcon />}>
                {modal}
              </ModalFormButton>
            </HStack>
            <ModalFormAction
              isOpen={!!editRec}
              onClose={() => setEditRec(null)}
            >
              {modal}
            </ModalFormAction>
          </Stack>
        </div>
      </div>
      {/* <div className="flex mt-5 md:mt-6">
                <button
                    className="bg-[#2262C6] text-left text-white font-medium text-sm"
                    onClick={() => setExpanded1(!expanded1)}
                >
                    {expanded1 ? <AddIcon /> : <MinusIcon />}
                </button>
            </div> */}
    </div>
  );
};

export default SupportComponent;
