import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const SessionList = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        fetchSessions();
    }, []);

    
    const fetchSessions = async () => {
        const { data, error } = await supabase
            .from('driving_sessions')
            .select('*')
            .order('date', { ascending: false });

        

        if (error) {
            console.error("Error fetching sessions:", error.message);
        } else {
            setSessions(data);
        }
    };

    return (
        <Box>
            <Typography variant="h6">Completed Driving Sessions</Typography>
            <List>
                {sessions.map(session => (
                    <ListItem key={session.id}>
                        <ListItemText 
                            primary={`Date: ${session.date}`}
                            secondary={`Duration: ${session.duration} minutes, Kilometers Driven: ${session.kilometers_end - session.kilometers_start}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default SessionList;
