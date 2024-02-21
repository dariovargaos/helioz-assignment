import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

//components
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
}
