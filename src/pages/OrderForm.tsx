import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TitleBar from '../components/TitleBar';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';


export default function FormPropsTextFields() {
  //const [formData, setFormData] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);



  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
   // console.log('Form submitted with data:', formData);
    setSubmitted(true);
  };
  
  return (
<>
  <TitleBar role="Employee" />
  
  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      '& .MuiTextField-root': { m: 1, width: '60ch' },
    }}
    autoComplete="off">
      <Typography
      align="center"
      sx={{ fontSize: "20px",padding:"10px" }}
      >Place Your Order !</Typography>
      <div
        style={{
          display: 'flex',
          flexDirection:"column",
          justifyContent: 'center',
          alignItems: 'center',
        }}>
              <TextField
                required
                id="outlined-required"
                label="Name"
              />
             <TextField
                id="outlined-number"
                label="Price"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Quantity"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />

            <TextField
                id="outlined-helperText"
                label="Link"
                placeholder="https://www.amazon.com/AmazonBasics-Matte-Keyboard-QWERTY-Layout/dp/B07WJ5D3H4/ref=sr_1_1_ffob_sspa?dib=eyJ2IjoiMSJ9.R8S3hPZYQHddcgNhieVzSjJ_5_HbLJNFvcpcNua-7vfEea-zzOw1gzo9EpkgszIP0P16_MbjYVR8a7sxtV6rasfLbk1HZDfinBRSiPT9PWIZKM1t3k6dGv7cjp1YANV-OJiqMC3x3Ay3J_QTluVU3UYkLOXyBnl4zVWmfo_Z2C5KEeHqSGTubqWuehfC6HbrG_AwzhLxhs1Eipm5fQl8FmgEi7dcOHF5YqzqvjGiAvs.UnBFzaa6joI6qj_OtWU_1vqwlmYsPzbOwhQ0n6Zs6xg&dib_tag=se&keywords=keyboard&qid=1724401868&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1"
                helperText="Enter the Link of your product"
            />
                          <TextField
                id="outlined-helperText"
                label="Description"
                placeholder="Please enter text"            
                helperText="Enter some information about your order"
                multiline rows={4}
            />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Submit
      </Button>

      {submitted && (
        <Typography variant="body1" color="primary">
          Form submitted successfully!
        </Typography>
      )}
      </div>
    </Box>

</>
  );
}
