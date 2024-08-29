import { Amplify } from "aws-amplify";
import { amplifyConfig } from "./config/amplifyConfig";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./globalStyles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/signin";
import Admin from "./pages/admin";
import Authorizer from "./pages/authorizer"; // Use capitalized component name
import AdminUsers from "./pages/AdminUsers";
import OrderForm from "./pages/OrderForm";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ConfirmationPage from './pages/confirmation';
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./config/ProtectedRoute";
const App = () => {
  Amplify.configure(amplifyConfig);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/OrderForm" element={<OrderForm />} />
          <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/authorizer" element={<Authorizer />} /> {/* Use capitalized component name */}
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/" element={<SignInPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
