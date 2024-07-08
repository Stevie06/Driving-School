import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Snackbar, Alert, Paper, Typography, Icon } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { supabase } from '../client';

const AddCar = () => {
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        kilometers: '',
        instructor_id: '',
        photo_url: ''  
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

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!imageFile) return;
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error, data } = await supabase.storage
            .from('car-images')
            .upload(fileName, imageFile);

        if (error) {
            console.error('Error uploading image:', error);
            return;
        }
        console.log('Image uploaded successfully:', data);

        const response = supabase.storage
            .from('car-images')
            .getPublicUrl(data.Key);
        console.log(response);
        return response.data.publicUrl;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const photo_url = await handleUpload();
        if (photo_url) {
            carData.photo_url = photo_url;
        }
        console.log(photo_url);  

        const { error } = await supabase
            .from('cars')
            .insert([carData]);

        if (error) {
            console.error('Error adding car:', error);
            setSnackbar({ open: true, message: 'Failed to add car!', severity: 'error' });
        } else {
            setSnackbar({ open: true, message: 'Car added successfully!', severity: 'success' });
            setCarData({ make: '', model: '', year: '', kilometers: '', instructor_id: '', photo_url: '' });  
        }
    };

    return (
        <Box sx={{ p: 3, borderRadius: 2 , width: 700, margin: 'auto', marginTop: 5, display: 'grid'}}>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                    <DirectionsCarIcon sx={{ mr: 1, color: '#FFD700' }} />
                    Adauga Masina
                </Typography>
            </Paper>
            <Paper elevation={3} sx={{ p: 2 }}>
                <TextField sx={{ mt: 2 }} fullWidth label="Marca" name="make" value={carData.make} onChange={(e) => setCarData({ ...carData, make: e.target.value })} />
                <TextField sx={{ mt: 2 }} fullWidth label="Model" name="model" value={carData.model} onChange={(e) => setCarData({ ...carData, model: e.target.value })} />
                <TextField sx={{ mt: 2 }} fullWidth label="An fabricatie" type="number" name="year" value={carData.year} onChange={(e) => setCarData({ ...carData, year: e.target.value })} />
                <TextField sx={{ mt: 2 }} fullWidth label="Kilometri" type="number" name="kilometers" value={carData.kilometers} onChange={(e) => setCarData({ ...carData, kilometers: e.target.value })} />
                <FormControl fullWidth sx={{ mt: 2 }} >
                    <InputLabel>Instructor</InputLabel>
                    <Select name="instructor_id" value={carData.instructor_id} label="Instructor" onChange={(e) => setCarData({ ...carData, instructor_id: e.target.value })}>
                        {instructors.map((instructor) => (
                            <MenuItem key={instructor.id} value={instructor.id}>{instructor.username}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <input accept="image/*" type="file" onChange={handleFileChange} style={{ display: 'none' }} id="upload-button" />
                <label htmlFor="upload-button">
                    <Button variant="contained" component="span" sx={{ mt: 2,marginRight: 1 }}>Incarca Imagine</Button>
                </label>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>Adauga</Button>
            </Paper>
            {snackbar.open && (
                <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
                </Snackbar>
            )}
        </Box>
    );
};

export default AddCar;
