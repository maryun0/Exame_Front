const urlBaseCliente = "http://localhost:4000/cliente";

export const consultarTodosClientes = async (token) => {
    const response = await fetch(urlBaseCliente, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao consultar clientes.');
    }

    const data = await response.json();
    return data.listaClientes; 
};

export const gravar = async (cliente, token) => {
    const response = await fetch(urlBaseCliente, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao gravar cliente.');
    }

    const data = await response.json();
    return data;
};

export const alterar = async (cliente, token) => {
    const response = await fetch(urlBaseCliente, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao alterar cliente.');
    }

    const data = await response.json();
    return data;
};

export const excluir = async (codigo, token) => {
    const response = await fetch(urlBaseCliente, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo }),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao excluir cliente.');
    }

    const data = await response.json();
    return data;
};
