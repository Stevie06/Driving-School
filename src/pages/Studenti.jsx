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
            <Grid paddingTop={2}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Paper elevation={3} sx={{ padding: 4, margin: 2, width: '500px' }}>
                            <AddStudent />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Studenti;
