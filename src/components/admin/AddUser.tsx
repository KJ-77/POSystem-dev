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

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    if (password.length >= 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };

  const handleRoleChange = (event: any, newRole: string) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      console.log("Form submitted:", { username, email, password, role });
      handleClose();
    }
  };

  const validateForm = () => {
    const newErrors = { username: "", email: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required.";
    }

    if (!email || !isValidEmail(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
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
          textTransform: "none",
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
            label="Username"
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
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.password}
            helperText={errors.password}
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
            <CustomToggleButton value="admin" selected={role === "admin"}>
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
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
export default MyModal;
