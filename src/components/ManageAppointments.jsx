import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, TextField, Box, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { supabase } from '../client';
import dayjs from 'dayjs';

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
           
        const { data: { user } } = await supabase.auth.getUser()
            const { data: appointmentsData, error } = await supabase
                .from('appointments')
                .select('*')
                .eq('instructorid', user.id);

            if (error) {
                console.error('Error fetching appointments:', error);
            } else {
                setAppointments(appointmentsData);
            }
            setLoading(false);
        };

        fetchAppointments();
    }, []);

    const handleStatusChange = async (appointmentId, newStatus) => {
        const { error } = await supabase
            .from('appointments')
            .update({ status: newStatus })
            .match({ id: appointmentId });

        if (error) {
            console.error('Error updating status:', error);
        } 
    };

    const handleDateChange = async (appointmentId, newDate) => {
        const { error } = await supabase
            .from('appointments')
            .update({ session_date: newDate.toISOString() })
            .match({ id: appointmentId });

        if (error) {
            console.error('Error updating date:', error);
        } 
    };

    return (
        <Box sx={{ margin: 2 }}>
            <Typography variant="h6">Manage Appointments</Typography>
            {loading ? (
                <p>Loading...</p>
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
                            onClick={() => handleStatusChange(appointment.id, 'accepted')}
                            sx={{ marginLeft: '20px', marginTop: '25px' }}
                        >
                            Accept
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleStatusChange(appointment.id, 'denied')}
                            sx={{ marginLeft: '20px', marginTop: '25px' }}
                        >
                            Deny
                        </Button>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default ManageAppointments;