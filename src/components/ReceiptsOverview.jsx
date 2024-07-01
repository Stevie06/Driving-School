import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Paper, LinearProgress, Icon } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
const ReceiptsOverview = () => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalReceived, setTotalReceived] = useState(0);
    const [progress, setProgress] = useState(0);
    const targetAmount = 1600;

    useEffect(() => {
        const fetchReceipts = async () => {
            setLoading(true);
            try {
                const { data: {user} } = await supabase.auth.getUser();

                const { data, error: queryError } = await supabase
                    .from('receipts')
                    .select(`id,
                        amount,
                        description,
                        date,
                        student_id,
                        user:users(id, username)`)
                    .eq('student_id', user.id);

                if (queryError) throw queryError;

                setReceipts(data);
                const total = data.reduce((acc, receipt) => acc + parseFloat(receipt.amount), 0);
                setTotalReceived(total);
                setProgress((total / targetAmount) * 100);
            } catch (error) {
                console.error('Error fetching receipts:', error.message);
                setError('Failed to fetch receipts.');
            }
            setLoading(false);
        };

        fetchReceipts();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', mt: 1 }}>
            <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                    <Icon sx={{ color: '#FFD700', mr: 1 }}>
                        <PaidIcon/>
                    </Icon>
                    <Typography variant="h6" gutterBottom>Tabel suma achitata</Typography>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Suma platita: {totalReceived.toFixed(1)} lei / {targetAmount} lei
                </Typography>
                <LinearProgress variant="determinate" value={progress} />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Student</TableCell>
                            <TableCell>Suma</TableCell>
                            <TableCell>Descriere</TableCell>
                            <TableCell>Data</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {receipts.map((receipt) => (
                            <TableRow key={receipt.id}>
                                <TableCell>{receipt.user.username}</TableCell>
                                <TableCell>{receipt.amount}</TableCell>
                                <TableCell>{receipt.description}</TableCell>
                                <TableCell>{receipt.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
};

export default ReceiptsOverview;
