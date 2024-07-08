import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '../client';
import { Paper, Typography, Box,Icon } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
const InstructorRatingsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorRatings = async () => {

      const { data: ratingsData, error: ratingsError } = await supabase
        .from('reviews')
        .select(`
          instructor_id,
          rating
        `)

      if (ratingsError) {
        console.error('Error fetching instructor ratings:', ratingsError);
        setLoading(false);
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, username');

      if (userError) {
        console.error('Error fetching user data:', userError);
        setLoading(false);
        return;
      }

      const userMap = new Map(userData.map(user => [user.id, user.username]));

      const chartData = ratingsData.map(item => ({
        username: userMap.get(item.instructor_id), 
        Rating: parseFloat(item.rating).toFixed(2) 
      }));

      setData(chartData);
      setLoading(false);
    };

    fetchInstructorRatings();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Box sx={{ mt: 4,marginLeft: 5 }}>
    <Paper elevation={3} sx={{ p: 2, mb: 3, width: 620 }}>
      <Typography variant="h6" sx={{ color: '#333' }}>
        <Icon sx={{ color: '#FFD700', mr: 1 }}>
          <RateReviewIcon />
        </Icon>
          Recenziile instructorilor
      </Typography>
    </Paper>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 5, right: 60, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="username" />
        <YAxis label={{ value: 'Ratings', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Rating" fill="#8884d8" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
    </Box>
  );
};

export default InstructorRatingsChart;
