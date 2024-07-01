import React, { useState, useEffect } from 'react';
import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HouseIcon from '@mui/icons-material/House'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Person from '@mui/icons-material/Person';
import  InfoIcon from '@mui/icons-material/Info';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';
import { supabase } from '../client'; 
function MenuItems() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        if (error) console.error('Error fetching role:', error);
        else if (data) setRole(data.role);
      }
    };

    fetchRole();
  }, []);

  const menuItems = [
    { text: 'Acasa', path: '/DashboardAdmin', Icon: HouseIcon, color: 'gray', roles: ['admin'] },
    { text: 'Acasa', path: '/DashboardInst', Icon: HouseIcon, color: 'gray', roles: ['instructor']},
    { text: 'Acasa', path: '/DashboardStud', Icon: HouseIcon, color: 'gray', roles: ['user']},
    { text: 'Sesiune de condus', path: '/Sesiune_condus', Icon: MenuBookIcon, color: 'gray', roles: ['instructor'] },
    { text: 'Studenti', path: '/Studenti', Icon: Person, color: 'gray', roles: ['admin', 'instructor'] },
    { text: 'Masina', path: '/Masina', Icon: AccountCircleIcon, color: 'gray', roles: ['admin'] },
    { text: 'Quiz', path: '/Quiz', Icon: EventNoteIcon, color: 'gray', roles: ['user', 'admin'] },
    { text: 'Facturi', path: '/Receipts', Icon: ReceiptIcon, color: 'gray', roles: ['user'] },
    { text: 'Facturi', path: '/Receipts_Admin', Icon: ReceiptIcon, color: 'gray', roles: ['admin', 'instructor'] },
    { text: 'Rapoarte', path: '/Reports', Icon: BarChartIcon, color: 'gray', roles: ['admin'] },
    { text: 'Despre noi', path: '/AboutUs', Icon: InfoIcon, color: 'gray', roles: ['admin', 'instructor', 'user'] },
  ];

  return (
    <div>
      <Typography variant="h6" sx={{ padding: 2 }}>
          Adelante
      </Typography>
      <Divider/>
      <List sx={{ width:250}}>
        {menuItems.filter(item => item.roles.includes(role)).map((item, index) => (
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
