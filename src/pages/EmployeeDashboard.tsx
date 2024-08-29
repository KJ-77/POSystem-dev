import React from 'react';
import TitleBar from "../components/TitleBar";
import { Typography } from '@mui/material';
const EmployeeDashboard: React.FC = () => {
  return (

    <div>
      <TitleBar role="Employee" />
      <Typography
      variant="h5" 
      align="center"
      sx={{ padding:"10px" }}
      >You are in the employee dashboard</Typography>      
    <Typography
      variant="h6" 
      align="center"
      sx={{ padding:"10px" }}
      >View Order Table</Typography>   
            {/* Add more content or components here */}
    </div>
  );
};

export default EmployeeDashboard;
