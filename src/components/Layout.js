
import React from 'react';
import { Drawer, List, Divider, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { managerMenuListItems, userMenuListItems } from './MenuItems';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import firebase from '../firebase/config'; // Make sure this import is at the top

const drawerWidth = 240;

export default function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Permanent Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#f5f5f5',
            color: '#1976d2',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>{managerMenuListItems}</List>
          <Divider />
          <List>{userMenuListItems}</List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#e3f2fd', minHeight: '100vh' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              RideEase: Car & Bike Rentals
            </Typography>
            <Button color="inherit" component={Link} to="/signup" sx={{ ml: 2 }}>
              SIGN UP
            </Button>
            <Button color="inherit" component={Link} to="/login" sx={{ ml: 2 }}>
              LOGIN
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                firebase.auth().signOut();
                navigate('/login');
              }}
              sx={{ ml: 2 }}
            >
              LOGOUT
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* For spacing below AppBar */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}