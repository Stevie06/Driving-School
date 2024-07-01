import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const Banner = ({ image, title, description }) => {
    return (
        <Paper
            sx={{
                position: 'relative',
                color: '#fff',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: 2
            }}
        >
            <Typography variant="h4" component="h1" sx={{ textShadow: '1px 1px 2px black' }}>
                {title}
            </Typography>
            <Typography variant="subtitle1" sx={{ textShadow: '1px 1px 2px black' }}>
                {description}
            </Typography>
        </Paper>
    );
};

export default Banner;
