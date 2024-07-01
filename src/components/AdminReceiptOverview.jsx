import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Box, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Paper,Icon } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
const AdminReceiptsOverview = () => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredReceipts, setFilteredReceipts] = useState([]);

    useEffect(() => {
        const fetchReceipts = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('receipts')
                    .select(`
                        id,
                        amount,
                        description,
                        date,
                        student_id,
                        user:users(id, username)
                    `);

                if (error) throw error;

                setReceipts(data);
                setFilteredReceipts(data);
            } catch (error) {
                console.error('Error fetching receipts:', error.message);
            }
            setLoading(false);
        };

        fetchReceipts();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value) {
            const filtered = receipts.filter(receipt =>
                receipt.user.username.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredReceipts(filtered);
        } else {
            setFilteredReceipts(receipts);
        }
    };

    if (loading) return <CircularProgress />;
    
    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 1 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                    <Icon sx={{ color: '#FFD700', mr: 1 }}>
                        <InfoIcon/>
                    </Icon>
                    <Typography variant="h6" gutterBottom>Tabel chitante studenti</Typography>
                </Box>
            </Paper> 
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <TextField
                fullWidth
                label="Cauta student dupa nume"
                type="search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ mb: 2 }}
            />
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
                        {filteredReceipts.map((receipt) => (
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

export default AdminReceiptsOverview;
