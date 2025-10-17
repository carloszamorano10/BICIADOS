import pool from '../Database/config.js';

const nuevaVenta = async ({ id_producto, id_usuario, cantidad }) => {
  await pool.query(
    'INSERT INTO ventas (id_producto, id_usuario, cantidad) VALUES ($1, $2, $3)',
    [id_producto, id_usuario, cantidad]
  );
};

const getVentas = async () => {
  const result = await pool.query(`
    SELECT 
      v.id as id_venta, 
      v.id_usuario, 
      u.nombre, 
      u.apellido, 
      v.cantidad, 
      v.created_at,
      p.name as nombre_producto,
      p.price as precio_unitario
    FROM ventas v
    JOIN usuarios u ON v.id_usuario = u.id
    JOIN productos p ON v.id_producto = p.id
    ORDER BY v.created_at DESC
  `);
  console.log(result.rows);
  return result.rows;
};

export const VentaModel = {
  nuevaVenta,
  getVentas
};