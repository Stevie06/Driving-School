import React, { useState, useEffect } from 'react';
import { supabase } from '../client'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const StudentSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser()
            if(user) {
                console.log('user:', user.id);
            }
            if (user) {
                const { data, error } = await supabase
                    .from('driving_sessions')
                    .select('date, duration,kilometers, kilometers_start, kilometers_end, notes_student')
                    .eq('student_id', user.id)
                    .order('date', { ascending: false });

                if (error) {
                    console.error('Error fetching sessions:', error);
                } else {
                    setSessions(data);
                }
            } else {
                console.error('No user logged in');
            }

            setLoading(false);
        };

        fetchSessions();
    }, []);

    if (loading) {
        return <Typography>Loading sessions...</Typography>;
    }

    return (
        
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Duration (minutes)</TableCell>
                        <TableCell>Kilometers Start</TableCell>
                        <TableCell>Kilometers End</TableCell>
                        <TableCell>Student Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sessions.map((session) => (
                        <TableRow key={session.id}>{console.log(sessions)}
                            <TableCell>{session.date}</TableCell>
                            <TableCell>{session.duration}</TableCell>
                            <TableCell>{session.kilometers_start}</TableCell>
                            <TableCell>{session.kilometers_end}</TableCell>
                            <TableCell>{session.notes_student}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    );
};

export default StudentSessions;
