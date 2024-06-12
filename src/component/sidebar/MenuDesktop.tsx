import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { BarChartOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const MenuDesktop: React.FC = () => (
  <Sider collapsible>
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="2" icon={<BarChartOutlined />}>
        <Link to="/monte-carlo-simulation/dashboard">Analise Gestão de Estoque</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<BarChartOutlined />}>
        <Link to="/monte-carlo-simulation/maximize-sales">Maximização de Vendas</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default MenuDesktop;
