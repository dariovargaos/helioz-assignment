import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Button, Flex, Image, Link, Text, useToast } from "@chakra-ui/react";

//images
import Logo from "/favicon.png";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout, error, isPending } = useLogout();
  const navigate = useNavigate();

  const toast = useToast();
  return (
    <Flex
      as="nav"
      background="black"
      color="white"
      p={1}
      align="center"
      justify="space-between"
      position="sticky"
      top="0"
      zIndex={1}
    >
      <Flex align="center" gap={5}>
        <Image
          src={Logo}
          alt="Swift Contracts Logo"
          filter="invert(100%)"
          boxSize="60px"
          onClick={() => navigate("/")}
          _hover={{ cursor: "pointer" }}
        />
        {user && <Text>Hello, {user.displayName}</Text>}
      </Flex>

      <Flex gap={5}>
        {user ? (
          <Flex align="center" gap={3}>
            <Link
              as={RouterNavLink}
              to="/"
              _activeLink={{ fontWeight: "bold", textDecoration: "underline" }}
            >
              Home
            </Link>
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
            <Link
              as={RouterNavLink}
              to="/"
              _activeLink={{ fontWeight: "bold", textDecoration: "underline" }}
            >
              Home
            </Link>
            <Link as={RouterNavLink} to="/login">
              Login
            </Link>
            <Link as={RouterNavLink} to="/signup">
              Signup
            </Link>
          </>
        )}
      </Flex>
      {error &&
        toast({
          title: "Logout failed",
          description: "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })}
    </Flex>
  );
}
