import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signinImage from "../assets/signin.png";
import lockIcon from "../assets/icons8-lock-64.png";
import {
  signIn,
  signOut,
  getCurrentUser,
  type SignInInput,
  fetchAuthSession,
} from "@aws-amplify/auth";
import { useEffect } from "react";
import axios from "axios";

async function currentAuthenticatedUser() {
  try {
    const user = await getCurrentUser();

    const username = user.username;
    const userId = user.userId;
    const signInDetails = JSON.stringify(user.signInDetails, null, 2);

    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails}`);
  } catch (err) {
    console.error("Error getting the current authenticated user:", err);
  }
}

async function currentSession() {
  try {
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    console.log("access token:" + accessToken);
    console.log("id token:" + idToken);
  } catch (err) {
    console.log(err);
  }
}

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
  navigate: (path: string) => void,
  seterrorapi :any

) {
  try {
    try {
      localStorage.clear();
      await signOut();
      console.log("User signed out");
    } catch (err) {
      seterrorapi(err);
      console.log(err)
      console.log("pkhcwondkondvojsdv")
    }

    const user = await signIn({ username, password });
    console.log("User signed in successfully:", user);

    currentAuthenticatedUser();
    currentSession();

    if (
      user?.nextStep?.signInStep ===
      "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
    ) {
      console.log("Navigating to confirmation page");
      navigate("/confirmation");
    }

    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    const idTokenPayload = idToken?.payload;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const role = idTokenPayload["cognito:groups"][0];
    localStorage.setItem("access", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("idtoken", idToken as unknown as string);

    try {
      await axios.put(
        "https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/confirmUserId",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("idtoken") || "",
          },
        }
      );
    } catch (err :any) {
      seterrorapi(err.message);
    }

    if (role === "Admin") navigate("/admin");
    if (role === "Authorizer") navigate("/Authorizer");
    if (role === "Employee") navigate("/EmployeeDashboard");
  } catch (error :any) {
    seterrorapi(error.message);
  }
}

function checkSignIn(navigate: (path: string) => void) {
  if (!localStorage.getItem("role")) {
    navigate("/");
    return;
  }
  if (localStorage.getItem("role") === "Admin") navigate("/admin");
  if (localStorage.getItem("role") === "Authorizer") navigate("/Authorizer");
  if (localStorage.getItem("role") === "Employee")
    navigate("/EmployeeDashboard");
}

export default function SignInSide() {
  const [error, seterror] = React.useState("");
  const navigate = useNavigate();
  const [loading, setloading] = React.useState(false);
  const [errorapi, seterrorapi] = React.useState("");
  useEffect(() => {
    checkSignIn(navigate);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setloading(true);
    const data = new FormData(event.currentTarget);
    const username = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      await handleSignIn({ username, password }, navigate , seterrorapi);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      seterror("Error signing in");
    } finally {
      setloading(false);
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
            {errorapi && (
        <Box p={1} fontSize="15px" color="red">
           {errorapi}
        </Box>
      )}
            {error && (
              <Typography variant="body1" color="red">
                {error}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
