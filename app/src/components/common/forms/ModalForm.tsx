import { createTsForm } from "../../libs/react-ts-form";
import { mapping } from "./mapping";
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
import { useSubmitAction } from "./useSubmitAction";
import { ModalFormActionContext } from "../modal/ModalFormActionContext";
import { useFormContext } from "react-hook-form";
import { DeleteIcon } from "@chakra-ui/icons";
import { cn } from "@/lib/utils";

interface CommonFormProps {
  // onClose: () => void;
  actionName: string;
  title: string;
  onSubmit: (values: unknown) => Promise<void>;
  children: React.ReactNode;
  actions?: React.ReactNode;

  className?: string;
}

const CommonForm = ({
  actionName,
  title,
  onSubmit,
  children,
  actions,
  className,
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
    <form onSubmit={handleSubmit} noValidate>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className={cn("flex flex-col gap-4", className)}>{children}</div>
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
