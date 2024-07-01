import React, { useState, useEffect } from 'react';
import { supabase } from '../client'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Icon,Box } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import NotesIcon from '@mui/icons-material/Notes';
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
                    .select('date, duration,kilometers,kilometers, kilometers_start, kilometers_end, notes_student')
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
        <Box>
            <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3,width: 620 }}>
                <Box sx={{ display: 'flex', color: '#333' }}>
                    <Icon sx={{ color: '#FFD700', mr: 1 }}>
                        <DirectionsCarIcon />
                    </Icon>
                    <Typography variant="h6">Tabel Sesiuni </Typography>
                </Box>
            </Paper>
        <TableContainer component={Paper} elevation={3} sx={{ width: 650, height: 420, bgcolor: '#f5f5f5' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="subtitle2">Data</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2">Durata (minute)</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2">Kilometri</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2">Kilometri Start</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2">Kilometri Sfârșit</Typography></TableCell>
                        <TableCell><Typography variant="subtitle2">Note Student<Icon><NotesIcon /></Icon></Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>                   
                    {sessions.map((session) => (
                        <TableRow key={session.id}>{console.log(sessions)}
                            <TableCell>
                                <Typography variant="body2">{session.date}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{session.duration}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{session.kilometers}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{session.kilometers_start}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{session.kilometers_end}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{session.notes_student}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
    );
};
export default StudentSessions;
