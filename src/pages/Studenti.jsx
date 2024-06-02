import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Paper } from "@mui/material";
import AddStudent from "../components/AddStudent";
import TopBar from "../components/TopBar";

const Studenti = () => {
    const navigate = useNavigate();

    return (
        <div>
            <TopBar />
            <Container sx={{
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center',    
                justifyContent: 'center', 
                height: 'calc(100vh - 64px)', 
                paddingTop: '64px'
            }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Paper elevation={3} sx={{ padding: 4, margin: 2, width: '500px' }}>
                            <AddStudent />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Studenti;
