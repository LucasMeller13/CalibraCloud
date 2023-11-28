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
        <>
        <div>
            <h2 className='text-center font-semibold text-xl'>Qt. de sensores cadastrados x Mês</h2> 
        </div>
        
        <BarChart
            width={800}
            height={300}
            data={data}
            margin={{
                top: 20, right: 30, left: 10, bottom: 10,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#545454" />
            <XAxis className='font-semibold' dataKey="monthYear" 
                    label={{ 
                        value: 'Datas', 
                        position: 'insideBottom', 
                        offset: -8,
                        style: {
                        textAnchor: 'middle',
                        fill: '#000000' 
                        }
                    }}
                    tick={{ fill: '#000000' }}/>
            <YAxis className='font-semibold' label={{ value: 'Nº de sensores cadastrados', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fill: '#000000' } , offset: 15}}
            />
            <Tooltip  />
            <Bar dataKey="quantity" name='Nº de sensores cadastrados' fill="#0284c7" />
            </BarChart>
            </>
    );
};


export {LineChartSensor, BarChartSensor};