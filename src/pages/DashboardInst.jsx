import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import TopBar from '../components/TopBar';
import SessionForm from '../components/SessionForm';
import ManageAppointments from '../components/ManageAppointments';
import UpcomingSessions from '../components/UpcomingSessions';
import Banner from '../components/Banner';
import morningimage from '../assets/morningimage.jpg';
import afternoonimage from '../assets/afternoonimage.jpg';
import eveningimage from '../assets/eveningimage.jpg';
import nightimage from '../assets/nightimage.jpg';
const DashboardInst = ({ token }) => {
  const instructorId = token;

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
    <Box>
      <div>
        <TopBar />
        <Banner
          image={getTimeOfDay() === 'morning' ? morningimage : getTimeOfDay() === 'afternoon' ? afternoonimage : getTimeOfDay() === 'evening' ? eveningimage : nightimage}
          title="Bine ai venit!"
          description={'Verifica-ti programul, gestioneaza-ti programarile sau adauga sesiuni de condus!'}
          />
        <Container sx={{ display: 'flex', paddingTop: '64px', height: 'calc(100vh - 64px)', alignItems: 'stretch' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SessionForm instructorId={instructorId} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ManageAppointments />
              <UpcomingSessions/>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Box>
  );
};

export default DashboardInst;
