import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCustomToast } from "../../hooks/useCustomToast";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

//components
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

interface ClientsListProps {
  clients: Client[] | undefined;
}

export default function ClientsList({ clients }: ClientsListProps) {
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const { deleteDocument } = useFirestore("clients");
  const customToast = useCustomToast();

  const handleEdit = (client: Client) => {
    setIsOpenEditModal(true);
    setSelectedClient(client);
  };

  const handleDelete = (id: string) => {
    try {
      deleteDocument(id);
      customToast({
        title: "Client deleted.",
        description: "Successfully deleted client.",
        status: "success",
      });
    } catch (error) {
      customToast({
        title: "Error deleting client.",
        description: "Something went wrong.",
        status: "error",
      });
    }
  };
  const isSmallScreen = useBreakpointValue({
    base: true,
    md: false,
  });
  return (
    <>
      {clients?.map((client: Client) => (
        <Grid
          key={client.id}
          templateColumns={isSmallScreen ? "" : "repeat(5, 1fr) "}
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
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteDocument(client.id)}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                  >
                    Delete
                  </Button>
                </Flex>
              </GridItem>
            </>
          )}
        </Grid>
      ))}

      <EditClientModal
        isOpenEditModal={isOpenEditModal}
        setIsOpenEditModal={() => setIsOpenEditModal(false)}
        client={selectedClient}
      />
    </>
  );
}
