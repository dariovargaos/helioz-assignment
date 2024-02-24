import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "../../hooks/useFirestore";
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
  Text,
} from "@chakra-ui/react";

interface ClientModalProps {
  isOpenModal: boolean;
  setIsOpenModal: () => void;
}

interface ClientFormFields {
  clientFirstName: string;
  clientLastName: string;
  clientIdNumber: string;
  clientAddress: string;
  clientEmail: string;
  clientContactNumber: string;
}

export default function AddClientModal({
  isOpenModal,
  setIsOpenModal,
}: ClientModalProps) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { addDocument } = useFirestore("clients");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormFields>();

  const closeModal = () => {
    reset();
    setIsOpenModal();
  };

  const onSubmit = async (data: ClientFormFields) => {
    setIsPending(true);

    try {
      await addDocument(data);
      console.log("Client added successfully.");
    } catch (error) {
      console.error("Error adding client:", error);
    }

    setIsPending(false);
    reset();
    closeModal();
  };
  return (
    <Modal isOpen={isOpenModal} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Client</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                {...register("clientFirstName", {
                  required: "First name is required.",
                })}
                type="text"
              />
              {errors.clientFirstName?.message && (
                <Text color="red">{errors.clientFirstName.message}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                {...register("clientLastName", {
                  required: "Last name is required.",
                })}
                type="text"
              />
              {errors.clientLastName?.message && (
                <Text color="red">{errors.clientLastName.message}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>ID Number</FormLabel>
              <Input
                {...register("clientIdNumber", {
                  required: "ID is required.",
                  maxLength: {
                    value: 11,
                    message: "ID number cannot exceed 11 characters",
                  },
                  pattern: {
                    value: /^[0-9]+$/, // Only allow numbers
                    message: "Invalid ID number",
                  },
                })}
                type="text"
              />
              {errors.clientIdNumber?.message && (
                <Text color="red">{errors.clientIdNumber.message}</Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("clientAddress", {
                  required: "Address is required.",
                })}
                type="text"
              />
              {errors.clientAddress?.message && (
                <Text color="red">{errors.clientAddress.message}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("clientEmail", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
              />
              {errors.clientEmail?.message && (
                <Text color="red">{errors.clientEmail.message}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Contact number</FormLabel>
              <Input
                {...register("clientContactNumber", {
                  required: "Contact number is required.",
                })}
                type="number"
              />
              {errors.clientContactNumber?.message && (
                <Text color="red">{errors.clientContactNumber.message}</Text>
              )}
            </FormControl>
            {!isPending ? (
              <Button type="submit" colorScheme="blackAlpha">
                Submit
              </Button>
            ) : (
              <Button isLoading colorScheme="blackAlpha"></Button>
            )}
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
