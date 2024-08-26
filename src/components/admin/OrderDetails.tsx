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
interface OrderDetails {
  id: string;
  name: string;
  orderby: string;
  unitprice: number;
  quantity: number;
  description: string;
  status: "accepted" | "rejected" | "pending";
  date: string;
  isopen: boolean;
  setisopen: (arg0: boolean) => void;
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
      return "black"; // Default color if status doesn't match any case
  }
};

const OrderDetails: React.FC<OrderDetails> = ({
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
}) => {
  return (
    <>
      {isopen ? (
        <Dialog open={isopen} onClose={() => {}} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ marginBottom: 3 }}
              style={{ color: "#005858" }}
            >
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
                <strong>Order By:</strong> {orderby}
              </Typography>
            </Box>
            <Divider />
            <Box mt={2} mb={2}>
              <Typography variant="body1">
                <strong>Unit Price:</strong> {unitprice.toFixed(2)} $
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
                <strong>Total Price:</strong> {unitprice * quantity} $
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
              <Typography
                variant="body1"
                sx={{ color: getStatusColor(status) }}
              >
                {" "}
                {status}
              </Typography>
            </Box>
            <Divider />
            <Box mt={2}>
              <Typography variant="body1">
                <strong>Date:</strong> {date}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <CustomButton onClick={() => setisopen(false)}>Close</CustomButton>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderDetails;
