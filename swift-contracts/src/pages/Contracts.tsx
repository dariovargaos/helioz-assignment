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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Text,
} from "@chakra-ui/react";

export default function Dashboard() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    reset();
    setIsOpenModal(false);

    setValue("contractDurationNumber", 1);
    setValue("contractDurationInUnit", null);
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    reset();
    setValue("contractDurationNumber", 1);
    setValue("contractDurationInUnit", null);
    closeModal();
  };
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Contract name</FormLabel>
                <Input
                  {...register("contractName", {
                    required: {
                      value: true,
                      message: "Contract name is required.",
                    },
                  })}
                  type="text"
                />
                {errors.contractName?.message && (
                  <Text color="red">{errors.contractName.message}</Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Select clients</FormLabel>
                <Select />
              </FormControl>
              <FormControl>
                <FormLabel>Contract start date</FormLabel>
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

              <FormLabel>Contract duration</FormLabel>
              <Flex gap={2}>
                <FormControl>
                  <Controller
                    name="contractDurationNumber"
                    control={control}
                    defaultValue={1}
                    render={({ field }) => (
                      <NumberInput {...field} min={1} max={100}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                  />
                </FormControl>

                <FormControl>
                  <Controller
                    name="contractDurationInUnit"
                    control={control}
                    rules={{ required: "Please select days, months or years." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          { value: "days", label: "Days" },
                          { value: "months", label: "Months" },
                          { value: "years", label: "Years" },
                        ]}
                      />
                    )}
                  />
                  {errors.contractDurationInUnit?.message && (
                    <Text color="red">
                      {errors.contractDurationInUnit.message}
                    </Text>
                  )}
                </FormControl>
              </Flex>

              <FormControl>
                <FormLabel>Contract information</FormLabel>
                <Textarea
                  {...register("contractInformation", {
                    required: {
                      value: true,
                      message: "Please enter contract details.",
                    },
                  })}
                  rows={5}
                />
                {errors.contractInformation?.message && (
                  <Text color="red">{errors.contractInformation.message}</Text>
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
