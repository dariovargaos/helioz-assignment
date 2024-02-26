import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import {
  Box,
  Button,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

//components
import Navbar from "../../components/Navbar";

export default function Home() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <Box>
      <Navbar />

      <Flex flexDir="column" h="100vh" p={2} gap={4}>
        <Heading as="h1" size="4xl" textAlign="center">
          Welcome to Swift Contracts
        </Heading>

        <Flex
          as="section"
          flexDir="column"
          h="100vh"
          justify="space-evenly"
          align="center"
        >
          <Heading as="h3" size="lg" textAlign="center">
            Streamline Your Business Contracts with Ease
          </Heading>

          <Text>
            At Swift Contract, we understand the complexities and challenges of
            managing business contracts. Whether you're sealing a new deal,
            organizing existing contracts, or maintaining client relationships,
            our platform is designed to simplify the process, making it seamless
            and efficient.
          </Text>

          <Heading as="h3" size="md" textAlign="center">
            Why Choose Swift Contract?
          </Heading>

          <UnorderedList>
            <ListItem>
              <b>Centralized Management:</b> Keep all your contracts and client
              information in one accessible place. Say goodbye to scattered
              documents and welcome a unified view of your business dealings.
            </ListItem>
            <ListItem>
              <b>Ease of Use:</b> Our intuitive interface ensures you spend less
              time on paperwork and more time growing your business. Creating,
              editing, and managing contracts is just a few clicks away.
            </ListItem>
            <ListItem>
              <b>Secure and Reliable:</b> With top-tier security measures in
              place, your contracts are stored safely, giving you peace of mind.
              Access them anytime, anywhere, securely.
            </ListItem>
            <ListItem>
              <b>Improved Client Relationships:</b> Keep track of client
              details, contract statuses, and important dates. Swift Contract
              helps you maintain and enhance your business relationships with
              minimal effort.
            </ListItem>
          </UnorderedList>

          <Text>
            Swift Contract is more than just a contract management tool; it's
            your partner in business growth. Ready to take control of your
            contracts and client management? Dive in and discover how Swift
            Contract can transform your business operations today.
          </Text>

          <Button
            onClick={
              !user ? () => navigate("/login") : () => navigate("/contracts")
            }
            colorScheme="blackAlpha"
          >
            Start Managing Your Contracts
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
