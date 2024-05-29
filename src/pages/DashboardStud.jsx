import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import TopBar from '../components/TopBar';
import StudentDatePicker from '../components/StudentDatePicker'; 

const DashboardStud = () => {
  const handleDateTimeSelect = (dateTime) => {
    console.log('Selected DateTime:', dateTime.toISOString());
    // Check availability and schedule the session
  };

  return (
    <div>
      <TopBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome student
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ length: 500, p: 2, display: 'flex', flexDirection: 'column', height: 240, justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h6">Schedule your driving session</Typography>
                            <StudentDatePicker />  
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h6">Daily questions</Typography>
                            {/* Placeholder or actual component for daily questions */}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
    </div>
  );
};

export default DashboardStud;
