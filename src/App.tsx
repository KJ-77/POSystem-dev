import "./App.css";
//import { Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<></>} />
        {/*user_id !== null ? <Route path="Todo" element={<></>} /> : <></>*/}
        <Route path="/*" element={<></>} />
      </Routes>
    </>
  );
}

export default App;
