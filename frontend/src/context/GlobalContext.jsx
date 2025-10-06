import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedFavorites = localStorage.getItem('biciFavorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
      } catch (error) {
        console.log('Error loading favorites from localStorage:', error);
        return [];
      }
    }
    return [];
  });
  const [bicilist, setBicislist] = useState([]);
  const [user, setUser] = useState("");
  const [userIsLogged, setUserIsLogged] = useState(() => {
    return Boolean(localStorage.getItem("token"));
  });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('biciFavorites', JSON.stringify(favorites));
      } catch (error) {
        console.log('Error saving favorites to localStorage:', error);
      }
    }
  }, [favorites]);

  const getBicis = async () => {
    const response = await fetch("http://localhost:5000/api/pizzas");
    const data = await response.json();
    console.log(data);
    setBicislist(data);
  };

  const subtotal = carrito.reduce(
    (acc, Bici) => acc + Bici.price * (Bici.quantity || 1),
    0
  );

  const totalCart = subtotal;

  const navegar = useNavigate();

  const handleRegisterProducto = async (name, desc, price, img, categoria) => {
    try {
      console.log('Datos a enviar:', { name, desc, price, img, categoria });
      
      const response = await fetch("http://localhost:5000/api/pizzas/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, desc, price, img, categoria }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error en la respuesta:', response.status, errorText);
        Swal.fire({
          icon: "error",
          title: `Error ${response.status}`,
          text: errorText || "Error en la solicitud",
        });
        return false;
      }

      const data = await response.json();
      console.log('✅ Producto creado:', data);

      Swal.fire({
        icon: "success",
        text: "Producto registrado exitosamente",
      });

      // Actualizar la lista de productos
      await getBicis();
      navegar("/");
      return true;

    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al registrar el producto",
      });
      return false;
    }
  };

  const handleLogin = async (email, password, nombre, apellido) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nombre, apellido }),
      });

      const data = await response.json();
      console.log(data)
      if (data?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${data.error}`,
        });
        return false;
      }

      Swal.fire({
        icon: "success",
        text: "Inicio de sesión exitoso",
      });

      localStorage.setItem("token", data.token);
      setUserIsLogged(true);
      setUser(data.user); 
      navegar("/");
      return true;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al intentar iniciar sesión",
      });
      return false;
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener datos del usuario");
      }

      const userData = await response.json();
      setUser(userData);
      setUserIsLogged(true);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cargar la información del usuario",
      });
      handleLogout2();
      return null;
    }
  };


  const handleRegister = async (nombre, apellido, email, password) => {
    try {
      console.log('Registrando usuario:', { nombre, apellido, email });
      
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email, password }),
      });

      const data = await response.json();

      if (data?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${data.error}`,
        });
        return false;
      }

      Swal.fire({
        icon: "success",
        text: "Registro exitoso",
      });
      
      localStorage.setItem("token", data.token);
      setUserIsLogged(true);
      setUser(data.user); 
      navegar("/");
      return true;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al intentar registrarte",
      });
      return false;
    }
  };
 
  const handleLogout2 = () => {
    Swal.fire({
      icon: "success",
      text: "Sesión cerrada exitosamente",
    });
    localStorage.removeItem("token");
    setUser(null);
    setUserIsLogged(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        bicilist,
        getBicis,
        carrito,
        setCarrito,
        totalCart,
        user,
        favorites,
        setFavorites,
        setUser,
        userIsLogged,
        setUserIsLogged,
        handleLogin,
        fetchUserData,
        handleLogout2,
        handleRegister, 
        handleRegisterProducto
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
