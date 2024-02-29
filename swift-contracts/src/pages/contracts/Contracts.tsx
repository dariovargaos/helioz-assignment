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
  Input,
  FormLabel,
  Progress,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

//components
import AddContractModal from "./AddContractModal";

//icons
import {
  AddIcon,
  Search2Icon,
  SmallAddIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";

interface Contract {
  assignedClientList: Array<{ id: string; name: string }>;
  createdAt: {
    toDate: () => Date;
  };
  details: string;
  duration: string;
  id: string;
  name: string;
  startDate: string;
}

export default function Contracts() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const collectionResult = useCollection("contracts");
  const {
    data: contracts,
    error,
    isLoading,
  } = collectionResult as {
    data: Contract[] | undefined;
    isLoading: boolean;
    error: Error;
  };

  console.log(contracts);

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDate("");
  };

  const filteredContracts = contracts
    ?.filter((contract) => {
      const searchByName = contract.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      let searchByCreatedAt = true;
      if (selectedDate) {
        const contractCreatedAt = contract.createdAt
          .toDate()
          .toISOString()
          .split("T")[0];
        searchByCreatedAt = contractCreatedAt === selectedDate;
      }

      return searchByName && searchByCreatedAt;
    })
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const isSmallScreen = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <Box as="main" p={2}>
      <Flex w="100%" mb={3} justify="space-between">
        {isSmallScreen ? (
          <Flex w="100%" gap={5} flexDir="column">
            <Flex w="80%" gap={2} flexDir="column">
              <Flex>
                <FormLabel>Date created:</FormLabel>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </Flex>

              <InputGroup>
                <InputLeftElement>
                  <Search2Icon />
                </InputLeftElement>
                <Input
                  placeholder="Search contracts by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </Flex>

            <Button
              onClick={toggleSortDirection}
              colorScheme="blackAlpha"
              variant="ghost"
              w="50%"
            >
              Sort {sortDirection === "asc" ? "Z-A" : "A-Z"}
            </Button>

            <Button onClick={resetFilters} colorScheme="blackAlpha" w="50%">
              Reset filters
            </Button>
          </Flex>
        ) : (
          <Flex w="100%" gap={5}>
            <Flex w="50%" gap={2}>
              <FormLabel>Date created:</FormLabel>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                focusBorderColor="black"
              />

              <InputGroup>
                <InputLeftElement>
                  <Search2Icon />
                </InputLeftElement>
                <Input
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </Flex>

            <Button
              onClick={toggleSortDirection}
              colorScheme="blackAlpha"
              variant="ghost"
            >
              Sort {sortDirection === "asc" ? "Z-A" : "A-Z"}
            </Button>

            <Button onClick={resetFilters} colorScheme="blackAlpha">
              Reset filters
            </Button>
          </Flex>
        )}

        <Button
          onClick={() => setIsOpenModal(true)}
          colorScheme="blackAlpha"
          rightIcon={<AddIcon />}
        >
          Add Contract
        </Button>
      </Flex>

      <Box>
        {isLoading && <Progress isIndeterminate colorScheme="blackAlpha" />}
        {error && <Text>There was an error getting data.</Text>}
        {contracts?.length === 0 && <Text>No contracts yet!</Text>}
        {filteredContracts?.length === 0 && searchQuery && (
          <Text>No contracts found matching "{searchQuery}".</Text>
        )}
        {filteredContracts?.length === 0 && selectedDate && !searchQuery && (
          <Text>
            No contracts found matching "
            {new Date(selectedDate).toLocaleDateString("en-GB")}" date.
          </Text>
        )}
        <SimpleGrid spacing={8} minChildWidth="250px">
          {filteredContracts?.map((contract) => (
            <Link
              as={RouterLink}
              key={contract.id}
              to={`/contracts/${contract.id}`}
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
