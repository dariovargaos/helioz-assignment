import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Link,
  SimpleGrid,
  Text,
  Heading,
  Divider,
} from "@chakra-ui/react";

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
        <Button
          onClick={() => setIsOpenModal(true)}
          colorScheme="blackAlpha"
          mb={3}
        >
          Add Contract +
        </Button>
      </Flex>

      <Box>
        {contracts?.length === 0 && <Text>No contracts yet!</Text>}
        <SimpleGrid spacing={8} minChildWidth="250px">
          {contracts?.map((contract) => (
            <Link
              as={RouterLink}
              key={contract.id}
              to={`/contracts/${contract.id}`}
              boxShadow="base"
              _hover={{ textDecoration: "none" }}
            >
              <Card wordBreak="break-word">
                <CardHeader>
                  <Heading size="md">{contract.name}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    Date created: {contract.createdAt.toDate().toDateString()}
                  </Text>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Text>{contract.details.substring(0, 100)}...</Text>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </Box>

      <AddContractModal
        isOpenModal={isOpenModal}
        setIsOpenModal={() => setIsOpenModal(false)}
      />
    </Box>
  );
}
