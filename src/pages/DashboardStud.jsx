import React from 'react';
import { Container, Typography, Grid, Paper ,Button, Link, Box} from '@mui/material';
import TopBar from '../components/TopBar';
import QuizComponent from '../components/QuizComponent';
import StudentAppointmentRequest from '../components/StudentAppointmentRequest';
import StudentSessions from '../components/StudentsSessions';
import UpcomingSessions from '../components/UpcomingSessions';
import QuizHistory from '../components/QuizHistory';
import Banner from '../components/Banner';
import morningimage from '../assets/morningimage.jpg';
import afternoonimage from '../assets/afternoonimage.jpg';
import eveningimage from '../assets/eveningimage.jpg';
import nightimage from '../assets/nightimage.jpg';
const DashboardStud = () => {
  const getTimeOfDay = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 5 && hours < 12) {
      return 'morning';
    } else if (hours >= 12 && hours < 18) {
      return 'afternoon';
    } else if (hours >= 18 && hours < 22) {
      return 'evening';
    } else {
      return 'night';
    }
  };


  return (
    <div>
      <TopBar />
      <Banner
          image={getTimeOfDay() === 'morning' ? morningimage : getTimeOfDay() === 'afternoon' ? afternoonimage : getTimeOfDay() === 'evening' ? eveningimage : nightimage}
          title="Bine ai venit!"
          description={'Verifica-ti programul, gestioneaza-ti programarile sau adauga sesiuni de condus!'}
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
