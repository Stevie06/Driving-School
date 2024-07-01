import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Tooltip } from '@mui/material';
import { differenceInYears, parseISO } from 'date-fns';
import supabase from '../client';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const StudentsTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('role', 'user'); 
            
            if (error) {
                console.error('Error fetching users:', error);
            } else {
                setUsers(data);
            }
        };

        fetchUsers();
    }, []);

    return (
        <TableContainer component={Paper} elevation={3} sx={{ width: '850px', maxHeight: 500, bgcolor: 'background.paper' }}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell>Nume <PersonIcon sx={{ verticalAlign: 'middle', ml: 1 }} /></TableCell>
                        <TableCell align="right">Email <EmailIcon sx={{ verticalAlign: 'middle', ml: 1 }} /></TableCell>
                        <TableCell align="right">Telefon <PhoneIcon sx={{ verticalAlign: 'middle', ml: 1 }} /></TableCell>
                        <TableCell align="right">Sesiuni Complete <EventAvailableIcon sx={{ verticalAlign: 'middle', ml: 1 }} /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f4f4f4' } }}
                        >
                            <TableCell component="th" scope="row">
                                {user.username}
                            </TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.phone}</TableCell>
                            <TableCell align="right">{user.sessioncount || 0}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StudentsTable;
