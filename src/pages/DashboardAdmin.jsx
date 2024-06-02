import React from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../client';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import TopBar from '../components/TopBar';
import instructorBackground from '../assets/instructor-background.jpg';
import studentBackground from '../assets/student-background.jpg';
import receiptBackground from '../assets/receipt-background.jpg';
    const DashboardAdmin = () => {
        
    const navigate = useNavigate();


    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };
  return (
    <div>
    <TopBar />
        <Grid container spacing={2} style={{ padding: 20 }}>
        <Grid item xs={4} sm={4} md={4}>
            <Card sx={{ maxWidth: 500 }}>
            <CardActionArea onClick={() => navigate('/Studenti')}>
                <CardMedia
                component="img"
                height="300"
                image={studentBackground}
                alt="Manage Students"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Student Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Add or manage student profiles.
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
            <Card sx={{ maxWidth: 500 }}>
            <CardActionArea onClick={() => navigate('/Instructori')}>
                <CardMedia
                component="img"
                image={instructorBackground}
                height="300"
                alt="Manage Instructors"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Instructor Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Add or manage instructor details.
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActionArea onClick={() => navigate('/Instructori')}>
            </CardActionArea>
            </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
            <Card sx={{ maxWidth: 500 }}>
            <CardActionArea onClick={() => navigate('/Receipts')}>
                <CardMedia
                component="img"
                image={receiptBackground}
                height="300"
                alt="Manage Receipts"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Receipt Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Add or manage receipt details.
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActionArea onClick={() => navigate('/Receipts')}>
            </CardActionArea>
        </Card>
      </Grid>
    </Grid>
    </div>
  );
};

export default DashboardAdmin;
