import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//pages and layouts
import DashboardLayout from "./layouts/DashboardLayout";
import Contracts from "./pages/Contracts";
import Clients from "./pages/Clients";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
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
