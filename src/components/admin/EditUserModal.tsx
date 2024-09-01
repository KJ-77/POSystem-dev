import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import theme from "../../globalStyles";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import lockIcon from '../../assets/icons8-lock-64.png'; 
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export default function SignUp({id} :any) {

  const [first, setfirst] = React.useState("");
  const [last, setlast] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error,seterror] = React.useState("");
  const navigate = useNavigate();


  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const fullName = `${first} ${last}`;
    
    try {
      const response = await fetch(`https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          FULLNAME:fullName,
          email:email
          }),
      });
  
      if (response.ok) {
        navigate(0);
      } else {
        seterror("somthing wrong!!!!");
      }
    } catch (error : any) {

      seterror(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'transparent', border: 'none', width: 80, height: 80 }}>
              <img src={lockIcon} alt="Lock Icon" style={{ width: '100%', height: '100%' }} />
            </Avatar>
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={first}
                  onChange={(e)=>setfirst(e.target.value)}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={last}
                  onChange={(e)=>setlast(e.target.value)}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
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
            >
              Submit
            </Button>
            
          </Box>
{error &&(
          <Box p={2} fontSize="12px" color="red">
          error : {error}
          </Box>)
        }
        </Box>
      </Container>
    </ThemeProvider>
  );
}