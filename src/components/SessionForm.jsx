import React, { useState } from 'react';
import { supabase } from '../client';
import { Button, TextField, Typography, Box } from '@mui/material';

const SessionForm = ({ instructorId, onSuccess }) => {
    const [sessionData, setSessionData] = useState({
        date: '',
        duration: '',
        kilometers_driven: '',
        notes: ''  
    });

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
            .insert([{
            ...sessionData,
            instructor_id: instructorId
        }]);

        if (error) {
            alert('Error adding session: ' + error.message);
        } else {
            alert('Session added successfully!');
            onSuccess();
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h6">Add Driving Session</Typography>
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
                name="kilometers_driven"
                label="Kilometers Driven"
                type="number"
                value={sessionData.kilometers_driven}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                required
                name="notes"
                label="Notes"
                multiline
                rows={4}
                value={sessionData.notes}
                onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Submit
            </Button>
        </Box>
    );
};

export default SessionForm;
