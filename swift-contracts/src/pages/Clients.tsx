import { Box, Button, Flex } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Box as="main" p={2}>
      <Flex justify="flex-end">
        <Button colorScheme="blackAlpha">Add Client +</Button>
      </Flex>

      <Box>LISTA SVIH KLIJENATA</Box>
    </Box>
  );
}
