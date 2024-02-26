import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../firebase/config";
import {
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

interface FormData {
  email: string;
}

export default function ResetPassword() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, data.email);
      if (signInMethods.length === 0) {
        throw new Error("No user found with this email.");
      }
      await sendPasswordResetEmail(auth, data.email);
      reset();
      setIsPending(false);
      toast({
        title: "Email sent.",
        description: "Check your inbox.",
        status: "success",
        variant: "customSuccess",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setIsPending(false);
      toast({
        title: "User not found.",
        description: "Incorrect email.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex justify="center" align="center" h="500px">
      <Box w={["90%", "50%", "40%", "30%"]} bg="white" p={5} boxShadow="base">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Heading size="md">Recover your password</Heading>
          <FormControl>
            <Input
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="youremail@email.com"
            />
            <FormHelperText>
              We'll send a link to your email to create a new one.
            </FormHelperText>
            {errors.email?.message && (
              <Text color="red">{errors.email.message}</Text>
            )}
          </FormControl>
          {!isPending ? (
            <Button type="submit" colorScheme="blackAlpha">
              Send link
            </Button>
          ) : (
            <Button isLoading colorScheme="blackAlpha"></Button>
          )}

          <Button
            w="40%"
            colorScheme="blackAlpha"
            onClick={() => navigate("/login")}
          >
            Go back
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
