import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client'; 
import MenuItems from './MenuItems';
import MenuIcon from '@mui/icons-material/Menu';
const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toogleDrawer = (open) =>(event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'gray' ,marginBottom:'20px'}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toogleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Adelante
        </Typography>
        <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={toogleDrawer(false)}
        >
          <MenuItems/>
        </Drawer>
        <IconButton onClick={handleMenu} size="large" sx={{ p: 1 }}>
          <Avatar alt="User" /> 
        </IconButton>
        <Menu
          id="menu-appbar"
          style={{ marginTop: '45px' }}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            handleClose();
            navigate('/EditProfile');
          }}>Editeaza profilul</MenuItem>
          <MenuItem onClick={() => {
            handleClose();
            navigate('/ChangePassword');
          }}>Schimba parola</MenuItem>
          <MenuItem onClick={() => {
            handleClose();
            handleLogout();
          }}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
