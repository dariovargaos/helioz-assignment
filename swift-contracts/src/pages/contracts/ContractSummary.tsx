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
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function ContractSummary() {
  const { id } = useParams();
  const { data: contract, error, isLoading } = useDocument("contracts", id);
  const { deleteDocument } = useFirestore("contracts");
  const navigate = useNavigate();
  const toast = useToast();

  const handleDelete = () => {
    deleteDocument(contract?.id);
    navigate("/contracts");
    toast({
      title: "Contract deleted.",
      description: "Successfully deleted contract.",
      status: "success",
      variant: "customSuccess",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <Flex w="100%" justify="center" p={3}>
      <Flex boxShadow="base" w="80%" p={2} flexDir="column" gap={5}>
        <Flex justify="space-between">
          <Button
            onClick={() => navigate("/contracts")}
            leftIcon={<ArrowBackIcon />}
            colorScheme="blackAlpha"
          >
            Back
          </Button>

          <Button onClick={handleDelete} colorScheme="red">
            Delete contract
          </Button>
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
    </Flex>
  );
}
