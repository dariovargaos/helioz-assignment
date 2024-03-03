import { useState } from "react";
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

//components
import EditClientModal from "./EditClientModal";
import DeleteClientModal from "./DeleteClientModal";

//icons
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

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
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

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
                <IconButton
                  onClick={() => {
                    setSelectedClient(client);
                    setIsOpenEditModal(true);
                  }}
                  aria-label="Edit client"
                  title="Edit"
                  colorScheme="whatsapp"
                  icon={<EditIcon />}
                />

                <IconButton
                  onClick={() => {
                    setSelectedClient(client);
                    setIsOpenDeleteModal(true);
                  }}
                  aria-label="Delete client"
                  title="Delete"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                />
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
                  <IconButton
                    onClick={() => {
                      setSelectedClient(client);
                      setIsOpenEditModal(true);
                    }}
                    aria-label="Edit client"
                    title="Edit"
                    colorScheme="whatsapp"
                    variant="ghost"
                    icon={<EditIcon />}
                  />

                  <IconButton
                    onClick={() => {
                      setSelectedClient(client);
                      setIsOpenDeleteModal(true);
                    }}
                    aria-label="Delete client"
                    title="Delete"
                    colorScheme="red"
                    variant="ghost"
                    icon={<DeleteIcon />}
                  />
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

      <DeleteClientModal
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={() => setIsOpenDeleteModal(false)}
        client={selectedClient}
      />
    </>
  );
}
