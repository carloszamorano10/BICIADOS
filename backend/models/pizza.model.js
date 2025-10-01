
import { readFile, writeFile } from "node:fs/promises";

const getPizzas = async () => {
  const data = await readFile("db/pizzas.json", "utf-8");
  return JSON.parse(data);
};

const getPizza = async (id) => {
  const pizzas = await getPizzas();
  return pizzas.find((pizza) => pizza.id === id);
};

//import { readFile, writeFile } from "node:fs/promises";

const BuscaProducto = async (id) => {
  const data = await readFile("db/pizzas.json", "utf-8");
  const productos = JSON.parse(data);
  return productos.find((producto) => producto.id === id);
};

const nuevoProducto = async (newp) => {
  const data = await readFile("db/pizzas.json", "utf-8");
  const nuevoProducto = JSON.parse(data);
  nuevoProducto.push(newp);
  await writeFile("db/pizzas.json", JSON.stringify(nuevoProducto, null, 2));
};


export const pizzaModel = {
  getPizzas,
  getPizza,
  BuscaProducto,
  nuevoProducto
};