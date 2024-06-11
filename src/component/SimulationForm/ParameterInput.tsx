import React from 'react';
import { Form, InputNumber, Button, Row, Col } from 'antd';

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
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Média da Demanda Diária (média de unidades do produto requisitadas por dia)" name="meanDemand" initialValue={50}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Desvio Padrão da Demanda Diária (variabilidade na demanda diária)" name="stdDemand" initialValue={10}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Custo de Pedido (R$) (Custo fixo associado a cada pedido realizado)" name="orderCost" initialValue={100}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Custo de Manutenção por Unidade/Dia (R$) (Custo diário para manter uma unidade em estoque)" name="holdingCost" initialValue={1}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Custo de Ruptura por Unidade [R$] (falta de estoque, ou seja, quando a demanda não é atendida)" name="shortageCost" initialValue={5}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Lead Time - Dia (Tempo de entrega do fornecedor após um pedido ser realizado)" name="leadTime" initialValue={2}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Capacidade Máxima de Estoque (Quantidade máxima de unidades que podem ser armazenadas)" name="maxInventory" initialValue={200}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Nível de Reordem (Nível de estoque no qual um novo pedido é realizado para reabastecer o estoque)" name="reorderPoint" initialValue={50}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Simular
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ParameterInput;
