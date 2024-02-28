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
  useBreakpointValue,
  useToast,
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
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
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

  const toast = useToast;

  const isSmallScreen = useBreakpointValue({
    base: true,
    md: false,
  });

  const handleEdit = (client: Client) => {
    setIsOpenEditModal(true);
    setSelectedClient(client);
  };

  const handleDelete = (id: string) => {
    deleteDocument(id);
    toast({
      title: "Client deleted.",
      description: "Successfully deleted client.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box as="main" p={2}>
      <Flex justify="flex-end" mb={3}>
        <Button
          onClick={() => setIsOpenAddModal(true)}
          colorScheme="blackAlpha"
        >
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
            templateColumns={
              isSmallScreen
                ? ""
                : "repeat(1, 1fr) minmax(120px, auto) repeat(4, 1fr)"
            }
            gap={4}
            p={2}
            boxShadow="base"
            borderLeft="4px solid black"
            mb={3}
            alignItems="center"
          >
            {isSmallScreen ? (
              <Flex w="100%" justify="space-between">
                <Flex flexDir="column">
                  <Heading size="md">
                    {client.firstName} {client.lastName}
                  </Heading>
                  <Text color="gray.500">ID: {client.idNumber}</Text>
                  <Text color="gray.500">Address: {client.address}</Text>
                  <Text color="gray.500">Email: {client.email}</Text>
                  <Text color="gray.500">Contact: {client.contactNumber}</Text>
                </Flex>

                <Flex flexDir="column">
                  <Button
                    onClick={() => handleEdit(client)}
                    size="sm"
                    colorScheme="whatsapp"
                    variant="ghost"
                  >
                    Edit Client
                  </Button>
                  <Button
                    onClick={() => handleDelete(client.id)}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                  >
                    Delete Client
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <>
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
              </>
            )}
          </Grid>
        ))}
      </Box>

      <AddClientModal
        isOpenAddModal={isOpenAddModal}
        setIsOpenAddModal={() => setIsOpenAddModal(false)}
      />

      <EditClientModal
        isOpenEditModal={isOpenEditModal}
        setIsOpenEditModal={() => setIsOpenEditModal(false)}
        client={selectedClient}
      />
    </Box>
  );
}
