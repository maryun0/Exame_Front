import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { consultarTodosClientes as consultarClientes } from '../../servicos/clienteService';
import { consultarTodasPizzas as consultarPizzas } from '../../servicos/pizzaService';

const FormCadPedido = ({ onGravar, pedidoSelecionado, setPedidoSelecionado }) => {
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [pizzasSelecionadas, setPizzasSelecionadas] = useState([]);
    const [quantidadePizzas, setQuantidadePizzas] = useState({});
    const [clientes, setClientes] = useState([]);
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        if (pedidoSelecionado) {
            setClienteSelecionado(pedidoSelecionado.cliente.codigo);
            setPizzasSelecionadas(pedidoSelecionado.itens.map(item => item.pizza.codigo));
            setQuantidadePizzas(pedidoSelecionado.itens.reduce((acc, item) => {
                acc[item.pizza.codigo] = item.quantidade;
                return acc;
            }, {}));
        } else {
            setClienteSelecionado('');
            setPizzasSelecionadas([]);
            setQuantidadePizzas({});
        }

        const carregarClientes = async () => {
            try {
                const resultadoClientes = await consultarClientes();
                setClientes(resultadoClientes);
            } catch (erro) {
                console.error('Erro ao carregar clientes:', erro);
            }
        };

        const carregarPizzas = async () => {
            try {
                const resultadoPizzas = await consultarPizzas();
                setPizzas(resultadoPizzas);
            } catch (erro) {
                console.error('Erro ao carregar pizzas:', erro);
            }
        };

        carregarClientes();
        carregarPizzas();
    }, [pedidoSelecionado]);

    const handlePizzaChange = (codigoPizza, quantidade) => {
        setQuantidadePizzas({
            ...quantidadePizzas,
            [codigoPizza]: quantidade
        });
    };

    const handlePizzaSelection = (codigo, isSelected) => {
        const novasPizzasSelecionadas = isSelected
            ? [...pizzasSelecionadas, codigo]
            : pizzasSelecionadas.filter(c => c !== codigo);

        setPizzasSelecionadas(novasPizzasSelecionadas);

        if (!isSelected) {
            const updatedQuantities = { ...quantidadePizzas };
            delete updatedQuantities[codigo];
            setQuantidadePizzas(updatedQuantities);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        const itens = pizzasSelecionadas.map(codigo => ({
            pizza: { codigo },
            quantidade: quantidadePizzas[codigo] || 1
        }));

        onGravar({
            codigo: pedidoSelecionado ? pedidoSelecionado.codigo : undefined,
            cliente: { codigo: clienteSelecionado },
            itens
        });

       
        setClienteSelecionado('');
        setPizzasSelecionadas([]);
        setQuantidadePizzas({});
        setPedidoSelecionado(null);
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group controlId="formCliente">
                <Form.Label>Cliente</Form.Label>
                <Form.Control
                    as="select"
                    value={clienteSelecionado}
                    onChange={(e) => setClienteSelecionado(Number(e.target.value))}
                    required
                >
                    <option value="">Selecione um cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.codigo} value={cliente.codigo}>
                            {cliente.nome} - {cliente.telefone}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPizzas">
                <Form.Label>Pizzas</Form.Label>
                {pizzas.map(pizza => (
                    <div key={pizza.codigo} className="d-flex align-items-center">
                        <Form.Check
                            type="checkbox"
                            label={`${pizza.nomePizza} - R$${pizza.preco}`}
                            value={pizza.codigo}
                            checked={pizzasSelecionadas.includes(pizza.codigo)}
                            onChange={(e) => handlePizzaSelection(pizza.codigo, e.target.checked)}
                        />
                        {pizzasSelecionadas.includes(pizza.codigo) && (
                            <Form.Control
                                type="number"
                                placeholder="Quantidade"
                                min="1"
                                value={quantidadePizzas[pizza.codigo] || 1}
                                onChange={(e) => handlePizzaChange(pizza.codigo, parseInt(e.target.value))}
                                style={{ width: '80px', marginLeft: '10px' }}
                            />
                        )}
                    </div>
                ))}
            </Form.Group>

            <Button variant="primary" type="submit">
                {pedidoSelecionado ? 'Atualizar Pedido' : 'Adicionar Pedido'}
            </Button>
        </Form>
    );
};

export default FormCadPedido;
