import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GerenciarClientes from './componentes/GerenciarClientes.jsx';      
import GerenciarPedidos from './componentes/GerenciarPedidos.jsx';     
import Pagina from './componentes/Templates/Pagina.jsx';             
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/clientes" element={<GerenciarClientes />} />  
        <Route path="/pedidos" element={<GerenciarPedidos />} />   
        <Route path="/*" element={<Pagina />} />                 
      </Routes>
    </Router>
  );
};

export default App;
