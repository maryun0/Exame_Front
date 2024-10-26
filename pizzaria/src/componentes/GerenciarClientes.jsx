import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import FormCadCliente from './Formularios/FormCadCliente.jsx'; 
import TabelaClientes from './Tabelas/TabelaCliente.jsx'; 
import Pagina from './Templates/Pagina';
import { consultarTodosClientes, gravar, alterar, excluir } from '../servicos/clienteService';

const GerenciarClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');

    useEffect(() => {
        carregarClientes();
    }, []);

    const carregarClientes = async () => {
        try {
            const resultado = await consultarTodosClientes();
            setClientes(resultado);
        } catch (erro) {
            setMensagem('Erro ao carregar clientes.');
            setTipoMensagem('danger');
        }
    };

    const handleGravar = async (dadosCliente) => {
        try {
            if (clienteSelecionado) {
                await alterar(dadosCliente);
                setMensagem('Cliente atualizado com sucesso!');
            } else {
                await gravar(dadosCliente);
                setMensagem('Cliente gravado com sucesso!');
            }
            setTipoMensagem('success');
            carregarClientes();
            setClienteSelecionado(null);
        } catch (erro) {
            setMensagem('Erro ao gravar cliente.');
            setTipoMensagem('danger');
        }
    };

    const handleEditar = (cliente) => {
        setClienteSelecionado(cliente);
    };

    const handleExcluir = async (codigo) => {
        try {
            await excluir(codigo);
            setMensagem('Cliente excluído com sucesso!');
            setTipoMensagem('success');
            carregarClientes();
        } catch (erro) {
            setMensagem('Erro ao excluir cliente.');
            setTipoMensagem('danger');
        }
    };

    return (
        <Pagina titulo="Gerenciar Clientes">
            {mensagem && <Alert variant={tipoMensagem}>{mensagem}</Alert>}

            <FormCadCliente
                onGravar={handleGravar}
                clienteSelecionado={clienteSelecionado}
                setClienteSelecionado={setClienteSelecionado}
            />

            <TabelaClientes
                clientes={clientes}
                onEditar={handleEditar}
                onExcluir={handleExcluir}
            />
        </Pagina>
    );
};

export default GerenciarClientes;
