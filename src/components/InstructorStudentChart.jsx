import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Container,Icon } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import supabase from '../client';
import BarChartIcon from '@mui/icons-material/BarChart';

const InstructorStudentChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchInstructorsAndCountStudents();
    }, []);

    const fetchInstructorsAndCountStudents = async () => {
        
        const { data: instructors, error: instructorError } = await supabase
            .from('users')
            .select('id, username')
            .eq('role', 'instructor');

        if (instructorError) {
            console.error('Error fetching instructors:', instructorError);
            return;
        }

        const counts = await Promise.all(instructors.map(async (instructor) => {
            const { data: studentCount, error: countError } = await supabase
                .from('users')
                .select('*', { count: 'exact' })
                .eq('instructorid', instructor.id)
                .eq('role', 'user');

            if (countError) {
                console.error('Error counting students for instructor:', instructor.username, countError);
                return { name: instructor.username, students: 0 };
            }

            return { name: instructor.username, students: studentCount.length };
        }));

        setChartData(counts.filter(Boolean)); 
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 3, width: 620 }}>
                <Typography variant="h6" sx={{ color: '#333' }}>
                    <Icon sx={{ color: '#FFD700', mr: 1 }}>
                        <BarChartIcon />
                    </Icon>
                   Numar Studenti per Instructor
                </Typography>
            </Paper>
        <ResponsiveContainer width="92%" height={400} >
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
        </Box>
    );
};

export default InstructorStudentChart;
