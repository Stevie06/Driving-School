import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Paper, Box } from "@mui/material";
import TopBar from "../components/TopBar";
import SessionForm from "../components/SessionForm";
import SessionList from "../components/SessionList";
const Sesiune_condus = () => {
    const navigate = useNavigate();

    return (
        <div>
            <TopBar />
            <Container sx={{ display: 'flex',paddingTop:'32px',  alignItems: 'stretch' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <SessionForm />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SessionList />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Sesiune_condus;
