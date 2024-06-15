import React from 'react';
import { Divider, List, ListItemButton, ListItemIcon, ListItemText,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HouseIcon from '@mui/icons-material/House'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import  Person  from '@mui/icons-material/Person';

const menuItems = [
  { text: 'Home', path: '/DashboardAdmin',Icon: HouseIcon, color: 'gray' },
  { text: 'Programari', path: '/Programari', Icon: EventNoteIcon, color: 'gray' },
  { text: 'Sesiune de condus', path: '/Sesiune_condus', Icon: MenuBookIcon, color: 'gray' },
  { text: 'Studenti', path: '/Studenti', Icon: Person , color: 'gray' }, 
  { text: 'Profil', path: '/Profile', Icon: AccountCircleIcon, color: 'gray' },
  { text: 'Schimba parola', path: '/ChangePassword', Icon: AccountCircleIcon, color: 'gray' }
];

function MenuItems() {
  const navigate = useNavigate();

  return (
    <div>
    <Typography variant="h6" sx={{ padding: 2 }}>
        Adelante
    </Typography>
    <Divider/>
    <List sx={{ width:250, bgcolor: 'background.paper' }}>
      {menuItems.map((item, index) => (
        <ListItemButton key={index} onClick={() => navigate(item.path)}>
          <ListItemIcon>
            <item.Icon color={item.color} />
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </List>
    </div>
  );
}

export default MenuItems; 