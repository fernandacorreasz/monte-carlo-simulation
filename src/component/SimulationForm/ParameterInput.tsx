import React from 'react';
import { Form, InputNumber, Button } from 'antd';

interface ParameterInputProps {
  onSimulate: (params: SimulationParams) => void;
}

export interface SimulationParams {
  meanDemand: number;
  stdDemand: number;
  orderCost: number;
  holdingCost: number;
  shortageCost: number;
  leadTime: number;
  maxInventory: number;
  reorderPoint: number;
}

const ParameterInput: React.FC<ParameterInputProps> = ({ onSimulate }) => {
  const [form] = Form.useForm();

  const onFinish = (values: SimulationParams) => {
    onSimulate(values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Média da Demanda Diária" name="meanDemand" initialValue={50}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Desvio Padrão da Demanda Diária" name="stdDemand" initialValue={10}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Custo de Pedido ( R$)" name="orderCost" initialValue={100}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Custo de Manutenção por Unidade/Dia ( R$)" name="holdingCost" initialValue={1}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Custo de Ruptura por Unidade ( R$)" name="shortageCost" initialValue={5}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Lead Time (dias)" name="leadTime" initialValue={2}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Capacidade Máxima de Estoque" name="maxInventory" initialValue={200}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Nível de Reordem" name="reorderPoint" initialValue={50}>
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Simular
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ParameterInput;
