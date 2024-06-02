import React, { useState } from 'react';
import { supabase } from '../client';
import { Button, TextField, Typography, Container, Paper, Grid, Box, Snackbar, Alert } from '@mui/material';
import { RollerShades } from '@mui/icons-material';

const AddInstructor = () => {
    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    });

    const [InstructorData, setInstructorData] = useState({
        username: '',
        cnp: '',
        phone: '',
        address: ''
    });

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const handleChangeAuth = (event) => {
        setAuthData({
            ...authData,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeInstructor = (event) => {
        setInstructorData({
            ...InstructorData,
            [event.target.name]: event.target.value
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data:{user}, error: authError } = await supabase.auth.signUp({
            email: authData.email,
            password: authData.password
        });

        if (authError) {
            alert('Error adding Instructor: ' + authError.message);
            return;
        }

        if (user) {
            const { data, error } = await supabase
                .from('users')
                .update({
                    username: InstructorData.username,
                    cnp: InstructorData.cnp,
                    phone: InstructorData.phone,
                    address: InstructorData.address,
                    //role: 'instructor',
                })
                .eq('id', user.id); 
    
            if (error) {
                setMessage(`Update Error: ${error.message}`);
                setOpen(true);
            } else {
                setMessage('Instructor details updated successfully!');
                setOpen(true);
            }
        }else {
            setOpen(true);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h6">Adauga Instructor</Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                value={authData.email}
                onChange={handleChangeAuth}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Parola"
                name="password"
                value={authData.password}
                onChange={handleChangeAuth}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Nume"
                name="username"
                value={InstructorData.name}
                onChange={handleChangeInstructor}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="CNP"
                name="cnp"
                value={InstructorData.cnp}
                onChange={handleChangeInstructor}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Numar de telefon"
                name="phone"
                value={InstructorData.phone}
                onChange={handleChangeInstructor}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Adresa"
                name="address"
                value={InstructorData.address}
                onChange={handleChangeInstructor}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Adauga Instructor
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" elevation={6} sx={{ width: '100%' }}>
                    Instructor added successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddInstructor;
