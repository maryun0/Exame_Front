import React, { useState } from 'react';
import { Table, Form, FormControl, Button } from 'react-bootstrap';

const TabelaPedidos = ({ pedidos, onEditar, onExcluir }) => {
    const [termoBusca, setTermoBusca] = useState(''); 

   
    const pedidosFiltrados = pedidos.filter((pedido) => {
        const termo = termoBusca.toLowerCase();
        const nomeCliente = pedido.cliente?.nome?.toLowerCase().includes(termo) || false;
        const pizzaFiltrada = pedido.itens.some((item) =>
            item.pizza?.nomePizza?.toLowerCase().includes(termo) || false
        );
        return nomeCliente || pizzaFiltrada;
    });

    return (
        <>
            <Form className="mb-3 d-flex">
                <FormControl
                    type="text"
                    placeholder="Pesquisar por cliente ou pizza"
                    className="mr-sm-2"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                />
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Pizzas</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidosFiltrados.map((pedido) => (
                        <tr key={pedido.codigo}>
                            <td>{pedido.cliente?.nome || "N/A"}</td>
                            <td>
                                {pedido.itens.map((item, index) => (
                                    <div key={index}>
                                        {item.pizza?.nomePizza || "Pizza não encontrada"} - {item.quantidade}x
                                    </div>
                                ))}
                            </td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="mr-2"
                                    onClick={() => onEditar(pedido)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => onExcluir(pedido.codigo)}
                                >
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default TabelaPedidos;
