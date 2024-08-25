import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import CustomButton from "../../CustomStyle/CustomButton";
import theme from "../../globalStyles";
import ConfirmationDelete from "./ConfirmationDelete"
import { useState } from "react";
interface OrderDetails {
  id: number;
  username: string;
  email: string;
  rule: "Admin" | "Authorizer" | "Employee";
  isopen: boolean;
  setisopen: (arg0: boolean) => void;
}

const UserDetails: React.FC<OrderDetails> = ({
  id,
  username,
  email,
  rule,
  isopen,
  setisopen,
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDialogClose = () => {
        setIsDialogOpen(false);
      };
    const handleConfirmDelete = () => {
        
        window.alert('User deleted');
      };
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
                <strong>User Name:</strong> {username}
              </Typography>
            </Box>
            <Divider />
            <Box mt={2} mb={2}>
              <Typography variant="body1">
                <strong>Email:</strong> {email}
              </Typography>
            </Box>
            <Divider />
            <Box mt={2} mb={2} sx={{ display: "flex" }}>
              <Typography variant="body1" mr={2}>
                <strong>Status: </strong>
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.telet.main }}
              >
                {rule}
              </Typography>
            </Box>
            <Divider />
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
        sx={{
          backgroundColor: 'rgb(200,0,0)',
          color: 'white',
          '&:hover': {
            backgroundColor: '#b71c1c',
          },
        }}
        onClick={()=>setIsDialogOpen(true)}
      >
        Delete User
      </Button>
      <ConfirmationDelete
        open={isDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
      />
              <CustomButton onClick={() => setisopen(false)}>
                Close
              </CustomButton>
            </Box>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserDetails;
