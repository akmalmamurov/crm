import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ element }) {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return isAuth ? element : <Navigate replace to="/login" />;
}
