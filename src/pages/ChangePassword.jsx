import React, { useState } from 'react';
import { supabase } from '../client';
import { Button, TextField, Typography, Box, Snackbar, Alert, Container } from '@mui/material';
import TopBar from '../components/TopBar';

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setPasswords({ ...passwords, [event.target.name]: event.target.value });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setMessage('New passwords do not match.');
            setOpen(true);
            return;
        }

        const { user, error } = await supabase.auth.updateUser({
            password: passwords.newPassword
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Password successfully updated.');
        }
        setOpen(true);
    };

    return (
        <div>
        <TopBar/>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center' }}> 
            <Container component="main" maxWidth="xs">
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 3,
                        m: 1,
                        bgcolor: 'background.paper',
                        boxShadow: 3,
                        borderRadius: 1
                    }}
                >
                    <Typography variant="h6">Change Password</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="oldPassword"
                        label="Old Password"
                        type="password"
                        value={passwords.oldPassword}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type="password"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm New Password"
                        type="password"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Update Password
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                </Box>
            </Container>
        </div>
        </div>
    );
};

export default ChangePassword;
