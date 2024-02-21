import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Text,
} from "@chakra-ui/react";

export default function Dashboard() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  return (
    <Box as="main" p={2}>
      <Flex justify="flex-end">
        <Button onClick={() => setIsOpenModal(true)} colorScheme="blackAlpha">
          Add Contract +
        </Button>
      </Flex>

      <Box>LISTA SVIH UGOVORA</Box>

      <Modal isOpen={isOpenModal} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Contract</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <Input
                  {...register("contractName", {
                    required: {
                      value: true,
                      message: "Contract name is required.",
                    },
                  })}
                  placeholder="Contract name"
                  type="text"
                />
              </FormControl>
              <FormControl>
                <Select placeholder="Select clients..." />
              </FormControl>
              <FormControl>
                <Controller
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  )}
                  name="contractDate"
                  control={control}
                  rules={{ required: "Contract date is required." }}
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
