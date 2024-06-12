import React from 'react';
import { Drawer, Button, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { BarChartOutlined, MenuOutlined } from '@ant-design/icons';

const MenuMobile: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<MenuOutlined />}>
        Menu
      </Button>
      <Drawer title="Menu" placement="left" onClose={onClose} visible={visible}>
        <Menu.Item key="2" icon={<BarChartOutlined />}>
          <Link to="/monte-carlo-simulation/dashboard">Analise Gestão de Estoque</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<BarChartOutlined />}>
          <Link to="/monte-carlo-simulation/maximize-sales">Maximização de Vendas</Link>
        </Menu.Item>
      </Drawer>
    </>
  );
};

export default MenuMobile;
