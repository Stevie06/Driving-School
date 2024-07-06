import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import TopBar from '../components/TopBar';

const AboutUs = () => {
    const position = [45.45249,28.03545]; 

    return (
        <Box>
        <TopBar/>
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom paddingTop={2}>
                Despre noi
            </Typography>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
                <Typography variant="h6" component="h2">
                    ȘCOALA AUTO ADELANTE
                </Typography>
                <Typography paragraph>
                    Cu o tradiție de peste 20 de ani școala Auto „Adelante” vei învață regulile de circulație, tehnicile de conducere și caracteristicile vehiculului, dar și despre siguranță la volan și respectarea mediului.
                </Typography>
                <Typography paragraph>
                    Fie că este vorba de categoria B, C, CE, D te vom îndruma pentru a atinge scopul final cu succes, carnetul auto
                </Typography>
            </Paper>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" component="h2">
                    Informatii contact
                </Typography>
                <Typography paragraph>
                    Email: adelante@yahoo.com
                </Typography>
                <Typography paragraph>
                    Contact Telefonic:
                    0770201553 / 0744804946
                </Typography>
                <Typography paragraph>
                    Bulevardul George Coșbuc 292,
                    Galați 800552
                </Typography>
            </Paper>
            <Box sx={{ height: 300,width:800, marginTop: 2 }}>
                <MapContainer center={position} zoom={17} scrollWheelZoom={false} style={{ height: "100%", width: "100%" ,justifyContent: 'center', alignItems: 'center'}}>
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
    </Box>
    );
};

export default AboutUs;
