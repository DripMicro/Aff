import { createTsForm } from "../../libs/react-ts-form";
import { mapping } from "./mapping";
import type { FormEvent } from "react";
import React, { useContext } from "react";
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import type { GridProps } from "@chakra-ui/react";
import { FormLayout } from "./FormLayout";
import { useSubmitAction } from "./useSubmitAction";
import { ModalFormActionContext } from "../modal/ModalFormActionContext";
import { useFormContext } from "react-hook-form";
import { DeleteIcon } from "@chakra-ui/icons";

interface CommonFormProps {
  // onClose: () => void;
  actionName: string;
  title: string;
  onSubmit: (values: unknown) => Promise<void>;
  children: React.ReactNode;
  actions?: React.ReactNode;

  grid?: GridProps;
}

const CommonForm = ({
  actionName,
  title,
  onSubmit,
  children,
  grid,
  actions,
}: CommonFormProps) => {
  const onClose = useContext(ModalFormActionContext);
  const { reset } = useFormContext();
  const { handleSubmit, isLoading } = useSubmitAction({
    onSubmit: async (values: unknown) => {
      await onSubmit(values);
      onClose();
      reset();
    },
  });

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        void handleSubmit(e);
      }}
      noValidate
    >
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLayout grid={grid}>{children}</FormLayout>
        </ModalBody>

        <ModalFooter gap={4} justifyContent={actions ? "space-between" : "end"}>
          {actions}
          <Button type="submit" colorScheme="blue" mr={3} isLoading={isLoading}>
            {actionName}
          </Button>
        </ModalFooter>
      </ModalContent>
    </form>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ModalForm = createTsForm(mapping, {
  FormComponent: CommonForm,
});
