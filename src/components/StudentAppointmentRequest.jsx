import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import { Button, Snackbar, Alert, TextField, Paper, Typography, Box, Icon } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Programeaza from '../assets/Programeaza.jpg';
import { supabase } from '../client';
import dayjs from 'dayjs';

function StudentAppointmentRequest() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [instructorId, setInstructorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentid, setStudentId] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: {user}, error: userError } = await supabase.auth.getUser();

      if(user) {
        setStudentId(user.id);
      }
      if (userError) {
        console.error('Error fetching user data:', userError);
        setSnackbarMessage("User not authenticated.");
        setOpenSnackbar(true);
        setLoading(false);
        return;
      }
        const { data, error } = await supabase
          .from('users')
          .select('instructorid')
          .eq('id', user.id)
          .single();
        if (error) {
          console.error('Error fetching instructor ID:', error);
          setSnackbarMessage(`Error fetching instructor: ${error.message}`);
          setOpenSnackbar(true);
        } else if (data && data.instructorid) {
          setInstructorId(data.instructorid);
        } else {
          setSnackbarMessage("Instructor not assigned.");
          setOpenSnackbar(true);
        }
      
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const handleRequestSubmit = async () => {
    if (!instructorId) {
      setSnackbarMessage("Instructor ID not available.");
      setOpenSnackbar(true);
      return;
    }

    const formattedDate = selectedDate.format('YYYY-MM-DD'-'HH:mm');
    const { error } = await supabase
      .from('appointments')
      .insert([
        {
          session_date: formattedDate,
          studentid: studentid, 
          instructorid: instructorId,
          status: 'In asteptare'
        }
      ]);

    if (error) {
      setSnackbarMessage(`Error: ${error.message}`);
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage('Cerere trimisa cu succes!');
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <Paper elevation={3} sx={{
      bgcolor: '#f5f5f5',
      p: 2,
      mb: 3, 
    }}>
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
          <Icon sx={{ color: '#FFD700', mr: 1 }}>
            <EventAvailableIcon />
          </Icon>
          <Typography variant="h6" component="h2">
            Programeaza o sesiune de condus
          </Typography>
        </Box>
      </Paper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3 }}>  
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <StaticDateTimePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  orientation="landscape"
                  slots={{
                    textField: ({ inputRef, inputProps, InputProps }) => (
                      <TextField
                        {...inputProps}
                        InputProps={{ ...InputProps }}
                        ref={inputRef}
                      />
                    )
                  }}
                />
                <Button variant="contained" onClick={handleRequestSubmit} sx={{ mt: 2 }}>
                  Trimite cererea
                </Button>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                  <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
              </>
            )}
          </div>
        </Paper>
      </LocalizationProvider>
    </div>
  );
}

export default StudentAppointmentRequest;
