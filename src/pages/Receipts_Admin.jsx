import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import AddReceipt from "../components/AddReceipt";
import { Container, Grid, Typography, Paper } from "@mui/material";
import ReceiptsOverview from "../components/ReceiptsOverview";
import { Add } from "@mui/icons-material";
import AdminReceiptsOverview from "../components/AdminReceiptOverview";
const Receipts_Admin = () => {
    const navigate = useNavigate();

    return(
        <div>
        <TopBar/>
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <AddReceipt/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <AdminReceiptsOverview/> 
                </Grid>
            </Grid>        
        </Container>
        </div>
    )

}

export default Receipts_Admin;