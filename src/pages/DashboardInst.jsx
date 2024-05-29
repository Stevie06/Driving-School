import React from 'react';
import { Container, Grid } from '@mui/material';
import TopBar from '../components/TopBar';
import AddStudent from '../components/AddStudent';
import InstructorCalendar from '../components/InstructorCalendar'; 
import SessionForm from '../components/SessionForm';
const DashboardInst = ({ token }) => {
  const instructorId = token;

  
  return (
    <div>
      <TopBar onLogout={() => console.log('Logging out...')} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
          <SessionForm instructorId={instructorId} onSuccess={() => console.log('Session added!')} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InstructorCalendar />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DashboardInst;
