import "./App.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from './globalStyles';
import TableOrder from './components/Tableorder';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/signin';
//import { Typography } from "@mui/material";
/*import { Routes, Route } from "react-router-dom";*/


function App() {
  return (
    <ThemeProvider theme={theme}>
    {/*   components........... */}
    
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/admin/orders" element={<TableOrder />} />
      </Routes>
    </Router>
  </ThemeProvider>
  )
}

export default App;


