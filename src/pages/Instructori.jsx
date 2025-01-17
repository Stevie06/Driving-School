import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Paper } from "@mui/material";
import AddInstructor from "../components/AddInstructor";
import TopBar from "../components/TopBar";

const Instructori = () => {
    const navigate = useNavigate();

    return (
        <div>
            <TopBar />
            <Container sx={{ display: 'flex', paddingTop: '64px', height: 'calc(100vh - 64px)', alignItems: 'stretch' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <AddInstructor />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
export default Instructori;
