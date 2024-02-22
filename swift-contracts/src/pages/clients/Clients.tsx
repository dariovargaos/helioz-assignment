import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  Box,
  Button,
  Flex,
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
export default function Dashboard() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    reset();
    setIsOpenModal(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    reset();
    closeModal();
  };
  return (
    <Box as="main" p={2}>
      <Flex justify="flex-end">
        <Button onClick={() => setIsOpenModal(true)} colorScheme="blackAlpha">
          Add Client +
        </Button>
      </Flex>

      <Box>LISTA SVIH KLIJENATA</Box>

      <Modal isOpen={isOpenModal} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Client</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("clientName", {
                    required: {
                      value: true,
                      message: "Name is required.",
                    },
                  })}
                  type="text"
                />
                {errors.clientName?.message && (
                  <Text color="red">{errors.clientName.message}</Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>ID Number</FormLabel>
                <Input
                  {...register("clientIdNumber", {
                    required: {
                      value: true,
                      message: "ID is required.",
                    },
                  })}
                  type="number"
                />
                {errors.clientIdNumber?.message && (
                  <Text color="red">{errors.clientIdNumber.message}</Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  {...register("clientAddress", {
                    required: {
                      value: true,
                      message: "Address is required.",
                    },
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
                    required: {
                      value: true,
                      message: "Email is required.",
                    },
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
                    required: {
                      value: true,
                      message: "Contact number is required.",
                    },
                  })}
                  type="number"
                />
                {errors.clientContactNumber?.message && (
                  <Text color="red">{errors.clientContactNumber.message}</Text>
                )}
              </FormControl>
              <Button type="submit" colorScheme="blackAlpha">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
