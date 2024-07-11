import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import { CircularProgress, Typography, Box, Paper,Icon} from '@mui/material';
import { supabase } from '../client';
import CheckIcon from '@mui/icons-material/Check';

const fetchSessionData = async () => {
    try {
        const { data, error } = await supabase.from('driving_sessions').select('duration');
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching session durations:', error.message);
        return [];
    }
};

const prepareHistogramData = (sessions) => {
    const bins = {}; 
    sessions.forEach(session => {
        const bin = Math.floor(session.duration / 10) * 10; 
        bins[bin] = (bins[bin] || 0) + 1;
    });
    return Object.keys(bins).map(bin => ({
        duration: `${bin}-${+bin + 10}`,
        count: bins[bin],
    }));
};

const SessionDurationHistogram = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSessionData().then(sessions => {
            setData(prepareHistogramData(sessions));
            setLoading(false);
        });
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ mt: 4,marginLeft: 5 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 3,width: 620 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                    <Icon sx={{ color: '#FFD700', mr: 1 }}>
                        <CheckIcon/>
                    </Icon>
                    <Typography variant="h6" >Durata sesiunilor</Typography>
                </Box>
            </Paper>
            {data.length > 0 ? (
                <BarChart width={600} height={300} data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="duration" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            ) : <Typography>Nu exista date.</Typography>}
            
        </Box>
    );
};

export default SessionDurationHistogram;
