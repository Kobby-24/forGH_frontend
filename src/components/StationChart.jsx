// src/components/StationChart.jsx

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StationChart = ({ contentLog }) => {
  // --- Data Preparation ---
  const localCount = contentLog.filter(log => log.origin === 'Local').length;
  const foreignCount = contentLog.filter(log => log.origin === 'Foreign').length;

  const data = [
    { name: 'Local Content', value: localCount },
    { name: 'Foreign Content', value: foreignCount },
  ];

  const COLORS = ['#00C49F', '#FF8042']; // Green for Local, Orange for Foreign

  return (
    <Card sx={{ height: '100%', width: 500, ml:3 }}>
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom>
          Content Origin Breakdown
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={null}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StationChart;