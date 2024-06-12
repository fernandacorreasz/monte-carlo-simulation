import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import ParameterInput, {
  SimulationParams,
} from "../component/SimulationForm/ParameterInput";
import SimulationResults from "../component/SimulationForm/SimulationResults";
import SimulationCharts from "../component/SimulationForm/SimulationCharts";
import { Card, Divider } from "antd";
import { useMediaQuery } from "react-responsive";

interface SimulationResult {
  day: number;
  demand: number;
  inventory: number;
  orderPlaced: boolean;
  totalCost: number;
}

const Dashboard: React.FC = () => {
  const [results, setResults] = useState<SimulationResult[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });

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
      <Content style={{  padding: isMobile ? "16px" : "24px",
          width: isMobile ? "100%" : "65rem", background:"rgb(245 245 245)" }}>
        <h2 style={{}}>Simulação de Monte Carlo - Gestão de Estoque</h2>
        <Card title="Descrição" bordered={false} style={{ marginBottom: "2%" }}>
          <p>
            O processo de simulação de gestão de estoque usando Monte Carlo e Pesquisa Operacional envolve os seguintes passos:
          </p>
        </Card>
        <Divider></Divider>
        <Card title="Coleta de Dados" bordered={false} style={{ marginBottom: "2%" }}>
          <ParameterInput onSimulate={simulate} />
        </Card>

        <Card title="Análise dos Resultados" bordered={false} style={{ marginBottom: "2%" }}>
          <SimulationResults results={results} />
        </Card>

        <Card title="Análise Gráfica dos Resultados" bordered={false} style={{ marginBottom: "2%" }}>
          <SimulationCharts results={results} />
        </Card>
        <Card title="Cálculos Matemáticos" bordered={false} style={{ marginBottom: "2%" }}>

<p>
    <b> Definição de Distribuições de Probabilidade</b><br />
    A Demanda Diária é modelada como uma variável aleatória seguindo uma distribuição normal com média e desvio padrão definidos pelos parâmetros do usuário.<br />
  </p>
<Divider />
<p>
    <b>Desenvolvimento do Modelo de Simulação</b><br />
   
    <i>A simulação é executada por um período fixo (ex.: 30 dias).</i><br />
    <i>Diariamente, a demanda é gerada aleatoriamente com base na distribuição normal.</i><br />
    <i>O estoque é ajustado subtraindo a demanda diária.</i><br />
    <i>Quando o estoque atinge o nível de reordem, um novo pedido é realizado para reabastecer o estoque.</i><br />
    <i>Os custos de manutenção e ruptura são calculados diariamente.</i><br />
  </p>
<Divider />

<p>
    <b> Execução das Simulações - Iteração Diária: Para cada dia no período de simulação, realiza-se</b><br />
    <i>Geração da Demanda: Demanda diária é gerada aleatoriamente.</i><br />
    <i>Ajuste de Estoque: Estoque é reduzido conforme a demanda.</i><br />
    <i>Verificação de Reabastecimento: Se necessário, um pedido é realizado.</i><br />
    <i>Cálculo de Custos: Custos de manutenção e ruptura são somados ao custo total.</i><br />
  </p>
  <Divider />
Cálculos Matemáticos  
  <p>
    <b>1. Demanda Diária (D):</b><br />
    A demanda diária é modelada como uma variável aleatória seguindo uma distribuição normal com média (μ) e desvio padrão (σ).<br />
    <i>D = μ + σ × Z</i><br />
    onde Z é um valor aleatório da distribuição normal padrão.
  </p>
  <Divider />
  <p>
    <b>2. Nível de Estoque (I):</b><br />
    O nível de estoque é ajustado diariamente subtraindo a demanda diária.<br />
    <i>I<sub>t+1</sub> = I<sub>t</sub> - D<sub>t</sub></i>
  </p>
  <Divider />
  <p>
    <b>3. Reabastecimento:</b><br />
    Quando o nível de estoque cai para ou abaixo do nível de reordem (R), um pedido é realizado para reabastecer o estoque até a capacidade máxima (Q<sub>max</sub>).<br />
    <i>Se I<sub>t+1</sub> ≤ R, então I<sub>t+1</sub> = Q<sub>max</sub> e C<sub>pedido</sub> = C<sub>p</sub></i><br />
    onde C<sub>p</sub> é o custo do pedido.
  </p>
  <Divider />
  <p>
    <b>4. Cálculo dos Custos:</b><br />
    - <b>Custo de Manutenção (Holding Cost):</b> Calculado com base no nível de estoque.<br />
    <i>C<sub>manutenção</sub> = I<sub>t</sub> × C<sub>m</sub></i><br />
    onde C<sub>m</sub> é o custo de manutenção por unidade por dia.<br />
    <br />
    - <b>Custo de Ruptura (Shortage Cost):</b> Ocorre quando a demanda excede o estoque disponível.<br />
    <i>C<sub>ruptura</sub> = max(0, D<sub>t</sub> - I<sub>t</sub>) × C<sub>r</sub></i><br />
    onde C<sub>r</sub> é o custo de ruptura por unidade não atendida.<br />
    <br />
    - <b>Custo Total Diário (C<sub>total</sub>):</b> É a soma dos custos de pedido, manutenção e ruptura.<br />
    <i>C<sub>total</sub> = C<sub>pedido</sub> + C<sub>manutenção</sub> + C<sub>ruptura</sub></i><br />
    <br />
    - <b>Custo Total Acumulado:</b> Ao longo do período de simulação é a soma dos custos totais diários.<br />
    <i>C<sub>total acumulado</sub> = ∑<sub>t=1</sub><sup>30</sup> C<sub>total</sub></i>
  </p>
</Card>
      </Content>
    </div>
  );
};

export default Dashboard;
