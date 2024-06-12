import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Label, AreaChart, Area } from 'recharts';
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

const SimulationCharts: React.FC<SimulationChartsProps> = ({ results }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div>
      <h2>Demanda Diária</h2>
      <LineChart width={isMobile ? 300 : 600} height={isMobile ? 200 : 300} data={results}>
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

      <h2>Estoque Diário</h2>
      <LineChart width={isMobile ? 300 : 600} height={isMobile ? 200 : 300} data={results}>
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

      <h2>Custo Total Diário</h2>
      <BarChart width={isMobile ? 300 : 600} height={isMobile ? 200 : 300} data={results}>
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

      <h2>Vendas Acumuladas</h2>
      <LineChart width={isMobile ? 300 : 600} height={isMobile ? 200 : 300} data={results}>
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

      <h2>Distribuição de Demanda</h2>
      <BarChart width={isMobile ? 300 : 600} height={isMobile ? 200 : 300} data={results}>
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

      <h2>Probabilidade de Ruptura de Estoque</h2>
      <AreaChart width={isMobile ? 300 : 600} height={isMobile ? 200 : 300} data={results}>
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
    </div>
  );
};

export default SimulationCharts;
