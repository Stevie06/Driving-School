import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Box, Typography, List, ListItem, ListItemText, Paper, Icon, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
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
        <Box sx={{ mt: 1,width: 530 }}>
            <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                <Icon sx={{ color: '#FFD700', mr: 1 }}>
                    <CheckIcon/>
                </Icon>
                <Typography variant="h6">Sesiuni de condus finalizate</Typography>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3,overflow:'auto',maxHeight: 777 }}>
            <List>
                {sessions.map(session => (
                    <ListItem key={session.id}>
                        <ListItemText 
                            primary={`Data: ${session.date}`}
                            secondary={`Durata: ${session.duration} minute, Kilometri Condusi: ${session.kilometers_end - session.kilometers_start}`}

                        />
                    </ListItem>
                ))}
            </List>
            </Paper>
        </Box>
    );
};

export default SessionList;
