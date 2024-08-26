import "./App.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from './globalStyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/signin';
import Admin from './pages/Admin'
import AdminUsers from './pages/AdminUsers'
import NotFoundPage from "./components/NotFound";
import OrderForm from "./pages/OrderForm"
import EmployeeDashboard from './pages/EmployeeDashboard';
//import { Typography } from "@mui/material";
/*import { Routes, Route } from "react-router-dom";*/


  return (
    <ThemeProvider theme={theme}>
    {/*   components........... */}
    <Router>
      <Routes>
      <Route path="/OrderForm" element={<OrderForm />} />
      <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin/users" element={<AdminUsers/>} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </ThemeProvider>
  )
}

export default App;


