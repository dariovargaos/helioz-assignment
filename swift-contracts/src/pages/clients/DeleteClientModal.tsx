import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCustomToast } from "../../hooks/useCustomToast";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  address: string;
  email: string;
  contactNumber: string;
}

interface DeleteContractModalProps {
  isOpenDeleteModal: boolean;
  setIsOpenDeleteModal: () => void;
  client: Client | null;
}

export default function DeleteClientModal({
  isOpenDeleteModal,
  setIsOpenDeleteModal,
  client,
}: DeleteContractModalProps) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { deleteDocument } = useFirestore("clients");
  const customToast = useCustomToast();

  const handleDelete = (id: string) => {
    setIsPending(true);
    try {
      deleteDocument(id);
      setIsPending(false);
      setIsOpenDeleteModal();
      customToast({
        title: "Client deleted.",
        description: "Successfully deleted client.",
        status: "success",
      });
    } catch (error) {
      setIsPending(false);
      setIsOpenDeleteModal();
      customToast({
        title: "Error deleting client.",
        description: "Something went wrong.",
        status: "error",
      });
    }
  };
  return (
    <Modal
      isOpen={isOpenDeleteModal}
      onClose={() => setIsOpenDeleteModal()}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure you want to delete this client?</ModalHeader>
        <ModalBody>
          <Text>
            {client?.firstName} {client?.lastName}
          </Text>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing={2}>
            <Button onClick={() => setIsOpenDeleteModal()}>Cancel</Button>

            {!isPending && client?.id ? (
              <Button
                onClick={() => handleDelete(client?.id)}
                colorScheme="red"
              >
                Delete
              </Button>
            ) : (
              <Button isLoading colorScheme="red" />
            )}
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
