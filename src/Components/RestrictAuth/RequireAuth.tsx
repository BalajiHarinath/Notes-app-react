import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context";

export const RequireAuth = () => {
  const {
    authState: { userID },
  } = useAuth();
  const location = useLocation();
  return userID ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
