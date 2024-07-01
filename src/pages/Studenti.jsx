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
            <Container>
                <AddStudent />
            </Container>
        </div>
    );
};

export default Studenti;
