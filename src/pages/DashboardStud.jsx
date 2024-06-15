import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import TopBar from '../components/TopBar';
import QuizComponent from '../components/QuizComponent';
import StudentAppointmentRequest from '../components/StudentAppointmentRequest';
import StudentSessions from '../components/StudentsSessions';
import UpcomingSessions from '../components/UpcomingSessions';
const DashboardStud = () => {

  return (
    <div style={{
      backgroundImage: `url(${'/assets/road.jpg'})`,
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat', 
      minHeight: '100vh',
      width: '100%'
    }}>
      <TopBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <StudentAppointmentRequest />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StudentSessions /> 
                    <UpcomingSessions />
                  </Grid>
                </Grid>
            </Container>
    </div>
  );
};

export default DashboardStud;
