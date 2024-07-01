import React, { useState } from 'react';
import AddCar from '../components/AddCar'; 
import { Button } from '@mui/material';
import TopBar from '../components/TopBar';

const Masina = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <TopBar />
            <AddCar />
        </div>
    );
};

export default Masina;
