import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages and layouts
import SignupLoginLayout from "./layouts/SignupLoginLayout";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Contracts from "./pages/contracts/Contracts";
import ContractSummary from "./pages/contracts/ContractSummary";
import Clients from "./pages/clients/Clients";

function App() {
  const { user, authIsReady } = useAuthContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<SignupLoginLayout />}>
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/contracts" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/contracts" />}
          />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route
            path="/contracts"
            element={user ? <Contracts /> : <Navigate to="/login" />}
          />
          <Route
            path="/contracts/:id"
            element={user ? <ContractSummary /> : <Navigate to="/login" />}
          />
          <Route
            path="/clients"
            element={user ? <Clients /> : <Navigate to="/login" />}
          />
        </Route>
      </Route>
    )
  );
  return authIsReady && <RouterProvider router={router} />;
}

export default App;
