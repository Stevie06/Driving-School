import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { differenceInYears, parseISO } from 'date-fns';
import supabase from '../client';

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
        <TableContainer component={Paper} sx={{ width: 950,maxHeight: 500 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">Sessions Completed</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{user.username}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.phone}</TableCell>
                            <TableCell align="right">{user.sessionCount || 0}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default StudentsTable;
