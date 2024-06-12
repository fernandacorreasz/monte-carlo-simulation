import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { useMediaQuery } from 'react-responsive';

interface SimulationResult {
  day: number;
  demand: number;
  inventory: number;
  orderPlaced: boolean;
  totalCost: number;
}

interface SimulationChartsProps {
  results: SimulationResult[];
}

const SimulationCharts: React.FC<SimulationChartsProps> = ({ results }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div>
      <h2>Gráfico de Demanda Diária</h2>
      <LineChart width={isMobile ? 300 : 600} height={isMobile ? 200 : 300} data={results}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="demand" stroke="#8884d8" />
      </LineChart>

      <h2>Gráfico de Estoque Diário</h2>
      <LineChart width={isMobile ? 300 : 600} height={isMobile ? 200 : 300} data={results}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="inventory" stroke="#82ca9d" />
      </LineChart>

      <h2>Gráfico de Custo Total Diário</h2>
      <BarChart width={isMobile ? 300 : 600} height={isMobile ? 200 : 300} data={results}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalCost" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default SimulationCharts;
