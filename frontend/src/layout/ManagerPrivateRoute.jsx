import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/UseAuth";

// Protect private routes from unauthorized access
export default function ManagerPrivateRoute() {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return user.role === "manager" ? <Outlet /> : <Navigate to="/" />;
}
