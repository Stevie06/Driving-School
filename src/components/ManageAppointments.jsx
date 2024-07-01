import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, TextField, Box, Typography, Paper,Icon } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { supabase } from '../client';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);
    
        const fetchAppointments = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: appointmentsData, error } = await supabase
                    .from('appointments')
                    .select('*')
                    .eq('instructorid', user.id)
                    .eq('status', 'In asteptare');
    
                if (error) {
                    console.error('Error fetching appointments:', error);
                } else {
                    setAppointments(appointmentsData);
                }
            }
            setLoading(false);
        };
    
        const confirmAndHandleStatusChange = async (appointmentId, newStatus) => {
            if (window.confirm(`Sunteti sigur ca vreti sa ${newStatus} aceasta programare?`)) {
                await handleStatusChange(appointmentId, newStatus);
            }
        };
    
        const handleStatusChange = async (appointmentId, newStatus) => {
            const { error } = await supabase
                .from('appointments')
                .update({ status: newStatus })
                .match({ id: appointmentId });
    
            if (error) {
                console.error('Error updating status:', error);
            } else {
                const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
                setAppointments(updatedAppointments);
            }
        };
    
        const handleDateChange = async (appointmentId, newDate) => {
            const { error } = await supabase
                .from('appointments')
                .update({ session_date: newDate.toISOString() })
                .match({ id: appointmentId });
    
            if (error) {
                console.error('Error updating date:', error);
            } else {
                fetchAppointments();
            }
        };
    
    return (
        <Box sx={{ margin: 2 }}>
            <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                    <Icon sx={{ color: '#FFD700', mr: 1 }}>
                        <AddIcon/>
                    </Icon>
                <Typography variant="h6">Gestioneaza programarile</Typography>
                    </Box>
                </Paper>
                {loading ? (
                <Typography>Loading...</Typography>
            ) : appointments.length === 0 ? (
                <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3, textAlign: 'center' }}><Typography variant='h6'>Nu exista cereri.</Typography></Paper>
            ) : (
                appointments.map(appointment => (
                    <Box key={appointment.id} sx={{ marginBottom: 2, border: '1px solid #ccc', padding: 2 }}>
                        <Typography>Student ID: {appointment.studentid}</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Adjust Appointment Time"
                                value={dayjs(appointment.session_date)}
                                onChange={(newDate) => handleDateChange(appointment.id, newDate)}
                                slotProps={{ textField: { sx: { marginTop: '20px' } } }}
                            />
                        </LocalizationProvider>
                        <Button
                            variant="outlined"
                            onClick={() => confirmAndHandleStatusChange(appointment.id, 'Acceptat')}
                            sx={{ marginLeft: '20px', marginTop: '25px' }}
                        >
                            Accepta
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => confirmAndHandleStatusChange(appointment.id, 'Refuzat')}
                            sx={{ marginLeft: '20px', marginTop: '25px' }}
                        >
                            Refuza
                        </Button>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default ManageAppointments;