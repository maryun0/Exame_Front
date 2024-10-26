const urlBase = 'http://localhost:4000/pedido';

export const consultarTodos = async (token) => {
    const response = await fetch(urlBase, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao consultar pedidos.');
    }

    const data = await response.json();
    return data.listaPedidos;  
};

export const gravar = async (pedido, token) => {
    const response = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao gravar pedido.');
    }

    const data = await response.json();
    return data;  
};

export const alterar = async (pedido, token) => {
    const response = await fetch(urlBase, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao alterar pedido.');
    }

    const data = await response.json();
    return data; 
};

export const excluir = async (codigo, token) => {
    const response = await fetch(urlBase, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo }),  
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao excluir pedido.');
    }

    const data = await response.json();
    return data; 
};