import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "../../hooks/useFirestore";
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
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

interface ClientModalProps {
  isOpenAddModal: boolean;
  setIsOpenAddModal: () => void;
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
  isOpenAddModal,
  setIsOpenAddModal,
}: ClientModalProps) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { addDocument } = useFirestore("clients");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormFields>();

  const customToast = useCustomToast();

  const isSmallScreen = useBreakpointValue({
    base: true,
    md: false,
  });

  const closeModal = () => {
    reset();
    setIsOpenAddModal();
  };

  const onSubmit = async (data: ClientFormFields) => {
    setIsPending(true);

    const client = {
      firstName:
        data.clientFirstName.charAt(0).toUpperCase() +
        data.clientFirstName.slice(1).toLowerCase(),
      lastName:
        data.clientLastName.charAt(0).toUpperCase() +
        data.clientLastName.slice(1).toLowerCase(),
      idNumber: data.clientIdNumber,
      address:
        data.clientAddress.charAt(0).toUpperCase() +
        data.clientAddress.slice(1).toLowerCase(),
      email: data.clientEmail,
      contactNumber: data.clientContactNumber,
    };

    try {
      await addDocument(client);
      reset();
      closeModal();
      setIsPending(false);
      customToast({
        title: "Client added.",
        description: "Successfully added client.",
        status: "success",
      });
      console.log("Client added successfully.");
    } catch (error) {
      console.error("Error adding client:", error);
      setIsPending(false);
      customToast({
        title: "Error adding client.",
        description: `There was an error, ${error}`,
        status: "error",
      });
    }
  };
  return (
    <Modal isOpen={isOpenAddModal} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent w={isSmallScreen ? "90%" : "30%"}>
        <ModalHeader>New Client</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={2}>
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
            <FormControl mb={2}>
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
            <FormControl mb={2}>
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

            <FormControl mb={2}>
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
            <FormControl mb={2}>
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
            <FormControl mb={2}>
              <FormLabel>Contact number</FormLabel>
              <Input
                {...register("clientContactNumber", {
                  required: "Contact number is required.",
                  pattern: {
                    value: /^[0-9]+$/, // Only allow numbers
                    message: "Invalid contact number.",
                  },
                })}
                type="text"
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
