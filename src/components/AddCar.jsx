import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Snackbar, Alert, Paper, Typography, Icon } from '@mui/material';
import { supabase } from '../client';
import DirectionsCar from '@mui/icons-material/DirectionsCar';

const AddCar = () => {
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        kilometers: '',
        instructor_id: '',
    });
    const [instructors, setInstructors] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    useEffect(() => {
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

        fetchInstructors();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!imageFile) return null;
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
        const { data, error } = await supabase.storage
            .from('car-images')
            .upload(fileName, imageFile);

        if (error) {
            console.error('Error uploading image:', error);
            return null;
        } else {
            return data.Key; 
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const photoKey = await handleUpload();
        if (photoKey) {
            carData.photo_url = photoKey;
        }
        const { data, error } = await supabase
            .from('cars')
            .insert([carData]);
        if (error) {
            console.error('Error saving car:', error);
            setSnackbar({ open: true, message: 'Failed to save car!', severity: 'error' });
        } else {
            console.log('Car added successfully!', data);
            setSnackbar({ open: true, message: 'Car added successfully!', severity: 'success' });
        }
    };

    return (
        <div>
        <Box sx={{ p: 3, borderRadius: 2 , width: 800, margin: 'auto', marginTop: 5}}>
            <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                        <Icon sx={{ color: '#FFD700', mr: 1 }}>
                            <DirectionsCar/>
                        </Icon>
                        <Typography variant="h6">Adauga masina</Typography>
                    </Box>
            </Paper> 
            <Paper elevation={3} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3 }}>
            <TextField
                autoFocus
                margin='dense'
                name="make"
                label="Marca"
                variant='outlined'
                value={carData.make}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                margin='dense'
                name="model"
                label="Model"
                variant='outlined'
                value={carData.model}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                margin='dense'
                name="year"
                label="An fabricatie"
                type="number"
                variant='outlined'
                value={carData.year}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                margin='dense'
                name="kilometers"
                label="Kilometri"
                type="number"
                variant='outlined'
                value={carData.kilometers}
                onChange={handleChange}
                fullWidth
            />
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
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
            <label htmlFor="raised-button-file" >
                <Button variant="contained" component="span" sx={{ mt: 2 }} >
                    Incarca poza
                </Button>
            </label>
            
            <Button type="submit" variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
                Adauga Masina
            </Button>
            {snackbar.open && (
                <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            )}
        </Paper>
        </Box>
        </div>
    );
};

export default AddCar;
