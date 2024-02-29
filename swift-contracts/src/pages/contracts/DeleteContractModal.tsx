import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";
import { DocumentData } from "firebase/firestore";
import { useCustomToast } from "../../hooks/useCustomToast";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormHelperText,
} from "@chakra-ui/react";

interface DeleteContractModalProps {
  isOpenDeleteModal: boolean;
  setIsOpenDeleteModal: () => void;
  contract: DocumentData | null | undefined;
}

export default function DeleteContractModal({
  isOpenDeleteModal,
  setIsOpenDeleteModal,
  contract,
}: DeleteContractModalProps) {
  const [nameInput, setNameInput] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const { deleteDocument } = useFirestore("contracts");
  const navigate = useNavigate();
  const customToast = useCustomToast();

  //close modal and reset fields
  const closeModal = () => {
    setIsOpenDeleteModal();
    setNameInput("");
  };

  const handleDelete = () => {
    setIsPending(true);
    try {
      if (contract?.id && nameInput === contract?.name) {
        deleteDocument(contract?.id);
        setIsPending(false);
        navigate("/contracts");
        customToast({
          title: "Contract deleted.",
          description: "Successfully deleted contract.",
          status: "success",
        });
      }
    } catch (error) {
      setIsPending(false);
      customToast({
        title: "Error.",
        description: "There was an error while trying to delete contract.",
        status: "error",
      });
    }
  };
  return (
    <Modal isOpen={isOpenDeleteModal} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Are you sure you want to delete this contract?
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Contract name:</FormLabel>
            <Input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              type="text"
            />
            <FormHelperText>This action is irreversible.</FormHelperText>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {!isPending ? (
            <Button
              onClick={handleDelete}
              isDisabled={nameInput !== contract?.name}
              colorScheme="red"
            >
              Delete
            </Button>
          ) : (
            <Button isLoading colorScheme="red" />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
