import "./App.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from './globalStyles';
import TableOrder from './components/TableOrder';
//import { Typography } from "@mui/material";
/*import { Routes, Route } from "react-router-dom";*/


function App() {
  return (
    <ThemeProvider theme={theme}>
    {/*   components........... */}
    <TableOrder/>
  </ThemeProvider>
  );
}

export default App;
/*
<>
<div>kwejpojwpkqwcpkjp</div>
<Navigationadmin/>
  <Routes>
    <Route path="/" element={<></>} />*/
    {/*user_id !== null ? <Route path="Todo" element={<></>} /> : <></>*/}
   /* <Route path="/add" element={<></>} />
  </Routes>
</>*/