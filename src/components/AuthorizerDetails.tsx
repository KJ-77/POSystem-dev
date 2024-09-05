import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import CircularD from "./CircularD";
import Alert from "@mui/material/Alert";
import CustomButton from "../CustomStyle/CustomButton";
import CloseIcon from "@mui/icons-material/Close";

interface OrderDetailsProps {
  id: string;
  name: string;
  orderby: string;
  unitprice: number;
  quantity: number;
  description: string;
  link: string;
  analysis: string;
  status: "Pending" | "Accepted" | "Rejected";
  date: string;
  price_diff: number;
  isopen: boolean;
  score: number;
  setisopen: (isOpen: boolean) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  id,
  name,
  orderby,
  unitprice,
  quantity,
  description,
  status,
  date,
  link,
  analysis,
  score,
  isopen,
  setisopen,
}) => {
  const [selectedButton, setSelectedButton] = useState<
    "success" | "error" | null
  >(null);
  const [finalstate, setfinalstate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);

  const closehandler = () => {
    setSelectedButton(null);
    setfinalstate("");
    setisopen(false);
  };
  const handleSuccessClick = () => {
    setSelectedButton("success");
    setfinalstate("Accepted");
  };

  const handleErrorClick = () => {
    setSelectedButton("error");
    setfinalstate("Rejected");
  };

  const handleButtonClick = async () => {
    if (!reason) {
      setError(true);  // Show an error if the reason field is empty
      return;
    }
    try {
      setloading(true);
      const response = await axios.put(`http://localhost:3000/orderId/${id}`, 
        {
          status: finalstate,
          reason: reason
        }, 
        {
          headers: {
            Authorization: localStorage.getItem('idtoken')
          }
        }
      );
      
      console.log("API response:", response.data);
      closehandler();
      setloading(false);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  return (
    <Dialog
      open={isopen}
      onClose={() => setisopen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
            style={{ color: "#005858" }}
          >
            Order Details
          </Typography>
          <Box
            onClick={closehandler}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <CloseIcon color="primary" />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="body1">
            <strong>Name:</strong> {name}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Ordered By:</strong> {orderby}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Unit Price:</strong> ${unitprice}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Quantity:</strong> {quantity}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Total Price:</strong> ${unitprice * quantity}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2} >
          <Typography variant="body1">
            <strong>Description:</strong> {description}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2} >
          <Typography variant="body1" >
            <strong>Link of order: </strong> {link}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Date:</strong> {date}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2} sx={{ display: "flex" }}>
          <Typography variant="body1" mr={2}>
            <strong>Status: </strong>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color:
                status === "Rejected"
                  ? "red"
                  : status === "Accepted"
                  ? "green"
                  : "blue",
            }}
          >
            <strong> {status} </strong>
          </Typography>
        </Box>
        <Divider />
        {status === "Rejected" && (
          <Box mt={2} mb={2}>
            <Typography variant="h6" mr={2} mb={1} sx={{ color: "#005858" }}>
              <strong>Reason: </strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#005858", fontSize: "1rem" }}
            >
              <strong>
                {reason}
              </strong>
            </Typography>
          </Box>
        )}
        {status === "Pending" && (
          <>
            <Box display="inline-flex" sx={{ mt: 4, mb: 4 }}>
              <CircularD score={score} />
              <Typography
                sx={{
                  m: 2,
                  color:
                    score >= 90
                      ? "primary.main"
                      : score >= 70
                      ? "warning.main"
                      : "error.main",
                }}
              >
                {analysis}
              </Typography>
            </Box>

            {score === 100 && (
              <Alert severity="success">
                Fantastic! The order is now accepted and ready to go! Thanks for
                making it work! 🚀
              </Alert>
            )}
            {score >= 90 && score < 100 && (
              <Alert severity="success">
                "🤔 Almost a perfect fit! Just a tiny tweak,What do you say? 🤝"
              </Alert>
            )}
            {score < 90 && score >= 70 && (
              <Alert severity="warning">
                It's not perfect, but it's good enough.Please double check
              </Alert>
            )}
            {score < 70 && (
              <Alert severity="error">
                Looks like this one isn't quite right. adjust it and try again.
              </Alert>
            )}

            <Box
              m={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant={
                  selectedButton === "success" ? "outlined" : "contained"
                }
                color="success"
                sx={{ mr: 4, mt: 4, mb: 3 }}
                onClick={handleSuccessClick}
              >
                Accepted
              </Button>
              <Button
                variant={selectedButton === "error" ? "outlined" : "contained"}
                color="error"
                onClick={handleErrorClick}
                sx={{ mt: 4, mb: 3 }}
              >
                Rejected
              </Button>
            </Box>
          </>
        )}

        {finalstate === "Rejected" && (
          <TextField
            label="your reason"
            variant="outlined"
            fullWidth
            required
            value={reason}
            onChange={(e) => {
            setReason(e.target.value);
            setError(false); 
            }}
            error={error}
            helperText={error ? "Reason is required" : ""}
            sx={{
              maxWidth: 400,
              "& .MuiInputLabel-root": { color: "red" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "red",
                },
                "&:hover fieldset": {
                  borderColor: "red",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "red",
                },
              },
            }}
          />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "50px",
          }}
        >
          {finalstate && (
            <CustomButton onClick={handleButtonClick}>
              {loading ? "Loading..." : "Subnet"}
            </CustomButton>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
