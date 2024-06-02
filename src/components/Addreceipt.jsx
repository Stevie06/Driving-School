import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Button, TextField, Box, Typography, MenuItem, FormControl, InputLabel, Select, Snackbar, Alert, Grid } from '@mui/material';

const AddReceipt = () => {
    const [receipt, setReceipt] = useState({
        student_id: '',
        amount: '',
        description: '',
        notes: ''
    });
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        let { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('role', 'user');

        if (error) console.log('Error fetching users', error);
        else setUsers(users);
    };

    const handleChange = (e) => {
        setReceipt({ ...receipt, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('receipts')
            .insert([receipt]);

            if (error) {
                setMessage(`Update Error: ${error.message}`);
                setOpen(true);
            } else {
                setMessage('Chitanta adaugata cu succes!');
                setOpen(true);
            }
        };
    

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 6,width:500 }}>
            <Grid container spacing={2}>
            <Typography variant="h6">Add New Receipt</Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel id="student-label">Student</InputLabel>
                <Select
                    labelId="student-label"
                    name="student_id"
                    value={receipt.student_id}
                    label="Student"
                    onChange={handleChange}
                >
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.username + ' - ' + user.cnp} 
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={receipt.amount}
                onChange={handleChange}
                variant='outlined'
            />
            <InputLabel id="description-label">Tip plata</InputLabel>
            <Select
                fullWidth
                labelId="description-label"
                name="description"
                value={receipt.description}
                label="Description"
                onChange={handleChange}
                variant='outlined'
                >
                <MenuItem value='Plata partiala'>Plata partiala</MenuItem>
               <MenuItem value='Plata totala'>Plata totala</MenuItem>
            </Select>
            <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
                Submit
            </Button>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" elevation={6} sx={{ width: '100%' }}>
                    Student added successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddReceipt;
