import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Box,Icon } from '@mui/material';
import { supabase } from '../client';
import InfoIcon from '@mui/icons-material/Info';
import { set } from 'date-fns';
import { Margin } from '@mui/icons-material';

const QuizHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchQuizHistory = async () => {
            setLoading(true);
            const { data: {user}, error: userError } = await supabase.auth.getUser();
            
            if (userError || !user) {
                setError("Unable to authenticate user.");
                setLoading(false);
                return;
            }
            const { data: userDetails, error: detailsError } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single();

        if (detailsError) {
            setError("Error fetching user role.");
            setLoading(false);
            return;
        }

        try {
            if (userDetails.role === 'user') {
                const { data, error } = await supabase
                    .from('quiz_history')
                    .select('*')
                    .eq('student_id', user.id);
                if (error) throw error;
                    setHistory(data);
                } 
                } catch (error) {
                console.error('Error fetching quiz history:', error.message);
                setError(error.message);
            }
            setLoading(false);
        };

        fetchQuizHistory();
    }, []);

    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{margin: 2}} >
        <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3,width: 650 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                <Icon sx={{ color: '#FFD700', mr: 1 }}>
                    <InfoIcon/>
                </Icon>
                <Typography variant="h6">Istoric Chestionare</Typography>
            </Box>
        </Paper>
        <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3,width: 650, height: 300 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell>Numar Raspunsuri Corecte</TableCell>
                        <TableCell>Numar Intrebari Totale</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.map((record) => (
                        <TableRow key={record.id}>
                            <TableCell>{record.date_taken}</TableCell>
                            <TableCell>{record.correct_answers}</TableCell>
                            <TableCell>{record.total_questions}</TableCell>
                            <TableCell>{record.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </Box>
        </Paper>
    </Box>
    );
};

export default QuizHistory;
