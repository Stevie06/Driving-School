import React from 'react';
import { Container, Typography, Grid, Paper ,Button, Link, Box} from '@mui/material';
import TopBar from '../components/TopBar';
import QuizComponent from '../components/QuizComponent';
import StudentAppointmentRequest from '../components/StudentAppointmentRequest';
import StudentSessions from '../components/StudentsSessions';
import UpcomingSessions from '../components/UpcomingSessions';
import QuizHistory from '../components/QuizHistory';
import AdminBanner from '../assets/student-background.jpg';
import Banner from '../components/Banner';

const DashboardStud = () => {

  return (
    <div>
      <TopBar />
      <Banner paddingTop={10} 
              image={AdminBanner}
              title={"Bine ai revenit !"}
              description={"Programeaza-ti sesiuni de condus sau verifica-ti cunostiintele cu un chestionar !"}
              />
      <Container sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6}>
                    <StudentAppointmentRequest />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StudentSessions />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <UpcomingSessions />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <QuizHistory />
                  </Grid>
                </Grid>
            </Container>
    </div>
  );
};

export default DashboardStud;
