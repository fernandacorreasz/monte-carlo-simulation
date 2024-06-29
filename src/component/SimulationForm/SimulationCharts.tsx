import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { Modal, Button, Slider } from 'antd';
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
  return Math.round(total / data.length);
};

const calculateMedian = (data: SimulationResult[], key: keyof SimulationResult) => {
  const values = data.map(entry => entry[key] as number).sort((a, b) => a - b);
  const middle = Math.floor(values.length / 2);
  return values.length % 2 === 0 ? (values[middle - 1] + values[middle]) / 2 : values[middle];
};

const calculateStdDev = (data: SimulationResult[], key: keyof SimulationResult, mean: number) => {
  const variance = data.reduce((sum, entry) => sum + Math.pow((entry[key] as number) - mean, 2), 0) / data.length;
  return Math.sqrt(variance);
};

const calculateConfidenceInterval = (mean: number, stdDev: number, n: number, z: number = 1.96) => {
  const marginOfError = z * (stdDev / Math.sqrt(n));
  return [mean - marginOfError, mean + marginOfError];
};

const calculateFrequency = (data: SimulationResult[], key: keyof SimulationResult) => {
  const freq: { [key: number]: number } = {};
  data.forEach(entry => {
    const value = entry[key] as number;
    freq[value] = (freq[value] || 0) + 1;
  });
  return freq;
};

const SimulationCharts: React.FC<SimulationChartsProps> = ({ results }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [range, setRange] = useState<number[]>([0, 30]); // Controle de faixa de exibição
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const averageDemand = calculateAverage(results, 'demand');
  const averageInventory = calculateAverage(results, 'inventory');
  const averageTotalCost = calculateAverage(results, 'totalCost');
  const averageSales = calculateAverage(results, 'sales');

  const stdDevDemand = calculateStdDev(results, 'demand', averageDemand);
  const stdDevInventory = calculateStdDev(results, 'inventory', averageInventory);
  const stdDevTotalCost = calculateStdDev(results, 'totalCost', averageTotalCost);
  const stdDevSales = calculateStdDev(results, 'sales', averageSales);

  const confidenceIntervalDemand = calculateConfidenceInterval(averageDemand, stdDevDemand, results.length);
  const confidenceIntervalInventory = calculateConfidenceInterval(averageInventory, stdDevInventory, results.length);
  const confidenceIntervalTotalCost = calculateConfidenceInterval(averageTotalCost, stdDevTotalCost, results.length);
  const confidenceIntervalSales = calculateConfidenceInterval(averageSales, stdDevSales, results.length);

  const frequencyDemand = calculateFrequency(results, 'demand');
  const frequencyInventory = calculateFrequency(results, 'inventory');

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setModalContent(null);
  };

  const handleRangeChange = (value: number[]) => {
    setRange(value);
  };

  const filteredResults = results.filter(result => result.day >= range[0] && result.day <= range[1]);

  const renderBarChart = (dataKey: string, fill: string, label: string, confidenceInterval: number[], frequency: { [key: number]: number }) => (
    <div>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart data={filteredResults} style={{ margin: '0 auto' }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" allowDataOverflow={true}>
            <Label value="Dia" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value={label} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill={fill} />
        </BarChart>
      </ResponsiveContainer>
      <Slider range defaultValue={[0, 30]} max={30} onChange={handleRangeChange} />
      <div>
        <p><b>Média:</b> {calculateAverage(results, dataKey as keyof SimulationResult)}</p>
        <p><b>Mediana:</b> {calculateMedian(results, dataKey as keyof SimulationResult)}</p>
        <p><b>Desvio Padrão:</b> {calculateStdDev(results, dataKey as keyof SimulationResult, calculateAverage(results, dataKey as keyof SimulationResult))}</p>
        <p><b>Intervalo de Confiança (95%):</b> {confidenceInterval.join(' a ')} - Este intervalo representa a faixa dentro da qual esperamos encontrar a verdadeira média da população 95% das vezes, dado o tamanho da amostra e a variabilidade dos dados.</p>
        <p><b>Frequência:</b> {JSON.stringify(frequency)}</p>
        <p><b>Distribuições de Probabilidade:</b> Normal</p>
      </div>
    </div>
  );

  return (
    <div>
      <h2>Demanda Diária (Média: {averageDemand})</h2>
      <Button onClick={() => openModal(renderBarChart('demand', '#8884d8', 'Demanda', confidenceIntervalDemand, frequencyDemand))}>
        Expandir
      </Button>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <BarChart data={results} style={{ margin: '0 auto' }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" allowDataOverflow={true}>
            <Label value="Dia" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Demanda" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="demand" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Estoque Diário (Média: {averageInventory})</h2>
      <Button onClick={() => openModal(renderBarChart('inventory', '#82ca9d', 'Estoque', confidenceIntervalInventory, frequencyInventory))}>
        Expandir
      </Button>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <BarChart data={results} style={{ margin: '0 auto' }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" allowDataOverflow={true}>
            <Label value="Dia" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Estoque" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="inventory" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Custo Total Diário (Média: {averageTotalCost})</h2>
      <Button onClick={() => openModal(renderBarChart('totalCost', '#8884d8', 'Custo Total', confidenceIntervalTotalCost, calculateFrequency(results, 'totalCost')))}>
        Expandir
      </Button>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <BarChart data={results} style={{ margin: '0 auto' }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" allowDataOverflow={true}>
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
      <Button onClick={() => openModal(renderBarChart('sales', '#ff7300', 'Vendas Acumuladas', confidenceIntervalSales, calculateFrequency(results, 'sales')))}>
        Expandir
      </Button>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <BarChart data={results} style={{ margin: '0 auto' }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" allowDataOverflow={true}>
            <Label value="Dia" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Vendas Acumuladas" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Distribuição de Demanda</h2>
      <Button onClick={() => openModal(renderBarChart('demand', '#ffc658', 'Demanda', confidenceIntervalDemand, frequencyDemand))}>
        Expandir
      </Button>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <BarChart data={results} style={{ margin: '0 auto' }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="demand" allowDataOverflow={true}>
            <Label value="Demanda" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Frequência" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="demand" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Probabilidade de Ruptura de Estoque de</h2>
      <Button onClick={() => openModal(renderBarChart('inventory', '#82ca9d', 'Probabilidade', confidenceIntervalInventory, frequencyInventory))}>
        Expandir
      </Button>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <BarChart data={results} style={{ margin: '0 auto' }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" allowDataOverflow={true}>
            <Label value="Dia" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Probabilidade" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="inventory" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <Modal visible={visible} footer={null} onCancel={closeModal} width={1500} centered>
        {modalContent}
      </Modal>
    </div>
  );
};

export default SimulationCharts;
