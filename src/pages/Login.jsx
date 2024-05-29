import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { Button, TextField, Typography, Container, Paper, Grid, Link } from '@mui/material';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { user, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            console.error('Login error:', error.message);
            alert(error.message);
            return;
        }

        
        const { data, error: roleError } = await supabase
            .from('users')
            .select('role')
            .eq('email', formData.email)
            .single(); 

        if (roleError) {
            console.error('Error fetching role:', roleError.message);
            alert(roleError.message);
            return;
        }

        switch (data.role) {
            case 'admin':
                navigate('/DashboardAdmin');
                break;
            case 'instructor':
                navigate('/DashboardInst');
                break;
            case 'user':
                navigate('/DashboardStud');
                break;
            default:
                alert('Role not recognized or user does not have a role assigned.');
                break;
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Container maxWidth='sm'>
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <Typography variant='h3' gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="email"
                                    name="email"
                                    label="Email"
                                    variant="standard"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    name="password"
                                    label="Password"
                                    variant="standard"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth color='primary'>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Typography sx={{ mt: 2 }}>
                        Don't have an account? <Link href='/SignUp'>Sign up</Link>
                    </Typography>
                </Paper>
            </Container>
        </div>
    );
}

export default Login;
