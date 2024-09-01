import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import theme from "../../globalStyles";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
//import {signUp } from "@aws-amplify/auth";
//import  Auth  from 'aws-amplify/auth';
const CustomToggleButton = styled(ToggleButton)(({ theme, selected }) => ({
  backgroundColor: selected ? "white" : theme.palette.telet.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.rabe3.main,
  },
}));

function MyModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorapi, seterrorapi] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Authorizer");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: "",
    }));
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
    if (!isValidEmail) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const handleRoleChange = (event: any, newRole: string) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID: "124",
            FULLNAME: username,
            email: email,
            position: role,
          }),
        }
      );

      if (!response.ok) {
        seterrorapi(`HTTP error! Status: ${response.status}`);
      }
    } catch (err: any) {
      seterrorapi(err.message);
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: theme.palette.telet.main,
          marginBottom: 6,
          marginTop: 6,
          "&:hover": {
            backgroundColor: theme.palette.rabe3.main,
          },
          textAlign: "right",
        }}
        onClick={handleOpen}
        startIcon={<AddIcon />}
      >
        Add User
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Center the modal
            width: 400,
            bgcolor: "background.paper",
            border: "none", // Remove border
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ marginBottom: 3 }}
            style={{ color: theme.palette.rabe3.main }}
          >
            Create User
          </Typography>
          <TextField
            label="Full Name"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={handleRoleChange}
            fullWidth
            sx={{
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            <CustomToggleButton value="Admin" selected={role === "Admin"}>
              Admin
            </CustomToggleButton>
            <CustomToggleButton
              value="Authorizer"
              selected={role === "Authorizer"}
            >
              Authorizer
            </CustomToggleButton>
            <CustomToggleButton value="Employee" selected={role === "Employee"}>
              Employee
            </CustomToggleButton>
          </ToggleButtonGroup>

          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.telet.main,
              "&:hover": {
                backgroundColor: theme.palette.rabe3.main,
              },
            }}
            onClick={handleSubmit}
          >
            ADD User
          </Button>
        </Box>
      </Modal>
      {errorapi && (
        <Box p={1} fontSize="6px" color="red">
          error : {errorapi}
        </Box>
      )}
    </div>
  );
}
export default MyModal;

/*
  const validateForm = () => {
    const newErrors = { username: "", email: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required.";
    }

    if (!email || !isValidEmail(email)) {
      newErrors.email = "Invalid email address.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };
  const generateRandomPassword = (length: number) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*  const handleSubmit =async () => {
    const isValid = validateForm();

    if (isValid) {
      console.log("Form submitted:", { username, email, role });
     // handleClose();
    }
    const password = generateRandomPassword(12);
   try{
    const user : any =await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          email: email,
         name : username,
         'custom:role': 'admin',
        },
      }
    });
    console.log('Sign-up successful' , user);
  } catch (error) {
    console.error('Error signing up:', error);
  }

  };*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
