import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Tooltip, Popover, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import supabase from '../client';

const StudentsTable = () => {
    const [users, setUsers] = useState([]);
    const [instructors, setInstructors] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'ascending' });

    useEffect(() => {
        fetchUsersAndInstructors();
    }, []);

    const fetchUsersAndInstructors = async () => {
        const { data: usersData, error: usersError } = await supabase.from('users').select('*');
        if (usersError) {
            console.error('Error fetching users:', usersError);
            return;
        }

        const instructorMap = {};
        usersData.forEach(user => {
            if (user.role === 'instructor') {
                instructorMap[user.id] = user.username;
            }
        });

        setInstructors(instructorMap);
        setUsers(usersData.filter(user => user.role === 'user'));
    };

    const handleSearchClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSearchClose = () => {
        setAnchorEl(null);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value.toLowerCase());
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = () => {
        let sortableUsers = users.filter(user => user.username.toLowerCase().includes(search));
        sortableUsers.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        return sortableUsers;
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <TableContainer component={Paper} elevation={3} sx={{ maxWidth:880 }}>
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Tooltip title="Search by name">
                                <IconButton onClick={handleSearchClick}>
                                    <SearchIcon />
                                </IconButton>
                            </Tooltip>
                            Nume
                            <IconButton onClick={() => handleSort('username')}>
                                {sortConfig.key === 'username' && sortConfig.direction === 'ascending' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Telefon</TableCell>
                        <TableCell>Instructor</TableCell>
                        <TableCell>
                            Sesiuni Complete
                            <IconButton onClick={() => handleSort('sessioncount')}>
                                {sortConfig.key === 'sessioncount' && sortConfig.direction === 'ascending' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedUsers().map((user) => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{instructors[user.instructorid] || 'Unassigned'}</TableCell>
                            <TableCell>{user.sessioncount || 0}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleSearchClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <TextField
                    autoFocus
                    margin="normal"
                    label="Search Names"
                    type="text"
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                />
            </Popover>
        </TableContainer>
    );
};

export default StudentsTable;
