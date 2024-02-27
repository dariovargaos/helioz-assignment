import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { Box, Button, Flex, Heading, Progress, Text } from "@chakra-ui/react";

//components
import AddClientModal from "./AddClientModal";
import EditClientModal from "./EditClientModal";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  address: string;
  email: string;
  contactNumber: string;
}

export default function Clients() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const { deleteDocument } = useFirestore("clients");
  const collectionResult = useCollection("clients");
  const {
    data: clients,
    error,
    isLoading,
  } = collectionResult as {
    data: Client[] | undefined;
    error: Error;
    isLoading: boolean;
  };

  console.log(clients);

  const handleEdit = (client) => {
    setIsOpenModal(true);
    setSelectedClient(client);
  };

  return (
    <Box as="main" p={2}>
      <Flex justify="flex-end" mb={3}>
        <Button onClick={() => setIsOpenModal(true)} colorScheme="blackAlpha">
          Add Client +
        </Button>
      </Flex>

      <Box>
        {isLoading && <Progress isIndeterminate colorScheme="blackAlpha" />}
        {error && (
          <Text color="red">
            There was an error getting clients. Please try again.
          </Text>
        )}
        {clients?.length === 0 && <Text>No clients yet!</Text>}
        {clients?.map((client) => (
          <Flex
            key={client.id}
            p={2}
            boxShadow="base"
            borderLeft="4px solid black"
            mb={3}
            align="center"
            justify="space-between"
          >
            <Heading size="md">
              {client.firstName} {client.lastName}
            </Heading>
            <Text color="gray.500">ID: {client.idNumber}</Text>
            <Box w="20%" wordBreak="break-word">
              <Text color="gray.500">
                Address:{" "}
                {client.address.charAt(0).toUpperCase() +
                  client.address.slice(1)}
              </Text>
            </Box>
            <Box w="20%" wordBreak="break-word">
              <Text color="gray.500">Email: {client.email}</Text>
            </Box>
            <Box w="20%" wordBreak="break-word">
              <Text color="gray.500">Contact: {client.contactNumber}</Text>
            </Box>

            <Flex flexDir="column" gap={2}>
              <Button
                onClick={() => handleEdit(client)}
                size="sm"
                colorScheme="whatsapp"
              >
                Edit Client
              </Button>
              <Button
                onClick={() => deleteDocument(client.id)}
                size="sm"
                colorScheme="red"
              >
                Delete Client
              </Button>
            </Flex>
          </Flex>
        ))}
      </Box>

      <AddClientModal
        isOpenModal={isOpenModal}
        setIsOpenModal={() => setIsOpenModal(false)}
      />

      <EditClientModal
        isOpenModal={isOpenModal}
        setIsOpenModal={() => setIsOpenModal(false)}
        client={selectedClient}
      />
    </Box>
  );
}
