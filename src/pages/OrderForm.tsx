import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TitleBar from '../components/TitleBar';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';

export default function FormPropsTextFields() {
  const [formData, setFormData] = useState({
    order_name: '',
    unit_price: '',
    quantity: '',
    link: '',
    order_desc: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const idToken = localStorage.getItem("idtoken");
    try {
      const response = await fetch('https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/createorders/2488a4d8-d081-7092-4da6-521d83f22764', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: idToken } : {}),
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          order_name: '',
          unit_price: '',
          quantity: '',
          link: '',
          order_desc: ''
        });
      } else {
        console.error('Failed to submit the form');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
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
        autoComplete="off"
      >
        <Typography align="center" sx={{ fontSize: "20px", padding: "10px" }}>
          Place Your Order!
        </Typography>
        <div style={{
          display: 'flex',
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TextField
            required
            id="order_name"
            label="Name"
            name="order_name"
            value={formData.order_name}
            onChange={handleInputChange}
          />
          <TextField
            id="unit_price"
            label="Price"
            type="number"
            name="unit_price"
            value={formData.unit_price}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="quantity"
            label="Quantity"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="link"
            label="Link"
            name="link"
            placeholder="https://www.amazon.com/..."
            value={formData.link}
            onChange={handleInputChange}
            helperText="Enter the link of your product"
          />
          <TextField
            id="order_desc"
            label="Description"
            name="order_desc"
            placeholder="Please enter text"
            value={formData.order_desc}
            onChange={handleInputChange}
            helperText="Enter some information about your order"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid()} 
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
