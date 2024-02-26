import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Button, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";

//images
import Logo from "/favicon.png";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout, error, isPending } = useLogout();
  const navigate = useNavigate();
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
      <Image
        src={Logo}
        alt="Swift Contracts Logo"
        filter="invert(100%)"
        boxSize="60px"
        onClick={() => navigate("/")}
        _hover={{ cursor: "pointer" }}
      />
      <Flex gap={5}>
        {user ? (
          <Flex align="center" gap={3}>
            <Text>Hello, {user.displayName}</Text>
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
    </Flex>
  );
}
