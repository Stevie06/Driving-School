import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Paper } from "@mui/material";
import AddStudent from "../components/AddStudent";
import TopBar from "../components/TopBar";
import {supabase} from "../client";
import studentBackground from "../assets/student-background.jpg";
const Studenti = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div>
            <TopBar handleLogout={handleLogout} />
            <Container sx={{ display: 'flex', paddingTop: '64px', height: 'calc(100vh - 64px)', alignItems: 'stretch' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <AddStudent />
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Paper sx={{ 
                            width: '100%', 
                            height: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: 'gray',
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center' 
                        }}>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Studenti;
