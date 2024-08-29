import { useNavigate } from "react-router-dom";
import * as React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedPage: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (isAuthenticated === "true") {
      if (role === "Employee") {
        navigate("/EmployeeDashboard");
      } else if (role === "Admin") {
        navigate("/admin");
        return;
      } else if (role === "Authorizer") {
        navigate("/authorizer");
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedPage;
