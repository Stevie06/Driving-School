import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import supabase from '../client';
import AddCar from './AddCar';

const CarCarousel = () => {
    const [cars, setCars] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        const { data, error } = await supabase
        .from('cars')
        .select('*');
        if (error) console.error('Error fetching cars:', error);
        setCars(data);
    };
    return (
        <div>
            {cars.length > 0 && (
                <Card sx={{ width: 400, height: 330}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={cars[activeIndex].imageURL}
                        alt="Car image"
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {cars[activeIndex].make} {cars[activeIndex].model}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Year: {cars[activeIndex].year}
                            <br />
                            Kilometers: {cars[activeIndex].kilometers}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Instructor: {cars[activeIndex].instructor_id}
                        </Typography>
                    </CardContent>
                    <IconButton onClick={() => setActiveIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : cars.length - 1)}>
                        <ArrowBackIos />
                    </IconButton>
                    <IconButton onClick={() => setActiveIndex((prevIndex) => prevIndex < cars.length - 1 ? prevIndex + 1 : 0)}>
                        <ArrowForwardIos />
                    </IconButton>
                </Card>
            )}
        </div>
    );
};

export default CarCarousel;