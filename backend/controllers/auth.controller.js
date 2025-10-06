import "dotenv/config";
import jwt from "jsonwebtoken";
import { authModel } from "../models/auth.model.js";
import { isValidEmail } from "../utils/validators/email.validate.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const user = await authModel.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.password === password) {
      const payload = { email, id: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return res.json({ 
        email, 
        token,
        user: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          tipoUsuario: user.tipousuario
        }
      });
    }

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const payload = { email, id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.json({ 
          email, 
          token,
          user: {
            id: user.id,
            email: user.email,
            nombre: user.nombre,
            apellido: user.apellido,
            tipoUsuario: user.tipousuario
          }
        });
      }
    } catch (bcryptError) {
      console.log("Contraseña no hasheada, usando comparación directa");
    }

    return res.status(400).json({ error: "Invalid password" });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const register = async (req, res) => {
  try {
    const { nombre, apellido, email = "", password = "" } = req.body;

    if (!nombre || !apellido || !email.trim() || !password.trim()) {
      return res.status(400).json({ 
        error: "Nombre, apellido, email and password are required" 
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const user = await authModel.getUserByEmail(email);
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = { 
      nombre,
      apellido,
      email, 
      password: hashedPassword 
    };
    
    const userCreated = await authModel.addUser(newUser);

    const payload = { 
      email, 
      id: userCreated.id,
      nombre: userCreated.nombre,
      apellido: userCreated.apellido
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({ 
      email, 
      token,
      user: {
        id: userCreated.id,
        nombre: userCreated.nombre,
        apellido: userCreated.apellido,
        email: userCreated.email,
        tipoUsuario: userCreated.tipousuario
      }
    });
  } catch (error) {
    console.error("Error en register:", error);
    
    if (error.message === "User already exists") {
      return res.status(400).json({ error: "User already exists" });
    }
    
    return res.status(500).json({ error: "Server error: " + error.message });
  }
};

const me = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await authModel.getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    return res.json({ 
      email, 
      id: user.id,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        tipoUsuario: user.tipousuario
      }
    });
  } catch (error) {
    console.error("Error en me:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const authController = {
  login,
  register,
  me,
};