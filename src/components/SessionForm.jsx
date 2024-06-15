import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Button, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Paper,Icon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const SessionForm = ({ onSuccess }) => {
    const getLocalDateTime = () => {
        const now = new Date();
        const localTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
        return localTime.slice(0, 16);
    };
    const [sessionData, setSessionData] = useState({ 
        student_id: '',
        date: getLocalDateTime(),
        duration: '',
        kilometers_start: '',
        kilometers_end: '',
        notes_student: '',
        notes_instructor: ''
    });
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const { data: users, error } = await supabase
            .from('users')
            .select('id, username')
            .eq('role', 'user');

        if (error) {
            console.error('Error fetching students:', error);
        } else {
            setStudents(users);
        }
    };

    const handleChange = (event) => {
        setSessionData({
            ...sessionData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from('driving_sessions')
            .insert([sessionData]);

        if (error) {
            alert('Error adding session: ' + error.message);
        } else {
            alert('Session added successfully!');
            if (onSuccess) onSuccess();
        }
    };

    return (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: 530 }}>
                <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                        <Icon sx={{ color: '#FFD700', mr: 1 }}>
                            <AddIcon/>
                        </Icon>
                        <Typography variant="h6">Add Driving Session</Typography>
                    </Box>
                </Paper>
                <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3 }}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="student-label">Student</InputLabel>
                    <Select
                        labelId="student-label"
                        name="student_id"
                        value={sessionData.student_id}
                        onChange={handleChange}
                    >
                        {students.map((student) => (
                            <MenuItem key={student.id} value={student.id}>
                                {student.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="date"
                    label="Session Date"
                    type="datetime-local"
                    value={sessionData.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="duration"
                    label="Duration (in minutes)"
                    type="number"
                    value={sessionData.duration}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="kilometers_start"
                    label="Kilometers Start"
                    type="number"
                    value={sessionData.kilometers_start}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="kilometers_end"
                    label="Kilometers End"
                    type="number"
                    value={sessionData.kilometers_end}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="notes_instructor"
                    label="Notes Instructor"
                    multiline
                    rows={4}
                    value={sessionData.notes_instructor}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="notes_student"
                    label="Notes Student"
                    multiline
                    rows={4}
                    value={sessionData.notes_student}
                    onChange={handleChange}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb:2 }}>
                    Submit
                </Button>
                </Paper>
            </Box>
    );
};

export default SessionForm;
