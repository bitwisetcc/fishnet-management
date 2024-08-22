const API_URL = "https://fishnet-api-py.onrender.com"

function parseProduct(prod) {
  return {
    ...prod,
    id: prod._id,
    quantity: 5,
    feeding: String(prod.feeding),
    tankSize: String(prod.tank_size),
    sizes: prod.size.match(/(\d*\scm)+/g) || ["Tamanho não informado"],
    price: Number(prod.price.replace("$", "").trim()),
  };
}

export async function listAllProducts(page = 1, limit = 10) {
  try {
    const data = await fetch(`${API_URL}/itens`);
    const prods = await data.json();
    const start = (page - 1) * limit;
    const end = start + limit;
    return prods.slice(start, end).map(parseProduct);
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export async function getProductById(id) {
  const data = await fetch(`${API_URL}/itens/${id}`);
  const prod = await data.json();
  return parseProduct(prod);
}