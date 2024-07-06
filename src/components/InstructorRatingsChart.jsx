import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '../client'; // Ensure this path is correct

const InstructorRatingsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorRatings = async () => {
      // Fetch average ratings per instructor
      const { data: ratingsData, error: ratingsError } = await supabase
        .from('reviews')
        .select(`
          instructor_id,
          avg(rating) as avgRating
        `)
        .group('instructor_id');

      if (ratingsError) {
        console.error('Error fetching instructor ratings:', ratingsError);
        setLoading(false);
        return;
      }

      // Fetch usernames
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, username');

      if (userError) {
        console.error('Error fetching user data:', userError);
        setLoading(false);
        return;
      }

      const userMap = new Map(userData.map(user => [user.id, user.username]));

      // Map usernames to ratings data
      const chartData = ratingsData.map(item => ({
        username: userMap.get(item.instructor_id), // Get the username from userMap
        avgRating: parseFloat(item.avgRating).toFixed(2) // Format average rating to two decimal places
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
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="username" />
        <YAxis label={{ value: 'Average Rating', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="avgRating" fill="#8884d8" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InstructorRatingsChart;
