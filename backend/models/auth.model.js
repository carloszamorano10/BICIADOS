import pool from "../Database/config.js";

const getUserByEmail = async (email) => {
  try {
    const sqlQuery = "SELECT * FROM usuarios WHERE email = $1";
    const response = await pool.query(sqlQuery, [email]);
    return response.rows[0];
  } catch (error) {
    console.error("❌ Error en getUserByEmail:", error);
    throw error;
  }
};

const addUser = async (newUser) => {
  try {
    const { nombre, apellido, email, password } = newUser;
    
    const sqlQuery = `
      INSERT INTO usuarios (nombre, apellido, email, password, tipoUsuario) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING id, nombre, apellido, email, tipoUsuario, created_at
    `;
    
    const values = [nombre, apellido, email, password, 'usuario'];
    const response = await pool.query(sqlQuery, values);
    return response.rows[0];
  } catch (error) {
    console.error("❌ Error en addUser:", error);
    
    if (error.code === '23505') {
      throw new Error("User already exists");
    }
    
    throw error;
  }
};

export const authModel = {
  getUserByEmail,
  addUser,
};