import { useToast } from "@chakra-ui/react";

interface customToastProps {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error";
}

export const useCustomToast = () => {
  const toast = useToast();

  const customToast = ({ title, description, status }: customToastProps) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
    });
  };

  return customToast;
};
