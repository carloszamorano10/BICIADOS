import pool from "../Database/config.js"


const getPizzas = async () => {
  const sqlQuery = "SELECT * FROM productos";
  const response = await pool.query(sqlQuery);
  return response.rows;
};

const getPizza = async (id) => {
  try {
    console.log("🔍 Buscando en BD producto con ID:", id);
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      throw new Error("ID no válido");
    }
    
    const sqlQuery = "SELECT * FROM productos WHERE id = $1";
    const response = await pool.query(sqlQuery, [productId]);
    
    console.log("📊 Resultados encontrados:", response.rows.length);
    return response.rows[0];
    
  } catch (error) {
    console.error("❌ Error en getPizza model:", error);
    throw error;
  }
};

const BuscaProducto = async (id) => {
  return await getPizza(id);
};

const nuevoProducto = async (newp) => {
  const { name, price, desc, img, categoria } = newp;
  
  const sqlQuery = `
    INSERT INTO productos (name, price, descripcion, img, categoria) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *
  `;
  const values = [name, price, desc, img, categoria];
  const response = await pool.query(sqlQuery, values);
  return response.rows[0];
};

const getProductosModels = async () => {
  const sqlQuery = "SELECT * FROM productos";
  const response = await pool.query(sqlQuery);
  return response.rows;
};

const deleteBicisModels = async (id)=>{
    const sqlQuery = "DELETE FROM productos WHERE id = $1 RETURNING *"
    const values = [id]
    const result = await pool.query(sqlQuery, values)
    return result.rows
}

const favBici = async (id_producto, id_usuario) => {
    try {
        const sqlQuery = "INSERT INTO favoritos (id_producto, id_usuario) VALUES ($1, $2) RETURNING *" 
        const values = [id_producto, id_usuario]
        const result = await pool.query(sqlQuery, values)
        return result.rows[0] 
    } catch (error) {
        console.error('Error al agregar favorito:', error)
    }
}

const getBicisFav = async (id_usuario) => {
  const sqlQuery = `
    SELECT p.*, f.* 
    FROM productos p 
    INNER JOIN favoritos f ON p.id = f.id_producto 
    WHERE f.id_usuario = $1
  `;
  const response = await pool.query(sqlQuery, [id_usuario]);
  return response.rows;
};

const deleteFavorito = async (id_producto, id_usuario) => {
  try {
    const sqlQuery = `
      DELETE FROM favoritos 
      WHERE id_producto = $1 AND id_usuario = $2 
      RETURNING *
    `;
    const values = [id_producto, id_usuario];
    const result = await pool.query(sqlQuery, values);
    return result.rows[0]; 
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    throw error;
  }
};


export const pizzaModel = {
  getPizzas,
  getPizza,
  BuscaProducto,
  deleteBicisModels,
  nuevoProducto,
  getProductosModels,
  favBici,
  getBicisFav,
  deleteFavorito
};
