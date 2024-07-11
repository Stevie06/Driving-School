import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Button, TextField, Typography, Box, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel, Paper, Icon } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const AddStudent = () => {
    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    });
    const initialStudentData = ({
        username: '',
        cnp: '',
        phone: '',
        address: '',
        instructorid: ''
    });
    const [instructors, setInstructors] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [studentData, setStudentData] = useState(initialStudentData);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    useEffect(() => {
        const fetchInstructors = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('id, username')
                .eq('role', 'instructor');

            if (error) {
                console.error('Error fetching instructors:', error);
            } else if (data) {
                console.log('Fetched instructors:', data); 
                setInstructors(data);
            }
        };

        fetchInstructors();
    }, []);

    const handleChangeAuth = (event) => {
        setAuthData({
            ...authData,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeStudent = (event) => {
        setStudentData({
            ...studentData,
            [event.target.name]: event.target.value
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data: { user }, error: authError } = await supabase.auth.signUp({
            email: authData.email,
            password: authData.password
        });

        if (authError) {
            setMessage(`Error adding student: ${authError.message}`);
            setOpen(true);
            return;
        }

        if (user) {
            const { error } = await supabase
                .from('users')
                .update({
                    ...studentData,
                    instructorid: studentData.instructorid,
                })
                .eq('id', user.id); 

            if (error) {
                setSnackbarMessage(`Update Error: ${error.message}`);
                setOpen(true);
            } else {
                setSnackbarMessage('Student adaugat cu succes!');
                setStudentData(initialStudentData);
                setOpen(true);
            }
        }
    };

    return (
        <Box sx={{  display:'grid',justifyContent: 'center', alignItems: 'center',mt: 5 }}>
           <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3,maxWidth: 550 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                    <Icon sx={{ color: '#FFD700', mr: 1 }}>
                        <PersonAddIcon/>
                    </Icon>
                    <Typography variant="h6">Adauga student</Typography>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3, maxWidth: 550 }}>
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
                type="password"
                value={authData.password}
                onChange={handleChangeAuth}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Nume"
                name="username"
                value={studentData.name}
                onChange={handleChangeStudent}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="CNP"
                name="cnp"
                value={studentData.cnp}
                onChange={handleChangeStudent}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Numar de telefon"
                name="phone"
                value={studentData.phone}
                onChange={handleChangeStudent}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Adresa"
                name="address"
                value={studentData.address}
                onChange={handleChangeStudent}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="instructor-label">Instructor</InputLabel>
                <Select
                    labelId="instructor-label"
                    id="instructor-select"
                    value={studentData.instructorid}
                    label="Instructor"
                    onChange={(e) => handleChangeStudent({ target: { name: 'instructorid', value: e.target.value } })}
                >
                    {instructors.map((instructor) => (
                        <MenuItem key={instructor.id} value={instructor.id}>{instructor.username}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                type="submit"
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Adauga Student
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" elevation={6} sx={{ width: '100%' ,alignSelf: 'center'}}>
                    Student adaugat cu succes!
                </Alert>
            </Snackbar>
        </Paper>
        </Box>
    );
};

export default AddStudent;