
import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Pagina = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Sistema de Gestão de Pizzaria
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Button variant="outline-light" onClick={() => navigate('/clientes')} className="mr-2">
            Clientes
          </Button>
          <Button variant="outline-light" onClick={() => navigate('/pedidos')} className="mr-2">
            Pedidos
          </Button>
        </Nav>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Pagina;
