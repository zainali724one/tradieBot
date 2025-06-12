import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("telegramid");
  return token ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
