import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Card, Divider, Pagination, Collapse } from "antd";
import ParameterInput, { SimulationParams } from "./ParameterInput";
import SimulationResults from "./SimulationResults";
import SimulationCharts from "./SimulationCharts";
import { useMediaQuery } from "react-responsive";

const { Panel } = Collapse;

interface SimulationResult {
  day: number;
  demand: number;
  inventory: number;
  orderPlaced: boolean;
  totalCost: number;
  sales: number;
}

const MaximizeSales: React.FC = () => {
  const [allResults, setAllResults] = useState<SimulationResult[][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const simulate = (params: SimulationParams) => {
    const simulations: SimulationResult[][] = [];
    for (let sim = 0; sim < 2000; sim++) {
      const simulationResults: SimulationResult[] = [];
      let inventory = params.maxInventory;
      let totalCost = 0;
      let totalSales = 0;

      for (let day = 1; day <= 365; day++) {
        const demand = Math.max(
          0,
          Math.round(params.meanDemand + params.stdDemand * (Math.random() - 0.5))
        );
        const sales = Math.min(demand, inventory);
        inventory -= sales;
        totalSales += sales;

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
          sales: totalSales,
        });
      }
      simulations.push(simulationResults);
    }
    setAllResults(simulations);
  };

  const resultsPerPage = 20;
  const currentResults = allResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <div>
      <Content
        style={{
          padding: isMobile ? "16px" : "24px",
          width: isMobile ? "100%" : "65rem",
          background: "rgb(245 245 245)",
        }}
      >
        <h2>Simulação de Monte Carlo - Maximização de Vendas</h2>
        <Card title="Descrição" bordered={false} style={{ marginBottom: "2%" }}>
          <p>
            O processo de simulação para maximização das vendas anuais envolve a análise de estoque e demanda para garantir a máxima disponibilidade de produtos e minimizar custos.
          </p>
        </Card>
        <Divider></Divider>
        <Card title="Coleta de Dados" bordered={false} style={{ marginBottom: "2%" }}>
          <ParameterInput onSimulate={simulate} />
        </Card>

        <Collapse style={{ marginBottom: "2%" }}>
          <Panel header={`Análise dos Resultados (${allResults.length} simulações realizadas)`} key="1" style={{ background: "#fff" }}>
            {currentResults.map((simulation, index) => (
              <SimulationResults key={index} results={simulation} />
            ))}
            <Divider></Divider>
            <Pagination
              current={currentPage}
              total={allResults.length}
              pageSize={resultsPerPage}
              onChange={setCurrentPage}
            />
          </Panel>
        </Collapse>

        <Card title="Análise Gráfica dos Resultados" bordered={false} style={{ marginBottom: "2%" }}>
          <SimulationCharts results={currentResults.flat()} />
        </Card>
        <Card title="Cálculos Matemáticos" bordered={false} style={{ marginBottom: "2%" }}>
          <p>
            <b>Definição de Distribuições de Probabilidade</b><br />
            A Demanda Diária é modelada como uma variável aleatória seguindo uma distribuição normal com média e desvio padrão definidos pelos parâmetros do usuário.<br />
          </p>
          <Divider />
          <p>
            <b>Desenvolvimento do Modelo de Simulação</b><br />
            A simulação é executada por um período fixo (ex.: 365 dias).<br />
            Diariamente, a demanda é gerada aleatoriamente com base na distribuição normal.<br />
            O estoque é ajustado subtraindo a demanda diária.<br />
            Quando o estoque atinge o nível de reordem, um novo pedido é realizado para reabastecer o estoque.<br />
            Os custos de manutenção e ruptura são calculados diariamente.<br />
          </p>
          <Divider />
          <p>
            <b>Execução das Simulações - Iteração Diária:</b> Para cada dia no período de simulação, realiza-se:<br />
            Geração da Demanda: Demanda diária é gerada aleatoriamente.<br />
            Ajuste de Estoque: Estoque é reduzido conforme a demanda.<br />
            Verificação de Reabastecimento: Se necessário, um pedido é realizado.<br />
            Cálculo de Custos: Custos de manutenção e ruptura são somados ao custo total.<br />
          </p>
          <Divider />
          <p>
            <b>Cálculos Matemáticos:</b><br />
            1. <b>Demanda Diária (D):</b><br />
            A demanda diária é modelada como uma variável aleatória seguindo uma distribuição normal com média (μ) e desvio padrão (σ).<br />
            <i>D = μ + σ × Z</i><br />
            onde Z é um valor aleatório da distribuição normal padrão.<br />
          </p>
          <Divider />
          <p>
            2. <b>Nível de Estoque (I):</b><br />
            O nível de estoque é ajustado diariamente subtraindo a demanda diária.<br />
            <i>I<sub>t+1</sub> = I<sub>t</sub> - D<sub>t</sub></i>
          </p>
          <Divider />
          <p>
            3. <b>Reabastecimento:</b><br />
            Quando o nível de estoque cai para ou abaixo do nível de reordem (R), um pedido é realizado para reabastecer o estoque até a capacidade máxima (Q<sub>max</sub>).<br />
            <i>Se I<sub>t+1</sub> ≤ R, então I<sub>t+1</sub> = Q<sub>max</sub> e C<sub>pedido</sub> = C<sub>p</sub></i><br />
            onde C<sub>p</sub> é o custo do pedido.<br />
          </p>
          <Divider />
          <p>
            4. <b>Cálculo dos Custos:</b><br />
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
            <i>C<sub>total acumulado</sub> = ∑<sub>t=1</sub><sup>365</sup> C<sub>total</sub></i>
          </p>
        </Card>
      </Content>
    </div>
  );
};

export default MaximizeSales;
