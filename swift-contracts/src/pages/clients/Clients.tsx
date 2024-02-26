import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

//components
import AddClientModal from "./AddClientModal";

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
  const { deleteDocument } = useFirestore("clients");
  const collectionResult = useCollection("clients");
  const {
    data: clients,
    error,
    isLoading,
  } = collectionResult as {
    data: Client[] | undefined;
  };

  console.log(clients);

  return (
    <Box as="main" p={2}>
      <Flex justify="flex-end" mb={3}>
        <Button onClick={() => setIsOpenModal(true)} colorScheme="blackAlpha">
          Add Client +
        </Button>
      </Flex>

      <Box>
        {!clients && <Text>No clients yet!</Text>}
        {clients?.length === 0 && <Text>No clients yet!</Text>}
        {clients?.map((client) => (
          <Flex
            key={client.id}
            p="20px"
            boxShadow="base"
            borderLeft="4px solid black"
            mb={3}
            align="center"
            justify="space-between"
          >
            <Heading size="md">
              {client.firstName.charAt(0).toUpperCase() +
                client.firstName.slice(1)}{" "}
              {client.lastName.charAt(0).toUpperCase() +
                client.lastName.slice(1)}
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

            <Button onClick={() => deleteDocument(client.id)} colorScheme="red">
              Delete Client
            </Button>
          </Flex>
        ))}
      </Box>
      <AddClientModal
        isOpenModal={isOpenModal}
        setIsOpenModal={() => setIsOpenModal(false)}
      />
    </Box>
  );
}
