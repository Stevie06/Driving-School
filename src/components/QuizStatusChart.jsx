import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircularProgress, Typography, Box, Paper,Icon } from '@mui/material';
import { supabase } from '../client';
import PieChartIcon from '@mui/icons-material/PieChart';
const fetchQuizData = async () => {
    try {
        const { data, error } = await supabase
            .from('quiz_history')
            .select('status');
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching quiz data:', error.message);
        return [];
    }
};

const prepareChartData = (quizzes) => {
    const counts = { Admis: 0, Respins: 0 };
    quizzes.forEach(quiz => {
        if (quiz.status === 'Ati fost admis') {
            counts.Admis += 1;
        } else if (quiz.status === 'Ati fost respins') {
            counts.Respins += 1;
        }
    });
    return [{ name: "Admis", value: counts.Admis }, { name: "Respins", value: counts.Respins }];
};

const QuizStatusChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuizData().then(quizzes => {
            setData(prepareChartData(quizzes));
            setLoading(false);
        });
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ height: 400, textAlign: 'center', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 3,width: 620 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                    <Icon sx={{ color: '#FFD700', mr: 1 }}>
                        <PieChartIcon/>
                    </Icon>
                    <Typography variant="h6" >Rezultate Chestionare</Typography>
                </Box>
            </Paper>
            <ResponsiveContainer height={400}>
                <PieChart width={500} height={500}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="30%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#2196f3"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#2196f3' : '#8884d8'} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend align="left" verticalAlign="top" />
                </PieChart>
            </ResponsiveContainer>
            
        </Box>
    );
};

export default QuizStatusChart;
