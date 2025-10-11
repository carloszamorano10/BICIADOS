import { pizzaModel } from "../models/pizza.model.js";

const readPizzas = async (req, res) => {
  try {
    const pizzas = await pizzaModel.getPizzas();
    res.json(pizzas);
  } catch (error) {
    console.error("Error en readPizzas:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

const readPizza = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Buscando producto con ID:", id);
    
    const pizza = await pizzaModel.getPizza(id);
    
    if (!pizza) {
      return res.status(404).json({ 
        success: false,
        message: "Producto no encontrado" 
      });
    }
    
    res.json(pizza);
    
  } catch (error) {
    console.error("Error en readPizza:", error);
    res.status(500).json({ error: "Error al buscar producto" });
  }
};

const buscaproducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await pizzaModel.BuscaProducto(id);
    
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    
    res.json(producto);
    
  } catch (error) {
    console.error("Error en buscaproducto:", error);
    res.status(500).json({ error: "Error al buscar producto" });
  }
};

const register = async (req, res) => {
  try {
    console.log("BODY recibido:", req.body);
    const { name, desc, price, img, categoria } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ error: "Nombre y precio son requeridos" });
    }

    const newProducto = { name, price, desc, img, categoria };
    console.log("Datos a guardar:", newProducto);

    const productoGuardado = await pizzaModel.nuevoProducto(newProducto);
    
    return res.status(201).json({
      message: "Producto creado exitosamente",
      producto: productoGuardado
    });
    
  } catch (error) {
    console.error("Error en register:", error);
    return res.status(500).json({ error: "Error del servidor: " + error.message });
  }
};

const getAllProductos = async (req, res) => {
  try {
    const productos = await pizzaModel.getProductosModels();
    res.json(productos);
  } catch (error) {
    console.log("error =>", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Buscando producto con ID:", id);
    
    const producto = await pizzaModel.getPizza(id);
    
    if (!producto) {
      return res.status(404).json({ 
        success: false,
        message: "Producto no encontrado" 
      });
    }
    
    console.log("✅ Producto encontrado:", producto);
    res.json({
      success: true,
      producto
    });
    
  } catch (error) {
    console.error("❌ Error en getProductoById:", error);
    res.status(500).json({ 
      success: false,
      error: "Error al buscar el producto: " + error.message 
    });
  }
};



export const pizzaController = {
  readPizzas,
  readPizza,
  buscaproducto,
  register,
  getAllProductos,
  getProductoById
};

export { getAllProductos, getProductoById };
