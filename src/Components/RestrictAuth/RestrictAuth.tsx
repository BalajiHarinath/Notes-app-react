import { useLocation, Navigate, Outlet } from "react-router";
import { useAuth } from "../../Context";

export const RestrictAuth = () => {
  const {
    authState: { userID },
  } = useAuth();
  const location = useLocation();

  return userID ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
