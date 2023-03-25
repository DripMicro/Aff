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
} from "@chakra-ui/react";
import { DataTable } from "../../common/data-table/DataTable";
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

export const Profiles = () => {
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
            actionName: "Save",
          }
    }
    defaultValues={editRec ? editRec : { valid: 1 }}
    props={addProps}
  />

  );

  return (
    <div className="pt-5 pb-4 ">
      <div className="px-6 mb-5 block font-medium text-base">
        <span className="text-[#2262C6]">Dashboard</span> - Attributions
      </div>

      <div className="pt-3 pl-3 rounded-[5px] md:rounded-[15px] bg-white shadow-md pb-20 md:mb-10">
        <DataTable data={data} columns={columns} editRec="-11" state={false} />
        <HStack justifyContent="end" px={6} pt={6}>
          {/* <ModalFormButton actionName="Add" icon={<AddIcon color="white" />}  >
            {modal}
          </ModalFormButton> */}
          <button onClick={onOpen} className="block ml-5 text-sm bg-[#2262C6] w-36 h-12 text-white px-8 py-2 rounded-md   justify-self-end" >
            <AddIcon width="2" mr="1" mb="0.5"  />
            Add            
            
            </button>
        </HStack>
        <ModalFormAction isOpen={!!editRec} onClose={() => setEditRec(null)} >
          {modal}
        </ModalFormAction>
      </div>
      <Modal isOpen={isOpen} size="3xl" onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent ml={4} mr={4}>
          <div className="flex pl-6 md:pl-8 pt-4 justify-between items-end  ">
            <div className="text-[#27263d] font-xl">Add Profile</div>
            <img
              alt="..."
              className="mr-4 w-10 h-10 rounded-full align-middle "
              src="/img/icons/close.png"
              onClick={onClose}
            />
          </div>

          <ModalBody>
            <div className="px-0 md:px-2">
              <SimpleGrid minChildWidth="100px" spacing="35px">
                <div className="md:flex">
                  <div className="flex-1 p-2">
                    <label className="block text-gray-600 mb-1.5 ml-2.5 text-sm  font-medium">
                      Profile Name
                    </label>
                    <input
                      className="border px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-sm"
                      id="profile"
                      type="text"
                      placeholder="Type Here..."
                    />
                  </div>

                  <div className="flex-1 p-2">
                    <label className="block text-gray-600 mb-1.5 ml-2.5 text-sm  font-medium">
                      URL
                    </label>
                    <input
                      className="border px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-sm"
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
                    <label className="block text-gray-600 mb-1.5 ml-2.5 text-sm  font-medium">
                      Description
                    </label>
                    <input
                      className="border px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-sm"
                      id="description"
                      type="text"
                      placeholder="Type Here..."
                    />
                  </div>

                  <div className="flex-1 p-2">
                    <label className="block text-gray-600 mb-1.5 ml-2.5 text-sm  font-medium">
                      Traffic Source
                    </label>
                    <input
                      className="border px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-sm"
                      id="traffic"
                      type="text"
                      placeholder="Type Here...."
                    />
                  </div>
                </div>
                </SimpleGrid>
            </div>
          </ModalBody>

          <div className=" self-center  p-6 md:p-8 md:pt-10 font-medium" >
            <button
              className="bg-[#2262C6] text-white md:mx-40 	 px-6 md:px-14 py-3 rounded-md w-44 md:w-96 mb-4 "
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
