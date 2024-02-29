import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";
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
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { login, error, isPending } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login(data.email, data.password);

    reset();
  };
  return (
    <Flex justify="center" align="center" h="80vh">
      <Box boxShadow="lg" p="20px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading mb="20px">Login</Heading>
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
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password?.message && (
              <Text color="red">{errors.password.message}</Text>
            )}
          </FormControl>
          {error && <Text color="red">{error.message}</Text>}
          {!isPending ? (
            <Button type="submit" colorScheme="blackAlpha">
              Login
            </Button>
          ) : (
            <Button isLoading />
          )}
        </form>
        <Flex flexDir="column" gap={3}>
          <Link as={RouterLink} to="/resetpassword">
            Forgot password?
          </Link>
          <Link as={RouterLink} to="/signup" color="black">
            Not signed up yet? <b>Signup here.</b>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}
