import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignup } from "../../hooks/useSignup";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Box,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";

//icons
import {
  EmailIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  AtSignIcon,
} from "@chakra-ui/icons";

interface SignupFormData {
  email: string;
  password: string;
  displayName: string;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { signup, error, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = (data: SignupFormData) => {
    signup(data.email, data.password, data.displayName);

    reset();
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Flex justify="center" align="center" h="80vh">
      <Box boxShadow="lg" p="20px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading mb="20px">Signup</Heading>
          <FormControl mb="20px">
            <FormLabel>email:</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <EmailIcon />
              </InputLeftElement>
              <Input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required.",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                color="gray.500"
              />
            </InputGroup>
            {errors.email?.message && (
              <Text color="red">{errors.email.message}</Text>
            )}
          </FormControl>
          <FormControl mb="20px">
            <FormLabel>password:</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <LockIcon />
              </InputLeftElement>
              <Input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required.",
                  },
                })}
                type={showPassword ? "text" : "password"}
                color="gray.500"
              />
              <InputRightElement>
                <Button
                  colorScheme="blackAlpha"
                  variant="ghost"
                  onClick={handleClick}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password?.message && (
              <Text color="red">{errors.password.message}</Text>
            )}
          </FormControl>
          <FormControl mb="20px">
            <FormLabel>display name:</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <AtSignIcon />
              </InputLeftElement>
              <Input
                {...register("displayName", {
                  required: {
                    value: true,
                    message: "Display name is required.",
                  },
                })}
                type="text"
                color="gray.500"
                minLength={1}
                maxLength={20}
              />
            </InputGroup>
            {errors.displayName?.message && (
              <Text color="red">{errors.displayName.message}</Text>
            )}
          </FormControl>
          {error && <Text color="red">{error.message}</Text>}
          {!isPending ? (
            <Button type="submit" colorScheme="blackAlpha">
              Signup
            </Button>
          ) : (
            <Button isLoading colorScheme="blackAlpha"></Button>
          )}
        </form>
        <Link as={RouterLink} to="/login" color="black">
          Signed up already? <b>Login here.</b>
        </Link>
      </Box>
    </Flex>
  );
}
