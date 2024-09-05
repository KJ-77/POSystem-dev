import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signinImage from "../assets/signin.png";
import lockIcon from "../assets/icons8-lock-64.png";
import {signIn, signOut, type SignInInput, getCurrentUser, fetchAuthSession} from "@aws-amplify/auth";
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { useEffect } from 'react';

// async function currentAuthenticatedUser() {
//   try {
//     const user = await getCurrentUser();

//     const username = user.username;
//     const userId = user.userId;
//     const signInDetails = JSON.stringify(user.signInDetails, null, 2);

//     console.log(`The username: ${username}`);
//     console.log(`The userId: ${userId}`);
//     console.log(`The signInDetails: ${signInDetails}`);
//   } catch (err) {
//     console.error('Error getting the current authenticated user:', err);
//   }
// }

// async function currentSession() {
//   try {
//     const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
//     console.log("access token: "+ accessToken);
//     console.log("idToken: "+ idToken);
//   } catch (err) {
//     console.log(err);
//   }
// }

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#005858",
    },
  },
});

export const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};

async function handleSignIn(
  { username, password }: SignInInput,
  navigate: (path: string) => void
) {
  try {
      try {
        localStorage.clear();
        await signOut();
        console.log("User signed out");
      } catch (err) {
        console.log("Error signing out user", err);
      }

    const user = await signIn({ username, password });
    console.log("User signed in successfully:", user);

    // currentAuthenticatedUser();
    // currentSession();

    if (
      user?.nextStep?.signInStep ===
      "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
    ) {
      console.log("Navigating to confirmation page");
      navigate('/confirmation');
    }
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    const idTokenPayload = idToken?.payload;
    //@ts-ignore
    const role = idTokenPayload["cognito:groups"][0];
    localStorage.setItem('access', 'true');
    localStorage.setItem('role', role);
    localStorage.setItem('idtoken', (idToken as unknown as string));
    
    if (role === "Admin" ) navigate("/admin");
    if (role === "Authorizer" ) navigate("/Authorizer");
    if (role === "Employee" ) navigate("/EmployeeDashboard");
 
  } catch (error) {
    console.log("Error signing in:", error);
  }
}

function  checkSignIn(navigate: (path: string) => void){
  if (!localStorage.getItem('role')){ 
    navigate("/");
    return;
  }
  if (localStorage.getItem('role') === "Admin" ) navigate("/admin");
  if (localStorage.getItem('role') === "Authorizer" ) navigate("/Authorizer");
  if (localStorage.getItem('role') === "Employee" ) navigate("/EmployeeDashboard");
}

export default function SignInSide() {
  const navigate = useNavigate();
  const [loading, setloading] = React.useState(false);
  useEffect(() => {
    checkSignIn(navigate);
  }, []);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setloading(true)
    const data = new FormData(event.currentTarget);
    const username = data.get("email") as string;
    const password = data.get("password") as string;
    try {
      await handleSignIn({ username, password }, navigate);

    } catch (error) {
      console.log("Error signing in", error);
    }
    finally{
      setloading(false)
    }
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${signinImage})`,
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
              >
                {loading ? "Loading..." : "Sign In"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
