import { NavLink as RouterNavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Button, Flex, Heading, Link, Text } from "@chakra-ui/react";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout, error, isPending } = useLogout();
  return (
    <Flex
      as="nav"
      background="black"
      color="white"
      p={2}
      align="center"
      justify="space-between"
      position="sticky"
      top="0"
      zIndex={1}
    >
      <Heading as="h1">Swift Contracts</Heading>
      <Flex gap={5}>
        {user ? (
          <Flex align="center" gap={3}>
            <Text>Hello, {user.displayName}</Text>
            <Link
              as={RouterNavLink}
              to="/contracts"
              _activeLink={{ fontWeight: "bold", textDecoration: "underline" }}
            >
              Contracts
            </Link>
            <Link
              as={RouterNavLink}
              to="/clients"
              _activeLink={{ fontWeight: "bold", textDecoration: "underline" }}
            >
              Clients
            </Link>
            {!isPending ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <Button isLoading></Button>
            )}
          </Flex>
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
