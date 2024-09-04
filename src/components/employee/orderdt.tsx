
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface OrderDetailsProps {
  id: string;
  name: string;
  description: string;
  status: string;
  date: string;
  quantity: number;
  unit_price: number;
  totalPrice: number;
  reason: string;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  name,
  description,
  status,
  date,
  quantity,
 unit_price,
  totalPrice,
  reason,
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography><strong>Order Name:</strong> {name}</Typography>
          <Typography><strong>Description:</strong> {description}</Typography>
          <Typography><strong>Status:</strong> {status}</Typography>
          <Typography><strong>Date:</strong> {date}</Typography>
          <Typography><strong>Quantity:</strong> {quantity}</Typography>
          <Typography><strong>Unit Price:</strong> {unit_price}</Typography>
          <Typography><strong>Total Price:</strong> {totalPrice}</Typography>
          <Typography><strong>Reason:</strong> {reason}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetails;
