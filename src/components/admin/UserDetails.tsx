
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
import React,{ useState } from "react";
import TransitionsModal from "./EditUser";
import { useNavigate } from "react-router-dom";
interface OrderDetails {
  id: number;
  username: string;
  email: string;
  role: "Admin" | "Authorizer" | "Employee";
  isopen: boolean;
  setisopen: (arg0: boolean) => void;
}

const UserDetails: React.FC<OrderDetails> = ({
  id,
  username,
  email,
  role,
  isopen,
  setisopen,
}) => {
  
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDialogClose = () => {
        setIsDialogOpen(false);
      };
    const handleConfirmDelete = async() => {
        
      try {
        const response = await fetch(`https://n1458hy4ek.execute-api.us-east-1.amazonaws.com/dev/user/${id}`, {
          method: 'DELETE',

        });
    
        if (response.ok) {
          console.log('User deleted successfully:');
          navigate(0);
          
        } else {
          console.error('Failed to delete user:', response.statusText);
         
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        // Handle the network error, show a message to the user, etc.
      }
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
              User Details
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
                <strong>Role: </strong>
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.telet.main }}
              >
                {role}
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
      <TransitionsModal id={id} />
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