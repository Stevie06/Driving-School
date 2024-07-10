import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import SessionDurationHistogram from "../components/SessionDurationHistogram";
import { Grid } from "@mui/material";
import QuizStatusChart from "../components/QuizStatusChart";
import InstructorRatingsChart from "../components/InstructorRatingsChart";
import InstructorStudentChart from "../components/InstructorStudentChart";
const Reports = () => {
    const navigate = useNavigate();

    return(
        <div>
        <TopBar/>
        <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <SessionDurationHistogram/>
        </Grid>
        <Grid item xs={12} md={6}>
        <QuizStatusChart/>
        </Grid>
        <Grid item xs={12} md={6}>
            <InstructorRatingsChart/>
        </Grid>
        <Grid item xs={12} md={6}>
            <InstructorStudentChart/>
        </Grid>
        </Grid>
        </div>
    )

}

export default Reports;