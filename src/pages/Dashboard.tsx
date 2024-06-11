import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import ParameterInput, {
  SimulationParams,
} from "../component/SimulationForm/ParameterInput";
import SimulationResults from "../component/SimulationForm/SimulationResults";
import SimulationCharts from "../component/SimulationForm/SimulationCharts";
import { Card, Divider} from "antd";

interface SimulationResult {
  day: number;
  demand: number;
  inventory: number;
  orderPlaced: boolean;
  totalCost: number;
}
const Dashboard: React.FC = () => {
  const [results, setResults] = useState<SimulationResult[]>([]);

  const simulate = (params: SimulationParams) => {
    const simulationResults: SimulationResult[] = [];
    let inventory = params.maxInventory;
    let totalCost = 0;

    for (let day = 1; day <= 30; day++) {
      const demand = Math.max(
        0,
        Math.round(params.meanDemand + params.stdDemand * (Math.random() - 0.5))
      );
      inventory -= demand;

      let orderPlaced = false;
      if (inventory <= params.reorderPoint) {
        inventory += params.maxInventory - inventory;
        totalCost += params.orderCost;
        orderPlaced = true;
      }

      const holdingCost = inventory * params.holdingCost;
      const shortageCost =
        inventory < 0 ? Math.abs(inventory) * params.shortageCost : 0;
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
    <div style={{}}>
      <Content style={{ padding: "24px", width: "80rem" }}>
        <h2 style={{}}>Simulação de Monte Carlo  -  Gestão de Estoque</h2>
        <Card title="Descrição" bordered={false} style={{marginBottom:"2%"}}>
          <p>O processo de simulação de gestão de estoque usando Monte Carlo e Pesquisa Operacional envolve os seguintes passos</p>
        </Card>
        <Divider></Divider>
        <Card title="Coleta de Dados" bordered={false} style={{marginBottom:"2%"}}>
          <ParameterInput onSimulate={simulate} />
        </Card>

        <Card title="Análise dos Resultados" bordered={false} style={{marginBottom:"2%"}}>
          <SimulationResults results={results} />
        </Card>

        <Card title="Análise Gráfica dos Resultados" bordered={false} style={{marginBottom:"2%"}}>
          <SimulationCharts results={results} />
        </Card>
      </Content>
    </div>
  );
};

export default Dashboard;
