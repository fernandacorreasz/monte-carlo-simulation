import React from 'react';
import { Table } from 'antd';

interface SimulationResultsProps {
  results: SimulationResult[];
}

interface SimulationResult {
  day: number;
  demand: number;
  inventory: number;
  orderPlaced: boolean;
  totalCost: number;
}

const SimulationResults: React.FC<SimulationResultsProps> = ({ results }) => {
  const columns = [
    {
      title: 'Dia',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Demanda',
      dataIndex: 'demand',
      key: 'demand',
    },
    {
      title: 'Estoque',
      dataIndex: 'inventory',
      key: 'inventory',
    },
    {
      title: 'Pedido Realizado',
      dataIndex: 'orderPlaced',
      key: 'orderPlaced',
      render: (orderPlaced: boolean) => (orderPlaced ? 'Sim' : 'Não'),
    },
    {
      title: 'Custo Total',
      dataIndex: 'totalCost',
      key: 'totalCost',
    },
  ];

  return <Table columns={columns} dataSource={results} rowKey="day" style={{border: '1px solid #d4d4d4'}}/>;
};

export default SimulationResults;
