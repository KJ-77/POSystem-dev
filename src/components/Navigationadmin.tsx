import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logo-pure.png"
//import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTheme, useMediaQuery } from "@mui/material";

const pages = ["Orders", "Users"];

const ResponsiveSidebar = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>

      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        sx={{ display: { xs: "block", md: "none" }, mt: 2, ml: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/*<Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isMobile ? 0 : 240,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >

      </Box>*/}
    </Box>
  );
};

const drawer = (
  <div>
       <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    p: 2,
  }}
>
  <Box
    component="img"
    src={Logo}
    alt="Welcome to MySite"
    sx={{
      width: "20%", 
      height: "auto",
      display: "block",
      background: "black",
    }}
  />
  <Typography
    variant="h6"
    noWrap
    component="a"
    href="/admin "
    sx={{
      fontFamily: "monospace",
      fontWeight: 700,
      letterSpacing: ".3rem",
      color: "inherit",
      textDecoration: "none",
      marginLeft: "20px"
    }}
  >
    MySite
  </Typography>
</Box>


    <List>
      {pages.map((page) => (
        <ListItem key={page} disablePadding>
          <ListItemButton component="a" href={`#${page.toLowerCase()}`}>
            <ListItemText primary={page} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </div>
);

export default ResponsiveSidebar;
