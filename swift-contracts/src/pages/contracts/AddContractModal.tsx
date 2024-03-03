import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useFirestore } from "../../hooks/useFirestore";
import { timestamp } from "../../firebase/config";
import { useCollection } from "../../hooks/useCollection";
import { useCustomToast } from "../../hooks/useCustomToast";
import {
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
  useBreakpointValue,
} from "@chakra-ui/react";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface ContractModalProps {
  isOpenModal: boolean;
  setIsOpenModal: () => void;
}

interface ContractFormData {
  contractName: string;
  selectedClients: [{ value: string; label: string }] | null;
  contractDate: string;
  contractDurationNumber: number;
  contractDurationInUnit: { value: string; label: string } | null;
  contractDetails: string;
}

export default function AddContractModal({
  isOpenModal,
  setIsOpenModal,
}: ContractModalProps) {
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { addDocument } = useFirestore("contracts");
  const { data: clients } = useCollection("clients") as {
    data: Client[] | undefined;
  };

  const customToast = useCustomToast();

  const isSmallScreen = useBreakpointValue({
    base: true,
    md: false,
  });

  //get clients for select
  useEffect(() => {
    if (clients) {
      const options = clients.map((client) => {
        return {
          value: client.id,
          label: `${client.firstName} ${client.lastName}`,
        };
      });
      setSelectOptions(options);
    }
  }, [clients]);

  const closeModal = () => {
    reset();
    setIsOpenModal();

    setValue("contractDurationNumber", 1);
    setValue("contractDurationInUnit", null);
    setValue("selectedClients", null);
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm<ContractFormData>();

  const onSubmit = async (data: ContractFormData) => {
    setIsPending(true);

    if (!data.selectedClients) {
      console.log("No clients seleceted.");
      return;
    }

    const assignedClientsList = data.selectedClients.map((selectedClient) => {
      const client = clients?.find(
        (client) => client.id === selectedClient.value
      );
      return {
        name: `${client?.firstName} ${client?.lastName}`,
        id: selectedClient.value,
      };
    });

    const contract = {
      name:
        data.contractName.charAt(0).toUpperCase() + data.contractName.slice(1),
      assignedClientsList,
      startDate: timestamp.fromDate(new Date(data.contractDate)),
      duration: `${data.contractDurationNumber} ${data.contractDurationInUnit?.value}`,
      details: data.contractDetails,
    };

    try {
      await addDocument(contract);
      reset();
      setValue("contractDurationNumber", 1);
      setValue("contractDurationInUnit", null);
      setValue("selectedClients", null);
      closeModal();
      setIsPending(false);
      customToast({
        title: "Contract added.",
        description: "Successfully added contract.",
        status: "success",
      });
    } catch (error) {
      console.error("Error adding contract:", error);
      setIsPending(false);
      customToast({
        title: "Error adding contract.",
        description: `There was an error, ${error}`,
        status: "error",
      });
    }
  };
  return (
    <Modal isOpen={isOpenModal} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent w={isSmallScreen ? "90%" : ""}>
        <ModalHeader>New Contract</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={2}>
              <FormLabel>Contract name</FormLabel>
              <Input
                {...register("contractName", {
                  required: "Contract name is required.",
                })}
                type="text"
              />
              {errors.contractName?.message && (
                <Text color="red">{errors.contractName.message}</Text>
              )}
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Select clients</FormLabel>
              <Controller
                name="selectedClients"
                control={control}
                rules={{ required: "Please select at least one client." }}
                render={({ field }) => (
                  <Select {...field} options={selectOptions} isMulti />
                )}
              />
              {errors.selectedClients?.message && (
                <Text color="red">{errors.selectedClients.message}</Text>
              )}
            </FormControl>
            <FormControl mb={2}>
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
              <FormControl mb={2}>
                <Controller
                  name="contractDurationNumber"
                  control={control}
                  rules={{
                    required: "Number is required.",
                  }}
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
                  rules={{
                    required: "Select day(s), month(s) or year(s).",
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: "day(s)", label: "Day(s)" },
                        { value: "month(s)", label: "Month(s)" },
                        { value: "year(s)", label: "Year(s)" },
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

            <FormControl mb={2}>
              <FormLabel>Contract details</FormLabel>
              <Textarea
                {...register("contractDetails", {
                  required: "Enter contract details.",
                })}
                rows={5}
              />
              {errors.contractDetails?.message && (
                <Text color="red">{errors.contractDetails.message}</Text>
              )}
            </FormControl>
            {!isPending ? (
              <Button type="submit" colorScheme="blackAlpha">
                Submit
              </Button>
            ) : (
              <Button isLoading colorScheme="blackAlpha" />
            )}
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
