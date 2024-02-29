import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { Box, Button, Flex, Progress, Text } from "@chakra-ui/react";

//icons
import { AddIcon } from "@chakra-ui/icons";

//components
import AddClientModal from "./AddClientModal";
import ClientsList from "./ClientsList";

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

  return (
    <Box as="main" p={2}>
      <Flex justify="flex-end" mb={3}>
        <Button
          onClick={() => setIsOpenAddModal(true)}
          colorScheme="blackAlpha"
          rightIcon={<AddIcon />}
        >
          Add Client
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

        <ClientsList clients={clients} />
      </Box>

      <AddClientModal
        isOpenAddModal={isOpenAddModal}
        setIsOpenAddModal={() => setIsOpenAddModal(false)}
      />
    </Box>
  );
}
