import { NavLink as RouterNavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Flex, Heading, Link, Text } from "@chakra-ui/react";

export default function Navbar() {
  const { user } = useAuthContext();
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
        {user ? (
          <>
            <Text>Hello, {user.displayName}</Text>
            <Link as={RouterNavLink} to="/contracts">
              Contracts
            </Link>
            <Link as={RouterNavLink} to="/clients">
              Clients
            </Link>
          </>
        ) : (
          <>
            <Link as={RouterNavLink} to="/login">
              Login
            </Link>
            <Link as={RouterNavLink} to="/signup">
              Signup
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
}
