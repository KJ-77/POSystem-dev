import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import CustomButton from "../../CustomStyle/CustomButton";

interface OrderDetailsProps {
  id: number;
  name: string;
  orderby: string;
  unitprice: number;
  quantity: number;
  description: string;
  status: "pending" | "accepted" | "rejected";
  date: string;
  isopen: boolean;
  setisopen: (isOpen: boolean) => void;
  updateStatus: (id: number, newStatus: "pending" | "accepted" | "rejected") => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "blue";
    case "accepted":
      return "green";
    case "rejected":
      return "red";
    default:
      return "black";
  }
};

const OrderDetails: React.FC<OrderDetailsProps> = ({
  id,
  name,
  orderby,
  unitprice,
  quantity,
  description,
  status,
  date,
  isopen,
  setisopen,
  updateStatus,
}) => {
  const [newStatus, setNewStatus] = useState<"pending" | "accepted" | "rejected">(status);

  const handleSave = () => {
    if (newStatus !== status) {
      updateStatus(id, newStatus);
    }
    setisopen(false);
  };

  return (
    <Dialog open={isopen} onClose={() => setisopen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 3 }} style={{ color: "#005858" }}>
          Order Details
        </Typography>
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
            <strong>Unit Price:</strong> ${unitprice.toFixed(2)}
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
            <strong>Total Price:</strong> ${(unitprice * quantity).toFixed(2)}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Description:</strong> {description}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2} sx={{ display: "flex" }}>
          <Typography variant="body1" mr={2}>
            <strong>Status: </strong>
          </Typography>
          <Typography variant="body1" sx={{ color: getStatusColor(newStatus) }}>
            {newStatus}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            <strong>Date:</strong> {date}
          </Typography>
        </Box>
        {status === "pending" && (
          <Box mt={2} sx={{ display: "flex", gap: 1 }}>
            <CustomButton variant="contained" color="success" onClick={() => setNewStatus("accepted")}>
              Accept
            </CustomButton>
            <CustomButton variant="contained" color="error" onClick={() => setNewStatus("rejected")}>
              Reject
            </CustomButton>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <CustomButton onClick={handleSave} sx={{ alignSelf: "flex-start" }}>Save</CustomButton>
        <CustomButton onClick={() => setisopen(false)}>Close</CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetails;
