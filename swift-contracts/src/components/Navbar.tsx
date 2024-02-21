import { NavLink as RouterNavLink } from "react-router-dom";
import { Flex, Heading, Link } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex
      as="nav"
      background="black"
      color="white"
      p={2}
      align="center"
      justify="space-between"
    >
      <Heading as="h1">Swift Contracts</Heading>
      <Flex gap={5}>
        <Link as={RouterNavLink} to="/contracts">
          Contracts
        </Link>
        <Link as={RouterNavLink} to="/clients">
          Clients
        </Link>
      </Flex>
    </Flex>
  );
}
