import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//pages and layouts
import SignupLoginLayout from "./layouts/SignupLoginLayout";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Contracts from "./pages/contracts/Contracts";
import Clients from "./pages/clients/Clients";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<SignupLoginLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/clients" element={<Clients />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
