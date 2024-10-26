const urlBasePizza = "http://localhost:4000/pizza";

export const consultarTodasPizzas = async (token) => {
    const response = await fetch(urlBasePizza, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao consultar pizzas.');
    }

    const data = await response.json();
    return data.listaPizzas; 
};

export const gravar = async (pizza, token) => {
    const response = await fetch(urlBasePizza, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pizza),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao gravar pizza.');
    }

    const data = await response.json();
    return data;
};

export const alterar = async (pizza, token) => {
    const response = await fetch(urlBasePizza, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pizza),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao alterar pizza.');
    }

    const data = await response.json();
    return data;
};

export const excluir = async (codigo, token) => {
    const response = await fetch(urlBasePizza, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo }),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao excluir pizza.');
    }

    const data = await response.json();
    return data;
};
