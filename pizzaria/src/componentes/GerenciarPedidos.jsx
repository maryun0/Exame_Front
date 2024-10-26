import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import FormCadPedido from './Formularios/FormCadPedido.jsx'; 
import TabelaPedidos from './Tabelas/TabelaPedido.jsx'; 
import Pagina from './Templates/Pagina';
import { consultarTodos, gravar, alterar, excluir } from '../servicos/pedidoService';

const GerenciarPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');

    useEffect(() => {
        carregarPedidos();
    }, []);

    const carregarPedidos = async () => {
        try {
            const resultado = await consultarTodos();
            setPedidos(resultado);
        } catch (erro) {
            setMensagem('Erro ao carregar pedidos.');
            setTipoMensagem('danger');
        }
    };

    const handleGravar = async (dadosPedido) => {
        try {
            if (pedidoSelecionado) {
                await alterar(dadosPedido);
                setMensagem('Pedido atualizado com sucesso!');
            } else {
                await gravar(dadosPedido);
                setMensagem('Pedido gravado com sucesso!');
            }
            setTipoMensagem('success');
            carregarPedidos();
            setPedidoSelecionado(null);
        } catch (erro) {
            setMensagem('Erro ao gravar pedido.');
            setTipoMensagem('danger');
        }
    };

    const handleEditar = (pedido) => {
        setPedidoSelecionado(pedido);
    };

    const handleExcluir = async (codigo) => {
        try {
            await excluir(codigo);
            setMensagem('Pedido excluído com sucesso!');
            setTipoMensagem('success');
            carregarPedidos();
        } catch (erro) {
            setMensagem('Erro ao excluir pedido.');
            setTipoMensagem('danger');
        }
    };

    return (
        <Pagina titulo="Gerenciar Pedidos">
            {mensagem && <Alert variant={tipoMensagem}>{mensagem}</Alert>}

            <FormCadPedido
                onGravar={handleGravar}
                pedidoSelecionado={pedidoSelecionado}
                setPedidoSelecionado={setPedidoSelecionado}
            />

            <TabelaPedidos
                pedidos={pedidos}
                onEditar={handleEditar}
                onExcluir={handleExcluir}
            />
        </Pagina>
    );
};

export default GerenciarPedidos;
