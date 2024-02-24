import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

//components
import AddContractModal from "./AddContractModal";

interface Contract {
  assignedClientList: [];
  createdAt: string;
  details: string;
  duration: string;
  id: string;
  name: string;
  startDate: string;
}

export default function Dashboard() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const collectionResult = useCollection("contracts");
  const {
    data: contracts,
    error,
    isLoading,
  } = collectionResult as {
    data: Contract[] | undefined;
  };

  return (
    <Box as="main" p={2}>
      <Flex justify="flex-end">
        <Button onClick={() => setIsOpenModal(true)} colorScheme="blackAlpha">
          Add Contract +
        </Button>
      </Flex>

      {contracts?.map((contract) => (
        <Text key={contract.id}>{contract.name}</Text>
      ))}

      <AddContractModal
        isOpenModal={isOpenModal}
        setIsOpenModal={() => setIsOpenModal(false)}
      />
    </Box>
  );
}
