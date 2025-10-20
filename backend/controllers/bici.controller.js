import { biciModel } from "../models/bici.model.js";

const readBicis = async (req, res) => {
  try {
    const bicis = await biciModel.getBicis();
    res.json(bicis);
  } catch (error) {
    console.error("Error en readbicis:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

const readBici = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Buscando producto con ID:", id);
    
    const bici = await biciModel.getBici(id);
    
    if (!bici) {
      return res.status(404).json({ 
        success: false,
        message: "Producto no encontrado" 
      });
    }
    
    res.json(bici);
    
  } catch (error) {
    console.error("Error en readBici:", error);
    res.status(500).json({ error: "Error al buscar producto" });
  }
};

const buscaproducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await biciModel.BuscaProducto(id);
    
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

    const productoGuardado = await biciModel.nuevoProducto(newProducto);
    
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
    const productos = await biciModel.getProductosModels();
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
    
    const producto = await biciModel.getBici(id);
    
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

const deleteBici = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🗑️ Eliminando producto con ID:", id);
    
    const productoEliminado = await biciModel.deleteBicisModels(id);
    
    if (!productoEliminado || productoEliminado.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }
    
    res.json({
      success: true,
      message: "Producto eliminado exitosamente",
      producto: productoEliminado[0]
    });
    
  } catch (error) {
    console.error("❌ Error en deleteBici:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar el producto: " + error.message
    });
  }
};

const creaFav = async (req, res) => {
  try {
    const { id_producto, id_usuario } = req.body;
    
    const newFav = await biciModel.favBici(id_producto, id_usuario);
    res.status(201).json(newFav);
  } catch (error) {
    console.log("error =>", error);
    res.status(500).json({ error: "Error al crear favorito" });
  }
};

const getAllFav = async (req, res) => {
  try {
    const { id_usuario } = req.params; 
    const productos = await biciModel.getBicisFav(id_usuario);
    res.json(productos);
  } catch (error) {
    console.log("error =>", error);
    res.status(500).json({ error: "Error al obtener productos favoritos" });
  }
};

const deleteFav = async (req, res) => {
  try {
    const { id_producto, id_usuario } = req.params;
    
    console.log("🗑️ Eliminando favorito:", { id_producto, id_usuario });
    
    const favoritoEliminado = await biciModel.deleteFavorito(id_producto, id_usuario);
    
    if (!favoritoEliminado) {
      return res.status(404).json({
        success: false,
        message: "Favorito no encontrado"
      });
    }
    
    res.json({
      success: true,
      message: "Favorito eliminado exitosamente",
      data: favoritoEliminado
    });
    
  } catch (error) {
    console.error("❌ Error en deleteFav:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar el favorito: " + error.message
    });
  }
};

export const biciController = {
  readBicis,
  readBici,
  buscaproducto,
  register,
  getAllProductos,
  getProductoById,
  deleteBici,
  creaFav,
  getAllFav,
  deleteFav
};

export { getAllProductos, getProductoById, deleteBici, creaFav, getAllFav, deleteFav };
