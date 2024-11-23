export const API_URL = "https://fishnet-api-py.onrender.com";

function parseProduct(prod) {
  return {
    ...prod,
    id: prod._id,
    quantity: 5,
    feeding: String(prod.feeding),
    tankSize: String(prod.tank_size),
    sizes: prod.size.match(/(\d*\scm)+/g) || ["Tamanho não informado"],
  };

}

function parseSale(sale) {
  return {
    ...sale,
    id: sale._id,  // Preservando o ID original
    customer: {
      id: sale.customer._id,
      name: sale.customer.name,
    },
    date: new Date(sale.date).toISOString(), // Convertendo a data para o formato ISO
    items: sale.items.map(item => ({
      ...item,
      size: item.size && item.size.match(/\d+\s?cm/g) || ["Tamanho não informado"], // Melhor regex
    })),    
    payment: {
      method: sale.payment_method,
      provider: sale.payment_provider,
    },
    shipping: sale.shipping,
    tax: sale.tax,
    total: sale.total,
    status: sale.status,
  };
}

export async function listAllProducts(page = 1, limit = 20) {
  try {
    const data = await fetch(`${API_URL}/prods`);
    const prods = await data.json();
    const start = (page - 1) * limit;
    const end = start + limit;
    return prods.slice(start, end).map(parseProduct);
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export async function getProductByFilter(filters) {
  try {
    // Filtra o objeto `filters`, removendo chaves com valores nulos, indefinidos ou vazios
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== null && value !== undefined && value !== ""
      )
    );

    // Constrói a query apenas com os filtros selecionados
    const query = new URLSearchParams(filteredFilters).toString();
    const data = await fetch(`${API_URL}/prods/filtros?${query}`);
    const prods = await data.json();

    if (!Array.isArray(prods.match)) {
      return [];
    }

    return prods.match.map(parseProduct); // prods.page_count
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export async function getSalesByFilter(filters) {
  try {
    // Filtra o objeto `filters`, removendo chaves com valores nulos, indefinidos ou vazios
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== null && value !== undefined && value !== ""
      )
    );

    // Constrói a query apenas com os filtros selecionados
    const query = new URLSearchParams(filteredFilters).toString();
    const data = await fetch(`${API_URL}/sales/filter?${query}`);
    const sales = await data.json();

    if (!Array.isArray(sales)) {
      return [];
    }
    console.log("URL da requisição: ", data);
    return sales.map(parseSale);
  } catch (error) {
    console.error(error.message);
    return [];
  }
}


export async function getProductById(id) {
  const data = await fetch(`${API_URL}/prods/${id}`);
  const prod = await data.json();
  return parseProduct(prod);
}

export async function listUsersByRole(role, page = 1, limit = 10) {
  try {
    let users = [];

    if (typeof role === "object") {
      for (const r of role) {
        const req = await fetch(`${API_URL}/users/role/${r}`);
        const data = await req.json();
        users = users.concat(data);
      }
    } else {
      const data = await fetch(`${API_URL}/users/role/${role}`);
      users = await data.json();
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    return users.slice(start, end);
  } catch (error) {
    console.error(error.message);
    return [];
  }
}


