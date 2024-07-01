import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Paper,Icon } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; 
import { supabase } from '../client';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
const UpcomingSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            const { data: {user} } = await supabase.auth.getUser();
            if (!user) {
                console.error('User not authenticated');
                return;
            }

            const { data: sessionsData, error } = await supabase
                .from('appointments')
                .select('*')
                .or(`studentid.eq.${user.id},instructorid.eq.${user.id}`)
                .gte('session_date', new Date().toISOString()) 
                .order('session_date', { ascending: true });

            if (error) {
                console.error('Error fetching sessions:', error);
            } else {
                setSessions(sessionsData);
            }

            setLoading(false);
        };

        fetchSessions();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ margin: 2,maxHeight: 500 }}>
                <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                        <Icon sx={{ color: '#FFD700', mr: 1 }}>
                            <CalendarTodayIcon />
                        </Icon>
                        <Typography variant="h6">Sesiuni viitoare</Typography>
                    </Box>
                </Paper>
                <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3 }}>
                {sessions.length === 0 ? (
                <Typography>Nu sunt sesiuni viitoare.</Typography>
                ) : (
                sessions.map((session) => (
                    <Box key={session.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 2 }}>
                        <Typography>Date: {new Date(session.session_date).toLocaleString()}</Typography>
                        <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                            Status: {session.status}
                                {session.status === 'Acceptat' ? (
                                <CheckCircleIcon sx={{ color: 'green', ml: 1 }} />
                                ) : session.status === 'Refuzat' ? (
                                <CancelIcon sx={{ color: 'red', ml: 1 }} />
                                ) : null}
                                {session.status === 'In asteptare' ? (
                                <QuestionMarkIcon sx={{ color: 'orange', ml: 1 }}/>
                                ) : null}
                        </Typography>
                    </Box>
                ))
                )}
            </Paper>
        </Box>
    );
};

export default UpcomingSessions;
