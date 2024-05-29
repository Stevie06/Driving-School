import React,{useState, useEffect} from "react";
import {supabase} from "../client";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import TopBar from "../components/TopBar";
import AddInstructor from "../components/AddInstructor";

const Instructori = () => {
    const navigate = useNavigate();
const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
}
    return(
        <div>
        <TopBar handleLogout={handleLogout} />
        <Container sx={{ display: 'flex', paddingTop: '64px' }}>
            <AddInstructor/>
        </Container>
        </div>
    )

    }
export default Studenti;