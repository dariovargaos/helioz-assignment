import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Progress,
  Text,
} from "@chakra-ui/react";

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
          <Grid
            key={client.id}
            templateColumns="repeat(1, 1fr) minmax(120px, auto) repeat(4, 1fr)"
            gap={4}
            p={2}
            boxShadow="base"
            borderLeft="4px solid black"
            mb={3}
            alignItems="center"
          >
            <GridItem>
              <Heading size="md">
                {client.firstName} {client.lastName}
              </Heading>
            </GridItem>
            <GridItem>
              <Text color="gray.500">ID: {client.idNumber}</Text>
            </GridItem>
            <GridItem>
              <Text color="gray.500">Address: {client.address}</Text>
            </GridItem>
            <GridItem>
              <Text color="gray.500">Email: {client.email}</Text>
            </GridItem>
            <GridItem>
              <Text color="gray.500">Contact: {client.contactNumber}</Text>
            </GridItem>

            <GridItem>
              <Flex gap={2}>
                <Button
                  onClick={() => handleEdit(client)}
                  size="sm"
                  colorScheme="whatsapp"
                  variant="ghost"
                >
                  Edit Client
                </Button>
                <Button
                  onClick={() => deleteDocument(client.id)}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                >
                  Delete Client
                </Button>
              </Flex>
            </GridItem>
          </Grid>
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
