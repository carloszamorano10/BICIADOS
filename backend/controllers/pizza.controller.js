import { pizzaModel } from "../models/pizza.model.js";


const readPizzas = async (req, res) => {
  const pizzas = await pizzaModel.getPizzas();
  res.json(pizzas);
};

const readPizza = async (req, res) => {
  const { id } = req.params;
  const pizza = await pizzaModel.getPizza(id.toLowerCase());
  if (!pizza) {
    return res.status(404).json({ message: "Tour no Encontrado" });
  }
  res.json(pizza);
};
  const buscaproducto= async (req, res) => {
  const { id } = req.params;
  const pizza = await pizzaModel.getPizza(id.toLowerCase());
  if (!pizza) {
    return res.status(404).json({ message: "producto no Encontrado" });
  }
  res.json(pizza);
};
  
const register = async (req, res) => {
   console.log("BODY recibido:", req.body);
  try {
    console.log("BODY recibido:", req.body);
    const { id, name, desc,price, img, categoria} = req.body;
    
    

    if (!id.trim() || !name.trim()) {
      return res.status(400).json({ error: "Ingrese todos los campos requeridos" });
    }

    const newProducto = { id, name, price, desc, img, categoria }; 

    console.log("Datos recibidos:", newProducto);
    console.log("entro al backend register");

    await pizzaModel.nuevoProducto(newProducto); 

    return res.json(newProducto);
  } catch (error) {
    console.error("Error en register:", error);
    return res.status(500).json({ error: "Server error entro" });
  }
};

export const pizzaController = {
  readPizzas,
  readPizza,
  buscaproducto,
  register

};