import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, Snackbar, Alert, Rating, Paper, Icon } from '@mui/material';
import { supabase } from '../client';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ReviewsIcon from '@mui/icons-material/Reviews';

const ReviewInstructor = () => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(2);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [studentId, setStudentId] = useState('');
    const [instructorId, setInstructorId] = useState('');
    const [instructorName, setInstructorName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const { data:{user} } = await supabase.auth.getUser();
            setStudentId(user.id);

            const { data, error } = await supabase
                .from('users')
                .select('instructorid')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error fetching instructor ID:', error);
                return;
            }

            setInstructorId(data.instructorid);

            const { data: instructorData, error: instructorError } = await supabase
                .from('users')
                .select('username')
                .eq('id', data.instructorid)
                .single();

            if (instructorError || !instructorData) {
                console.error('Error fetching instructor name:', instructorError);
                return;
            }

            setInstructorName(instructorData.username);
        };

        fetchUserData();
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from('reviews')
            .insert([
                { student_id: studentId, instructor_id: instructorId, review: review, rating: rating }
            ]);

        if (error) {
            setMessage('Error submitting review: ' + error.message);
            setOpen(true);
        } else {
            setMessage('Recenzia a fost trimisa!');
            setOpen(true);
            setReview('');
            setRating(0);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
            <Paper elevation={3} sx={{ p: 3, width: 620 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                    <Icon sx={{ color: '#FFD700', mr: 1 }}>
                        <ReviewsIcon />
                    </Icon>
                    <Typography variant="h6" component="h2">Adauga recenzie</Typography>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{ p: 3, mt: 3, width: 620 }}>
                <Typography variant="h6" component="h2">Instructor: {instructorName || 'Loading...'}</Typography>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    icon={<StarIcon fontSize="inherit" />}
                />
                <TextField
                    fullWidth
                    label="Scrie-ti parerea"
                    multiline
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    variant="outlined"
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Trimite recenzia
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default ReviewInstructor;
