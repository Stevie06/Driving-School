import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { Button, TextField, Typography, Container, Paper, Grid, Link ,InputAdornment,Box, IconButton} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
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
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
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
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5', 
        }}
      >
            <Container sx={{ paddingTop: 2 }} maxWidth='sm'>
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
                                    label="Parola"
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
                        Nu aveti cont? <Link href='/SignUp'>Inregistrare</Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}

export default Login;
