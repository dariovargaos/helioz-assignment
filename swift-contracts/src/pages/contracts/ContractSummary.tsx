import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useFirestore } from "../../hooks/useFirestore";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Progress,
  Text,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";

//icons
import { ArrowBackIcon } from "@chakra-ui/icons";

//components
import EditContractModal from "./EditContractModal";

interface Contract {
  assignedClientsList: Array<{ id: string; name: string }>;
  createdAt: {
    toDate: () => Date;
  };
  details: string;
  duration: string;
  id: string;
  name: string;
  startDate: {
    toDate: () => Date;
  };
}

export default function ContractSummary() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const {
    data: contract,
    error,
    isLoading,
  } = useDocument<Contract>("contracts", id!);
  const { deleteDocument } = useFirestore("contracts");
  const navigate = useNavigate();

  const toast = useToast();

  const isSmallScreen = useBreakpointValue({
    base: true,
    md: false,
  });

  const handleDelete = () => {
    if (contract?.id) {
      deleteDocument(contract?.id);
      navigate("/contracts");
      toast({
        title: "Contract deleted.",
        description: "Successfully deleted contract.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex w="100%" justify="center" p={3}>
      <Flex
        bg="gray.50"
        boxShadow="base"
        w={isSmallScreen ? "100%" : "80%"}
        p={2}
        flexDir="column"
        gap={5}
      >
        <Flex justify="space-between">
          <Button
            onClick={() => navigate("/contracts")}
            leftIcon={<ArrowBackIcon />}
            colorScheme="blackAlpha"
          >
            Back
          </Button>

          <Flex gap={3} flexDir={isSmallScreen ? "column" : "row"}>
            <Button onClick={() => setIsOpenModal(true)} colorScheme="whatsapp">
              Edit contract
            </Button>
            <Button onClick={handleDelete} colorScheme="red">
              Delete contract
            </Button>
          </Flex>
        </Flex>

        {isLoading && <Progress isIndeterminate colorScheme="blackAlpha" />}
        {error && (
          <Text color="red">
            There was an error getting contract information. Please try again.
          </Text>
        )}

        <Heading size="lg">Contract information</Heading>

        <Flex flexDir="column">
          <Text fontWeight="bold">Contract number</Text>
          <Text color="gray.500">{contract?.id}</Text>
        </Flex>

        <Flex flexDir="column">
          <Text fontWeight="bold">Name</Text>
          <Text color="gray.500">{contract?.name}</Text>
        </Flex>

        <Flex flexDir="column">
          <Text fontWeight="bold">Date created</Text>
          <Text color="gray.500">
            {contract?.createdAt.toDate().toDateString()}
          </Text>
        </Flex>

        <Flex flexDir="column">
          <Text fontWeight="bold">Start date</Text>
          <Text color="gray.500">
            {contract?.startDate.toDate().toDateString()}
          </Text>
        </Flex>

        <Flex flexDir="column">
          <Text fontWeight="bold">Duration</Text>
          <Text color="gray.500">{contract?.duration}</Text>
        </Flex>

        <Flex flexDir="column" gap={1}>
          <Text fontWeight="bold">Assigned clients: </Text>
          {contract?.assignedClientsList.map((client) => (
            <Text key={client.id} color="gray.500">
              {client.name}
            </Text>
          ))}
        </Flex>

        <Divider />

        <Flex flexDir="column">
          <Text fontWeight="bold">Contract details</Text>
          <Text color="gray.500">{contract?.details}</Text>
        </Flex>
      </Flex>

      <EditContractModal
        isOpenModal={isOpenModal}
        setIsOpenModal={() => setIsOpenModal(false)}
        contract={contract}
      />
    </Flex>
  );
}
