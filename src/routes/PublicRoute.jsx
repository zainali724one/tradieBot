import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("telegramid");

  return token ? <Navigate to="/quoteform" replace /> : children;
};

export default PublicRoute;
