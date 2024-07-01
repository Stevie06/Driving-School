import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { supabase } from '../client';
import TopBar from '../components/TopBar';

const Profile = () => {

  const user = supabase.auth.getUser();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) console.error('Error fetching profile', error);
    else setProfile({ username: data.username, email: data.email, phone: data.phone });
  };

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from('users')
      .update({ ...profile })
      .eq('id', supabase.auth.getUser().id);

    if (error) console.error('Error updating profile', error);
    else alert('Profile updated successfully!');
  };

  return (
    <Box>
    <TopBar />
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 10,alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ padding: '1rem', width: '500px', marginLeft: 'auto', marginRight: 'auto',paddingTop: '2rem' }}>
      <Typography variant="h6">Edit Profile</Typography>
      <TextField
        fullWidth
        label="Username"
        name="username"
        value={profile.username}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={profile.phone}
        onChange={handleChange}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </Paper>
    </Box>
    </Box>
  );
};

export default Profile;
