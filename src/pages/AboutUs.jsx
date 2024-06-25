import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const AboutUs = () => {
    const position = [51.505, -0.09]; // Replace with your company's coordinates

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                About Us
            </Typography>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
                <Typography variant="h6" component="h2">
                    Our Story
                </Typography>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
                <Typography paragraph>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </Paper>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" component="h2">
                    Contact Information
                </Typography>
                <Typography paragraph>
                    Email: contact@ourcompany.com
                </Typography>
                <Typography paragraph>
                    Phone: +1234567890
                </Typography>
                <Typography paragraph>
                    Address: 1234 Street, City, Country
                </Typography>
            </Paper>
            <Box sx={{ height: 400, marginTop: 2 }}>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>
                            Our Company is located here. <br /> Visit us!
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>
        </Container>
    );
};

export default AboutUs;
