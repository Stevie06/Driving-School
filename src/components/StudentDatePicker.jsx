import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const StudentDatePicker = ({ onDateTimeSelect }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label="Choose your session date and time"
                value={selectedDate}
                onChange={setSelectedDate}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};

export default StudentDatePicker;
