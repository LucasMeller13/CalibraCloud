import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineChartSensor = ({ data }) => {
    return (
        <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthYear" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="quantity" name='Nº de sensores cadastrados' stroke="#8884d8" />
        </LineChart>
    );
};

const BarChartSensor = ({ data }) => {
    return (
        <BarChart
            width={600}
            height={300}
            data={data}
            margin={{
                top: 20, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthYear" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" name='Nº de sensores cadastrados' fill="#8884d8" />
        </BarChart>
    );
};


export {LineChartSensor, BarChartSensor};