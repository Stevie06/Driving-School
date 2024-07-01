import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import supabase from '../client';

const CarCarousel = () => {
    const [cars, setCars] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        const { data: carsData, error } = await supabase
            .from('cars')
            .select('*');
        if (error) {
            console.error('Error fetching cars:', error);
            return;
        }

        const carsWithImages = await Promise.all(carsData.map(async car => {
            const { publicURL, error: urlError } = supabase
                .storage
                .from('cars-images')
                .getPublicUrl(car.image_url);

            if (urlError) {
                console.error('Error fetching car image:', urlError);
                return { ...car, imageURL: '/path/to/default/image.jpg' };  
            }

            return { ...car, imageURL: publicURL };
        }));

        setCars(carsWithImages);
    };

    return (
        <div>
            {cars.length > 0 && (
                <Card sx={{ width: 400, height: 330}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={cars[activeIndex].imageURL}
                        alt={`Image of ${cars[activeIndex].make} ${cars[activeIndex].model}`}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {cars[activeIndex].make} {cars[activeIndex].model}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            An fabricatie: {cars[activeIndex].year}
                            <br />
                            Kilometri: {cars[activeIndex].kilometers}
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
