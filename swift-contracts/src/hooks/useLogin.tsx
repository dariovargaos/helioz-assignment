import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useToast } from "@chakra-ui/react";

interface LoginError {
  message: string;
}

interface FirebaseError extends Error {
  code: string;
}

export const useLogin = () => {
  const [error, setError] = useState<LoginError | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const [isComponentMounted, setIsComponentMounted] = useState<boolean>(true);

  const toast = useToast();

  //check whether the user is correctly entered login details
  const validateInput = (email: string, password: string): boolean => {
    if (email.trim() === "") {
      setError({ message: "Email is required." });
      return false;
    }
    if (password.trim() === "") {
      setError({ message: "Password is required." });
      return false;
    }

    return true;
  };

  const login = async (email: string, password: string) => {
    if (!validateInput(email, password)) {
      setIsPending(false);
      return;
    }
    setError(null);
    setIsPending(true);

    //sing the user in
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      //update state
      if (isComponentMounted) {
        setIsPending(false);
        setError(null);
      }

      toast({
        title: "Welcome back.",
        description: "Logged in.",
        status: "success",
        variant: "customSuccess",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      if (!isComponentMounted) return;

      const firebaseError = err as FirebaseError;
      switch (firebaseError.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-email":
        case "auth/invalid-login-credentials":
        case "auth/invalid-credential":
          setError({ message: "Incorrect email or password." });
          break;
        default:
          setError({ message: firebaseError.message });
      }
      setIsPending(false);
    }
  };

  useEffect(() => {
    setIsComponentMounted(true);
    return () => setIsComponentMounted(false);
  }, []);

  return { login, error, isPending };
};
