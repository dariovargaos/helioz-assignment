import { useState, useEffect } from "react";
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

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  address: string;
  email: string;
  contactNumber: string;
}

interface ClientModalProps {
  isOpenEditModal: boolean;
  setIsOpenEditModal: () => void;
  client: Client | undefined | null;
}

interface ClientFormData {
  clientFirstName: string;
  clientLastName: string;
  clientIdNumber: string;
  clientAddress: string;
  clientEmail: string;
  clientContactNumber: string;
}

export default function EditClientModal({
  isOpenEditModal,
  setIsOpenEditModal,
  client,
}: ClientModalProps) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { updateDocument } = useFirestore("clients");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ClientFormData>();

  const customToast = useCustomToast();

  const isSmallScreen = useBreakpointValue({
    base: true,
    md: false,
  });

  //close modal and reset fields
  const closeModal = () => {
    reset();
    setIsOpenEditModal();
  };

  //setting client data from firestore as default values in edit form
  useEffect(() => {
    if (isOpenEditModal && client) {
      setValue("clientFirstName", client?.firstName);
      setValue("clientLastName", client?.lastName);
      setValue("clientIdNumber", client?.idNumber);
      setValue("clientAddress", client?.address);
      setValue("clientEmail", client?.email);
      setValue("clientContactNumber", client?.contactNumber);
    }
  }, [isOpenEditModal, setValue, client]);

  const onSubmit = async (data: ClientFormData) => {
    setIsPending(true);

    try {
      if (client?.id) {
        await updateDocument(client?.id, {
          firstName: data.clientFirstName,
          lastName: data.clientLastName,
          idNumber: data.clientIdNumber,
          address: data.clientAddress,
          email: data.clientEmail,
          contactNumber: data.clientContactNumber,
        });
        closeModal();
        setIsPending(false);
        customToast({
          title: "Client updated.",
          description: "Successfully updated the client.",
          status: "success",
        });
        console.log("Client added successfully.");
      }
    } catch (error) {
      console.error("Error adding client:", error);
      setIsPending(false);
      customToast({
        title: "Error updating the client.",
        description: `There was an error, ${error}`,
        status: "error",
      });
    }
  };
  return (
    <Modal isOpen={isOpenEditModal} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent w={isSmallScreen ? "90%" : "30%"}>
        <ModalHeader>Edit Client</ModalHeader>
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
