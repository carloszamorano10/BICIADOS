import { VentaModel } from "../models/ventas.model.js";

const register = async (req, res) => {
  console.log("Llega al controlador de ventas");
  console.log("recibido en controlador ventas:", req.body);
  const { id_producto, id_usuario, cantidad } = req.body;
  console.log("Datos recibidos VENTA :", { id_producto, id_usuario, cantidad}); 
  try {
    const { id_producto, id_usuario, cantidad } = req.body;

  if (id_producto === undefined || id_usuario === undefined || cantidad === undefined) {
  return res.status(400).json({ error: "Faltan datos obligatorios." });
}

    const newventa = { id_producto, id_usuario, cantidad };

    await VentaModel.nuevaVenta(newventa);

    return res.status(201).json(newventa);
  } catch (error) {
    console.error("Error en register:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const readVentas = async (req, res) => {
  try {
    const ventas = await VentaModel.getVentas();
    res.json(ventas);
  } catch (error) {
    console.error("Error en read ventas :", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const VentasController = {
  register,
  readVentas
};