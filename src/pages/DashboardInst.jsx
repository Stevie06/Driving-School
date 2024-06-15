import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import TopBar from '../components/TopBar';
import AddStudent from '../components/AddStudent'; 
import SessionForm from '../components/SessionForm';
import StudentsTable from '../components/StudentsTable';
import StudentAppointmentRequest from '../components/StudentAppointmentRequest';
import ManageAppointments from '../components/ManageAppointments';
import { Upcoming } from '@mui/icons-material';
import UpcomingSessions from '../components/UpcomingSessions';

const DashboardInst = ({ token }) => {
  const instructorId = token;

  return (
    <Box>
      <div>
        <TopBar />
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
