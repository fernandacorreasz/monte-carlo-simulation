import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components';

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

const StyledTable = styled(Table)`
  @media (max-width: 768px) {
    .ant-table-wrapper .ant-table-thead > tr > th {
      padding: 10px 10px !important;
    }

    .ant-table-cell {
      padding: 10px 10px !important;
    }
  }
`;

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

  return <StyledTable columns={columns} dataSource={results} rowKey="day" style={{ border: '1px solid #d4d4d4' }} />;
};

export default SimulationResults;
