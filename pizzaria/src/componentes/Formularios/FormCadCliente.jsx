import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const FormCadCliente = ({ onGravar, clienteSelecionado, setClienteSelecionado }) => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');

    useEffect(() => {
        if (clienteSelecionado) {
            setNome(clienteSelecionado.nome);
            setTelefone(clienteSelecionado.telefone);
            setEndereco(clienteSelecionado.endereco);
        } else {
            setNome('');
            setTelefone('');
            setEndereco('');
        }
    }, [clienteSelecionado]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onGravar({
            codigo: clienteSelecionado ? clienteSelecionado.codigo : undefined,
            nome,
            telefone,
            endereco,
        });
        
        setNome('');
        setTelefone('');
        setEndereco('');
        setClienteSelecionado(null); 
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNomeCliente">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o nome do cliente"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formTelefoneCliente">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o telefone do cliente"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formEnderecoCliente">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o endereço do cliente"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {clienteSelecionado ? 'Atualizar Cliente' : 'Adicionar Cliente'}
            </Button>
        </Form>
    );
};

export default FormCadCliente;
