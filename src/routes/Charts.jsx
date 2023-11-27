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
            width={800}
            height={300}
            data={data}
            margin={{
                top: 20, right: 30, left: 10, bottom: 10,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthYear" 
                    label={{ 
                        value: 'Datas', 
                        position: 'insideBottom', 
                        offset: -8,
                        style: {
                        textAnchor: 'middle',
                        fill: '#666' // You can set the color of the label text here
                        }
                    }}  />
            <YAxis label={{ value: 'Nº de sensores cadastrados', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle'} , offset: 15}}
            />
            <Tooltip />
            <Bar dataKey="quantity" name='Nº de sensores cadastrados' fill="#0284c7" />
        </BarChart>
    );
};


export {LineChartSensor, BarChartSensor};