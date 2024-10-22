import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import AddReceipt from "../components/AddReceipt";
import { Container, Grid, Typography, Paper } from "@mui/material";
import ReceiptsOverview from "../components/ReceiptsOverview";
const Receipts = () => {
    const navigate = useNavigate();

    return(
        <div>
        <TopBar/>
        <Container>
            <ReceiptsOverview/>         
        </Container>
        </div>
    )

}

export default Receipts