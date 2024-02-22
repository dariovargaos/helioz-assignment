import { useState } from "react";
import { useForm } from "react-hook-form";
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
  Text,
} from "@chakra-ui/react";

//icons
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    reset();
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
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

          <Button type="submit" colorScheme="blackAlpha">
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
