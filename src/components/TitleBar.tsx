import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../assets/Logo.png';

interface Props {
  window?: () => Window;
  role: 'Employee' | 'Authorizer' | 'Admin';
}

const drawerWidth = 240;

const TitleBar: React.FC<Props> = ({ window, role }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const getNavItems = (role: Props['role']) => {
    const navigate = useNavigate(); 
    const handleLogout = () => {
      console.log("HandleLogout");
      localStorage.clear();
      navigate('/'); 
    };
    switch (role) {
      case 'Employee':
        return [
          { name: 'View Orders', path: '/EmployeeDashboard' },
          { name: 'Create Order', path: '/OrderForm' },
          { name: 'Logout', onclick: handleLogout,  },
        ];
      case 'Authorizer':
        return [{ name: 'Logout', onclick: handleLogout }];
      case 'Admin':
        return [
          { name: 'View Orders', path: '/admin' },
          { name: 'View Users', path: '/admin/users' },
          { name: 'Logout', onclick: handleLogout },
        ];
      default:
        return [{ name: 'Logout', onclick: handleLogout }];
    }
  };

  const navItems = getNavItems(role);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ProOrder
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            {/* @ts-ignore */}
            <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={item.path}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#005858' }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={logo}
            alt="Logo"
            style={{ width: '150px', height: 'auto' }}
          />
          <Box sx={{ display: { xs: 'none', sm: 'flex' ,alignItems:"center",justifyContent:"center"}, flexGrow: 1 }}>
            {navItems.map((item) =>
        item.onclick ? (
          <Button
            key={item.name}
            sx={{ color: '#fff', mx: 1 }}
            onClick={item.onclick} // Call the onClick handler for Logout
          >
            {item.name}
          </Button>
        ) : (
          <Button
            key={item.name}
            sx={{ color: '#fff', mx: 1 }}
            component={Link}
            to={item.path} // Ensure to add the 'to' property for navigation
          >
            {item.name}
          </Button>
        )
      )}
          </Box>
          
          {/* here we will be passsing the name of the user with his role */}
          Admin: Rasha barakat

        </Toolbar>
      </AppBar>
      <nav>


        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default TitleBar;
