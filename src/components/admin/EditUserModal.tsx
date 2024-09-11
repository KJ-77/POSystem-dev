import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import theme from "../../globalStyles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import lockIcon from "../../assets/icons8-lock-64.png";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const defaultTheme = createTheme();

export default function SignUp({ id }: any) {
  const [loading, setloading] = React.useState(false);
  const [name, setname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, seterror] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const bodyData: any = {};

    // Add only if `fullName` is provided
    if (name) {
      bodyData.FULLNAME = name;
    }

    // Add only if `email` is provided
    if (email) {
      bodyData.email = email;
    }
    if (Object.keys(bodyData).length > 0) {
      try {
        setloading(true);
        const response = await axios.put(
          `https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/updateuserId/${id}`,
          bodyData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          navigate(0);
        } else {
          seterror("Something went wrong!");
        }
      } catch (error: any) {
        if (error.response) {
          seterror(
            error.response.data.error || "An unexpected error occurred."
          );
        } else if (error.request) {
          seterror("No response received from server.");
        } else {
          seterror("Error setting up request: " + error.message);
        }
      } finally {
        setloading(false);
      }
    } else seterror("update name or email!!!");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "transparent",
              border: "none",
              width: 80,
              height: 80,
            }}
          >
            <img
              src={lockIcon}
              alt="Lock Icon"
              style={{ width: "100%", height: "100%" }}
            />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  fullWidth
                  id="lastName"
                  label="Full Name"
                  name="full name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Box>
          {error && (
            <Box p={2} fontSize="12px" color="red">
              error : {error}
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
