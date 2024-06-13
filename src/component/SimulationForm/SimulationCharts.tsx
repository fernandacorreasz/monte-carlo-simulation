import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Label, AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useMediaQuery } from 'react-responsive';

interface SimulationResult {
  day: number;
  demand: number;
  inventory: number;
  orderPlaced: boolean;
  totalCost: number;
  sales?: number;
}

interface SimulationChartsProps {
  results: SimulationResult[];
}

const calculateAverage = (data: SimulationResult[], key: keyof SimulationResult) => {
  const total = data.reduce((sum, entry) => sum + (entry[key] as number), 0);
  return (total / data.length).toFixed(2);
};

const SimulationCharts: React.FC<SimulationChartsProps> = ({ results }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const averageDemand = calculateAverage(results, 'demand');
  const averageInventory = calculateAverage(results, 'inventory');
  const averageTotalCost = calculateAverage(results, 'totalCost');
  const averageSales = calculateAverage(results, 'sales');

  return (
    <div>
      <h2>Demanda Diária (Média: {averageDemand})</h2>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <LineChart data={results}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day">
            <Label value="Dia" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Demanda" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="demand" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <h2>Estoque Diário (Média: {averageInventory})</h2>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <LineChart data={results}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day">
            <Label value="Dia" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Estoque" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="inventory" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <h2>Custo Total Diário (Média: {averageTotalCost})</h2>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <BarChart data={results}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day">
            <Label value="Dia" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Custo Total" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="totalCost" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Vendas Acumuladas (Média: {averageSales})</h2>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <LineChart data={results}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day">
            <Label value="Dia" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Vendas Acumuladas" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>

      <h2>Distribuição de Demanda</h2>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <BarChart data={results}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="demand">
            <Label value="Demanda" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Frequência" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="demand" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Probabilidade de Ruptura de Estoque</h2>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <AreaChart data={results}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day">
            <Label value="Dia" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Probabilidade" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="inventory" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimulationCharts;
