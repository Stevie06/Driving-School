import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Button, TextField, Box, Typography, MenuItem, FormControl, InputLabel, Select, Snackbar, Alert, Grid, Paper,Icon } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
const getLocalDateTime = () => {
    const now = new Date();
}
const AddReceipt = () => {
    const [receipt, setReceipt] = useState({
        student_id: '',
        amount: '',
        description: '',
        date: getLocalDateTime(),
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1,width: 450 }}>
            <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3,width: 450 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                    <Icon sx={{ color: '#FFD700', mr: 1 }}>
                        <ReceiptIcon/>
                    </Icon>
                    <Typography variant="h6">Adauga chitanta noua</Typography>
                </Box>
            </Paper>
            
        <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3,width: 450 }}>
            <FormControl fullWidth margin="normal" >
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
                label="Suma"
                name="amount"
                type="number"
                value={receipt.amount}
                onChange={handleChange}
                variant='outlined'
                sx={{ mt: 2 }}
            />  
            <TextField 
                fullWidth
                label="Descriere"
                name="description"
                type="text"
                value={receipt.description}
                onChange={handleChange}
                variant='outlined'
                sx={{ mt: 2 }}
            />
            <TextField
                fullWidth
                name="date"
                type="date"
                value={receipt.date}
                onChange={handleChange}
                variant='outlined'
                sx={{ mt: 2 }}
            />
            <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
                Adauga
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" elevation={6} sx={{ width: '100%' }}>
                    Chitanta adaugata cu succes!
                </Alert>
            </Snackbar>
            </Paper>
        </Box>
    );
};

export default AddReceipt;
