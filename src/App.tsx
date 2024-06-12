import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import Dashboard from './pages/Dashboard';
import Analise from './pages/Analise';
import MaximizeSales from './component/SimulationForm/MaximizeSales';

const { Content, Sider, Header } = Layout;

const App: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const menuItems = (
    <>
      <Menu.Item key="2" icon={<BarChartOutlined />}>
        <Link to="/monte-carlo-simulation/dashboard">Analise Gestão de Estoque</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<BarChartOutlined />}>
        <Link to="/monte-carlo-simulation/maximize-sales">Maximização de Vendas</Link>
      </Menu.Item>
      {/* <Menu.Item key="3" icon={<BarChartOutlined />}>
        <Link to="/monte-carlo-simulation/analise">Analise teste</Link>
      </Menu.Item> */}
    </>
  );

  return (
    <Router>
      <Layout style={{ minHeight: '100vh'}}>
        {isMobile ? (
          <Header style={{ background: '#001529', padding: 0 }}>
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
              {menuItems}
            </Menu>
          </Header>
        ) : (
          <Sider collapsible>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              {menuItems}
            </Menu>
          </Sider>
        )}
        <Layout className="site-layout" >
          <Content style={{ margin: isMobile ? '0px' : '0px', width: isMobile ? '100%' : '80rem' }}>
            <div className="site-layout-background" style={{ minHeight: 360 }}>
              <Routes>
                <Route path="/monte-carlo-simulation" element={<Dashboard />} />
                <Route path="/monte-carlo-simulation/dashboard" element={<Dashboard />} />
                <Route path="/analise" element={<Analise />} />
                <Route path="/monte-carlo-simulation/maximize-sales" element={<MaximizeSales />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
