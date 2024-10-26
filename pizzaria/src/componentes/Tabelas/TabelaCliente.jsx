import React, { useState } from 'react';
import { Table, Form, FormControl, Button } from 'react-bootstrap';

const TabelaClientes = ({ clientes, onEditar, onExcluir }) => {
    const [termoBusca, setTermoBusca] = useState(''); 

    const clientesFiltrados = clientes.filter((cliente) => 
        cliente.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return (
        <>
            <Form className="d-flex mb-3">
                <FormControl
                    type="text"
                    placeholder="Pesquisar por nome"
                    className="me-2"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                />
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesFiltrados.map((cliente) => (
                        <tr key={cliente.codigo}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.endereco}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => onEditar(cliente)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => onExcluir(cliente.codigo)}
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

export default TabelaClientes;
