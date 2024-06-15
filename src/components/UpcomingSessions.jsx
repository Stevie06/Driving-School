import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { supabase } from '../client';

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
                .eq('studentid', user.id).or('eq', 'instructorid',user.id)
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
        <Box sx={{ margin: 2 }}>
            <Typography variant="h6">Upcoming Driving Sessions</Typography>
            {sessions.length === 0 ? (
                <Typography>No upcoming sessions.</Typography>
            ) : (
                sessions.map((session) => (
                    <Box key={session.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 2 }}>
                        <Typography>Date: {new Date(session.session_date).toLocaleString()}</Typography>
                        <Typography>Status: {session.status}</Typography>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default UpcomingSessions;
