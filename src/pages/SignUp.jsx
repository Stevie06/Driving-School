import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { Button, TextField, Typography, Container, Paper, Grid, Link, Snackbar, Alert } from '@mui/material';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '' 
  });
  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClick = (message, severity) => {
    setSnackPack((prev) => [...prev, { message, severity }]);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const { user, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      handleClick(error.message, 'error');
    } else {
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([{  username: formData.username }]);

      if (insertError) {
        handleClick(insertError.message, 'error');
      } else {
        handleClick('Registration successful!', 'success');
        navigate('/'); 
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Container maxWidth='sm'>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant='h3' gutterBottom>
            Instructor Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  variant="standard"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="username"
                  label="Username"
                  variant="standard"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography sx={{ mt: 2 }}>
            Already have an account? <Link href='/'>Login</Link>
          </Typography>
        </Paper>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={messageInfo ? messageInfo.severity : 'info'} sx={{ width: '100%' }}>
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUp;