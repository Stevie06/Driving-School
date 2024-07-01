import React, { useState } from 'react';
import { supabase } from '../client';
import { Button, TextField, Typography, Box, Snackbar, Alert, Container, Paper,Icon } from '@mui/material';
import TopBar from '../components/TopBar';
import AddIcon from '@mui/icons-material/Add';
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
        <Box>
        <TopBar/>
            <Container component="main" maxWidth="xs" sx={{ paddingTop: 5 }}>
            <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3,mt:3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                    <Icon sx={{ color: '#FFD700', mr: 1 }}>
                        <AddIcon/>
                    </Icon>
                    <Typography variant="h6">Schimba parola</Typography>
                </Box>
            </Paper>
                <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="oldPassword"
                        label="Parola veche"
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
                        label="Parola noua"
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
                        label="Confirma parola"
                        type="password"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Actualizeaza parola
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                </Paper>
            </Container>
        </Box>
    );
};

export default ChangePassword;
