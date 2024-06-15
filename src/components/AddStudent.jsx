import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Button, TextField, Typography, Box, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const AddStudent = () => {
    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    });
    const [studentData, setStudentData] = useState({
        username: '',
        cnp: '',
        phone: '',
        address: '',
        //Dateofbirth: '',
        instructorid: ''
    });
    const [instructors, setInstructors] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

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
                setMessage(`Update Error: ${error.message}`);
                setOpen(true);
            } else {
                setMessage('Student details updated successfully!');
                setOpen(true);
            }
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h6">Adauga Student</Typography>
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
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Adauga Student
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" elevation={6} sx={{ width: '100%' ,alignSelf: 'center'}}>
                    Student added successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddStudent;