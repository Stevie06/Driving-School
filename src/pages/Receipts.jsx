import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import AddReceipt from "../components/Addreceipt";
import { Container, Grid, Typography, Paper } from "@mui/material";
const Receipts = () => {
    const navigate = useNavigate();

    return(
        <div>
        <TopBar/>
        <Container sx={{
                display: 'flex',
                flexDirection: 'column',  
                alignItems: 'center',     
                justifyContent: 'center', 
                height: 'calc(100vh - 64px)', 
                paddingTop: '64px',
                width: '100%',
            }}>
                <Grid container justifyContent="center">  
                    <Grid item xs={12} sm={8} md={6} lg={4}>  
                        <Paper elevation={3} sx={{ padding: 4, margin: 2, width: '500px' }}> 
                            <AddReceipt/>
                        </Paper>
                    </Grid> 
                </Grid>
        </Container>
        </div>
    )

}

export default Receipts