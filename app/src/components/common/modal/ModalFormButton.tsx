import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";

import { ModalFormActionContext } from "./ModalFormActionContext";

interface ModalFormActionProps {
  children: React.ReactNode;

  isOpen: boolean;
  onClose: () => void;
}

export const ModalFormAction = ({
  isOpen,
  onClose,
  children,
}: ModalFormActionProps) => {
  return (
    <ModalFormActionContext.Provider value={onClose}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {children}
      </Modal>
    </ModalFormActionContext.Provider>
  );
};

interface ModalFormButtonProps {
  actionName: string;
  icon?: React.ReactElement;
  children: React.ReactNode;
}

export const ModalFormButton = ({
  actionName,
  icon,
  children,
}: ModalFormButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} size="lg" leftIcon={icon}>
        {actionName}
      </Button>

      <ModalFormAction onClose={onClose} isOpen={isOpen}>
        {children}
      </ModalFormAction>
    </>
  );
};
