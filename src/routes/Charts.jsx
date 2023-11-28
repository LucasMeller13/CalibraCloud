import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

/*
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];*/

const COLORS = ['#87CEEB', '#00C49F', '#FFBB28', '#FF8042', '#DC143C', '#32CD32', '#FF69B4'];

const PieChartComponent = ({ data }) => (
    <>
        <div>
            <h2 className='text-center font-semibold text-2xl text-white'>Qt.Sensores cadastrados x Usuário</h2> 
        </div>
        <PieChart width={400} height={300}>
        <Pie
        data={data}
        cx={175}
        cy={148}
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="y"
        >
        {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
        </Pie>
        <Tooltip />
        </PieChart>
    </>
);

const BarChartSensorQtData = ({ data }) => {
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
            <XAxis className='font-semibold' dataKey="x" 
                    label={{ 
                        value: 'Datas', 
                        position: 'insideBottom', 
                        offset: -8,
                        style: {
                        textAnchor: 'middle',
                        fill: '#000000' 
                        }
                    }}
                    tick={{ fill: '#000000' , angle:6}}/>
            <YAxis className='font-semibold' label={{ value: 'Nº de sensores cadastrados', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fill: '#000000' } , offset: 15}}
            />
            <Tooltip  />
            <Bar dataKey="y" name='Nº de sensores cadastrados' fill="#0284c7" />
            </BarChart>
            </>
    );
};

const BarChartSensorQtTipo = ({ data }) => {
    return (
        <>
        <div>
            <h2 className='text-center font-semibold text-xl'>Qt. de sensores cadastrados x Tipo de Sensor</h2> 
        </div>
        
        <BarChart
            width={800}
            height={300}
            data={data}
            margin={{
                top: 20, right: 30, left: 0, bottom: 10,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#545454" />
                <XAxis className='font-semibold' dataKey="x" 
                    angle={-45}
                    label={{ 
                        value: 'Tipos de sensores', 
                        position: 'insideBottom', 
                        offset: -8,
                        style: {
                        textAnchor: 'middle',
                        fill: '#000000' 
                        }
                    }}
                    tick={{ fill: '#000000', angle:6}}/>
            <YAxis className='font-semibold' label={{ value: 'Nº de sensores cadastrados', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fill: '#000000' } , offset: 15}}
            />
            <Tooltip  />
            <Bar dataKey="y" name='Nº de sensores cadastrados' fill="#0284c7" />
            </BarChart>
            </>
    );
};


export {BarChartSensorQtData, BarChartSensorQtTipo, PieChartComponent};