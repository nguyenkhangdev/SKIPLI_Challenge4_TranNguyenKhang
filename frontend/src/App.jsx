import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ManagerSignin from "./pages/ManagerSignin";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import ManagerPrivateRoute from "./layout/ManagerPrivateRoute";
import DashBoardManager from "./pages/DashBoardManager";
import EmployeeSignin from "./pages/EmployeeSignin";
import EmployeePrivateRoute from "./layout/EmployeePrivateRoute";
import DashBoardEmployee from "./pages/DashBoardEmployee";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manager/signin" element={<ManagerSignin />} />
          <Route path="/employee/signin" element={<EmployeeSignin />} />

          <Route element={<ManagerPrivateRoute />}>
            <Route path="/dashboard/manager" element={<DashBoardManager />} />
          </Route>

          <Route element={<EmployeePrivateRoute />}>
            <Route path="/dashboard/employee" element={<DashBoardEmployee />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}
