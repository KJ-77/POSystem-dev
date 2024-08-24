import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderForm from "./pages/OrderForm"
import EmployeeDashboard from './pages/EmployeeDashboard';

const App: React.FC = () => {

  return (
    <>
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/OrderForm" element={<OrderForm />} />
        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>    
    </>
  );
};
export default App;
