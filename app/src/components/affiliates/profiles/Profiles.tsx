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
import { api } from "../../../utils/api";
import type { AffiliateProfileType } from "../../../server/db-types";
import { createColumnHelper } from "@tanstack/react-table";
import * as z from "zod";
import { ModalForm } from "../../common/forms/ModalForm";
import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import React, { useState } from "react";
import {
  ModalFormAction,
  ModalFormButton,
} from "../../common/modal/ModalFormButton";
import type { affiliates_profilesModelType } from "../../../server/db-types";
import Affiliates from "../../../layouts/AffiliatesLayout";
import { CustomizeDataTable } from "../../common/data-table/Customize_DataTable";

const columnHelper = createColumnHelper<AffiliateProfileType>();

export const schema = z.object({
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

export const Profiles = () => {
  const { data, refetch } = api.affiliates.getProfiles.useQuery();
  const upsertProfile = api.affiliates.upsertProfile.useMutation();
  const deleteProfile = api.affiliates.deleteProfile.useMutation();
  const [editRec, setEditRec] = useState<RecType | null>(null);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();

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
          <div className="flex justify-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
            >
              <path
                d="M0.951172 5.85409L4.28451 8.97909L10.9512 0.645752"
                stroke="#50B8B6"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        ) : (
          <div className="flex justify-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
            >
              <path
                d="M1.52576 8L4 5.52576L6.47424 8L8 6.47424L5.52576 4L8 1.52576L6.47424 0L4 2.47424L1.52576 0L0 1.52576L2.47424 4L0 6.47424L1.52576 8Z"
                fill="#FE6969"
              />
            </svg>
          </div>
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
            px={2}
            height={8}
          >
            Edit
          </Button>
        );
      },
      header: "Action",
    }),
  ];

  return (
    <div className="pt-3.5">
      <div className="block text-base font-medium md:justify-between lg:flex">
        <div className="mb-2.5 flex items-center md:mb-5 lg:mb-5 ">
          <span className="text-[#2262C6]">Affliate Program</span>
          &nbsp;-&nbsp;Profiles
        </div>
      </div>

      <div className="rounded-[5px] bg-white pt-3 pl-3 pb-10 shadow-md md:mb-10 md:rounded-[15px]">
        <CustomizeDataTable
          data={data}
          columns={columns}
          editRec={-11}
          state={false}
        />
        <HStack justifyContent="end" px={6} pt={6}>
          <button
            onClick={onOpen}
            className="flex justify-center rounded-md bg-[#1B48BB] px-8 py-2 text-base font-medium text-white"
          >
            <div className="mr-2 inline-flex h-6 items-center justify-center text-white">
              <AddIcon />
            </div>
            Add
          </button>
        </HStack>
      </div>
      <Modal isOpen={isOpen} size="3xl" onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent ml={4} mr={4}>
          <div className="flex items-end justify-between pl-6 pt-4 md:pl-8  ">
            <div className="text-xl font-medium text-[#282560]">
              Add Profile
            </div>
            <Image
              alt="..."
              className="mr-4 h-10 w-10 rounded-full align-middle "
              src="/img/icons/close.png"
              onClick={onClose}
            />
          </div>

          <ModalBody>
            <div className="mt-6 px-0 md:px-2">
              <SimpleGrid minChildWidth="100px" spacing="35px">
                <div className="md:flex">
                  <div className="flex-1 p-2">
                    <label className="mb-1.5 ml-2.5 block text-sm font-medium text-[#525252]">
                      Profile Name
                    </label>
                    <input
                      className="text-blueGray-700 w-full rounded border bg-white px-4 py-3 text-xs placeholder-[#666666] shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      id="profile"
                      type="text"
                      placeholder="Type Here..."
                    />
                  </div>

                  <div className="flex-1 p-2">
                    <label className="mb-1.5 ml-2.5 block text-sm font-medium text-[#525252]">
                      URL
                    </label>
                    <input
                      className="text-blueGray-700 w-full rounded border bg-white px-4 py-3 text-xs placeholder-[#666666] shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      id="url"
                      type="text"
                      placeholder="https://"
                    />
                  </div>
                </div>
              </SimpleGrid>
              <SimpleGrid minChildWidth="100px" spacing="35px">
                <div className="md:flex">
                  <div className="flex-1 p-2">
                    <label className="mb-1.5 ml-2.5 block text-sm font-medium text-[#525252]">
                      Description
                    </label>
                    <input
                      className="text-blueGray-700 w-full rounded border bg-white px-4 py-3 text-xs placeholder-[#666666] shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      id="description"
                      type="text"
                      placeholder="Type Here..."
                    />
                  </div>

                  <div className="flex-1 p-2">
                    <label className="mb-1.5 ml-2.5 block text-sm font-medium text-[#525252]">
                      Traffic Source
                    </label>
                    <input
                      className="text-blueGray-700 w-full rounded border bg-white px-4 py-3 text-xs placeholder-[#666666] shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      id="traffic"
                      type="text"
                      placeholder="Type Here...."
                    />
                  </div>
                </div>
              </SimpleGrid>
            </div>
          </ModalBody>

          <div className=" self-center py-6 font-medium md:py-10">
            <button
              className="mb-4 w-44 rounded-md bg-[#1B48BB] px-6 py-3 text-white md:mx-40 md:w-96 md:px-14 "
              onClick={onClose}
            >
              Save
            </button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

Profiles.getLayout = Affiliates;
