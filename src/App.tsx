import React, { useState } from 'react';
import { Layout, Typography } from 'antd';

import './App.css';
import ParameterInput, { SimulationParams } from './component/SimulationForm/ParameterInput';
import SimulationResults from './component/SimulationForm/SimulationResults';
import SimulationCharts from './component/SimulationForm/SimulationCharts';

const { Header, Content } = Layout;
const { Title } = Typography;

interface SimulationResult {
  day: number;
  demand: number;
  inventory: number;
  orderPlaced: boolean;
  totalCost: number;
}

const App: React.FC = () => {
  const [results, setResults] = useState<SimulationResult[]>([]);

  const simulate = (params: SimulationParams) => {
    const simulationResults: SimulationResult[] = [];
    let inventory = params.maxInventory;
    let totalCost = 0;

    for (let day = 1; day <= 30; day++) {
      const demand = Math.max(0, Math.round(params.meanDemand + params.stdDemand * (Math.random() - 0.5)));
      inventory -= demand;

      let orderPlaced = false;
      if (inventory <= params.reorderPoint) {
        inventory += params.maxInventory - inventory;
        totalCost += params.orderCost;
        orderPlaced = true;
      }

      const holdingCost = inventory * params.holdingCost;
      const shortageCost = inventory < 0 ? Math.abs(inventory) * params.shortageCost : 0;
      totalCost += holdingCost + shortageCost;

      simulationResults.push({
        day,
        demand,
        inventory: Math.max(0, inventory),
        orderPlaced,
        totalCost,
      });
    }

    setResults(simulationResults);
  };

  return (
    <Layout style={{ borderRadius: '24px' }}>
      <Header style={{ color: 'white' , height:'84px' }}>
        <Title style={{ color: 'white' }}>Simulação de Gestão de Estoque</Title>
      </Header>
      <Content style={{ padding: '24px' }}>
        <ParameterInput onSimulate={simulate} />
        <SimulationResults results={results} />
        <SimulationCharts results={results} />
      </Content>
    </Layout>
  );
};

export default App;
