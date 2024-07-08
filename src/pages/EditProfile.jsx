import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import TopBar from '../components/TopBar';
import { Button, TextField, Typography, Box, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel, Paper, Icon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const{data: {user}} =await supabase.auth.getUser(); 
    if (user) {
      setUserId(user.id);
      fetchUserData(user.id);
    } else {
      setSnackbarMessage('Nu este detectat niciun utilizator autentificat.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUserData(data);
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userId);

      if (error) throw error;
      setSnackbarMessage('Profil actualizat cu succes!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!userId) return <div>Niciun utilizator autentificat.</div>;

  return (
    <Box>
      <TopBar />
      <Box component="form" onSubmit={handleSubmit}  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3, width: 500 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                        <Icon sx={{ color: '#FFD700', mr: 1 }}>
                            <EditIcon/>
                        </Icon>
                        <Typography variant="h6">Editeaza profilul</Typography>
                    </Box>
                </Paper>
                <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3, width: 500 }}>
                <FormControl fullWidth margin="normal">
                <TextField 
                margin='normal'
                fullWidth
                label="Nume" 
                name="username" 
                value={userData.username} 
                onChange={handleInputChange} 
                />
                <TextField
                margin="normal"
                fullWidth 
                label="Email" 
                name="email" 
                value={userData.email} 
                onChange={handleInputChange} 
                />
                <TextField 
                margin='normal'
                fullWidth
                label="Numar de telefon" 
                name="phone" 
                value={userData.phone} 
                onChange={handleInputChange}
                />
                <TextField
                margin="normal"
                fullWidth 
                label="Adresa" 
                name="address" 
                value={userData.address} 
                onChange={handleInputChange} 
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb:2 }}>
                    Editeaza
                </Button>
                </FormControl>
        </Paper>
        </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </Box>
  );
};

export default EditProfile;
