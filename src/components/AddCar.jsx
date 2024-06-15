import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { supabase } from '../client';

const AddCar = () => ({open,handleClose}) => {
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        kilometers: '',
        instructor_id: ''
    });
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchInstructors = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('id, username')
            .eq('role', 'instructor');
        if (error) {
            console.error('Error fetching instructors:', error);
        } else {
            setInstructors(data);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('cars')
            .insert([carData]);
        if (error) {
            console.error('Error saving car:', error);
        } else {
            console.log('Car added successfully!',data);
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Car</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin='dense'
                name="make"
                label="Make"
                variant='standard'
                value={carData.make}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                margin='dense'
                name="model"
                label="Model"
                variant='standard'
                value={carData.model}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                margin='dense'
                name="year"
                label="Year"
                type="number"
                variant='standard'
                value={carData.year}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                margin='dense'
                name="kilometers"
                label="Kilometers"
                type="number"
                variant='standard'
                value={carData.kilometers}
                onChange={handleChange}
                fullWidth
            />
            <FormControl fullWidth>
                <InputLabel>Instructor</InputLabel>
                <Select
                    name="instructor_id"
                    value={carData.instructor_id}
                    label="Instructor"
                    onChange={handleChange}
                >
                    {instructors.map((instructor) => (
                        <MenuItem key={instructor.id} value={instructor.id}>
                            {instructor.username}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Add Car
            </Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddCar;
