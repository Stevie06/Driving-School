import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { Box, Grid } from "@mui/material";
import ReviewInstructor from "../components/ReviewInstructor";

const Reports = () => {
    const navigate = useNavigate();

    return(
        <Box sx={{ flexGrow: 1 }}>
        <TopBar/>
        <ReviewInstructor/>
        </Box>
    )

}

export default Reports;