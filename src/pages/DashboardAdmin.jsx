import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../client';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, Icon,Box, Button, Container, Paper, Breadcrumbs } from '@mui/material';
import TopBar from '../components/TopBar';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import StudentsTable from '../components/StudentsTable';
import CarCarousel from '../components/CarCarousel';
import Banner from '../components/Banner';
import morningimage from '../assets/morningimage.jpg';
import afternoonimage from '../assets/afternoonimage.jpg';
import eveningimage from '../assets/eveningimage.jpg';
import nightimage from '../assets/nightimage.jpg';

const DashboardAdmin = () => {

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
    
        
        const  [stats, setStats] = useState({
            students: 0,
            instructors: 0,
            cars:0,
        });

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const { data: userData, error: userError } = await supabase
                        .from('users')
                        .select('id, role');
                    if (userError) throw userError;
    
                    const { data: carsData, error: carsError } = await supabase
                        .from('cars')
                        .select('car_id');
                    if (carsError) throw carsError;
    
                    setStats({
                        students: userData.filter(user => user.role === 'user').length,
                        instructors: userData.filter(user => user.role === 'instructor').length,
                        cars: carsData.length,
                    });
                } catch (error) {
                    console.error('Error fetching data:', error.message);
                }
            };
    
            fetchData();
        }, []);
        const cardData = [
            {
                title: "Studenti",
                value: stats.students,
                icon: <SchoolIcon />,
                bgcolor: '#f5f5f5'
            },
            {
                title: "Instructori",
                value: stats.instructors,
                icon: <SupervisorAccountIcon />,
                bgcolor: "#e3f2fd"
            },
            {
                title: "Masini",
                value: stats.cars,
                icon: <DirectionsCarIcon />,
                bgcolor: '#f5f5f5'
            }
        ];
    
        return (
            <Box>
            <Grid >
                <TopBar/>
                <Banner
                    image={getTimeOfDay() === 'morning' ? morningimage : getTimeOfDay() === 'afternoon' ? afternoonimage : getTimeOfDay() === 'evening' ? eveningimage : nightimage}
                    title="Bine ai venit!"
                    description={'Verifica-ti programul, gestioneaza-ti programarile sau adauga sesiuni de condus!'}
                />
                <Grid container spacing={4} paddingX={3} paddingTop={4} >
                    {cardData.map((card, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card sx={{ display: 'flex', bgcolor: card.bgcolor, height: '100%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                                    {card.icon }
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 5, alignItems: 'flex-end', p: 1 }}>
                                    <Typography variant="h5" component="div">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="h4">
                                        {card.value}
                                    </Typography>
                                </Box>
                            </Card>
                    
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={2} columnGap={5} paddingTop={8} paddingX={5} alignItems="flex-start"> 
                    <StudentsTable/>
                    <CarCarousel/>  
                </Grid>
            </Grid>
        </Box>
        );
    };
    
export default DashboardAdmin;