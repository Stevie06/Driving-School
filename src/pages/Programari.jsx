import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { Container, Grid, Typography, Paper } from "@mui/material";

const Programari = () => {
    const navigate = useNavigate();
    return (
        <div>
            <TopBar />
            <Container sx={{ display: 'flex', paddingTop: '64px', height: 'calc(100vh - 64px)', alignItems: 'stretch' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <StudentDatePicker />
                    </Grid>
                    <Grid item xs={12} md={6}>

                    </Grid>
                </Grid>
            </Container>
        </div>
    )

}

export default Programari