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

  const handleRegisterProducto = async ( id, name, desc, price,img, categoria) => {
  try {
    console.log('esto trae');
    console.log({ id, name, desc, price, img, categoria});
    
    const response = await fetch("http://localhost:5000/api/pizzas/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, desc, price, img, categoria }),
    });

    if (!response.ok) {
      
      const errorText = await response.text();
      console.error('Error en la respuesta del servidor:', response.status, errorText);
      Swal.fire({
        icon: "error",
        title: `Error ${response.status}`,
        text: errorText || "Error en la solicitud",
      });
      return false;
    }

    const data = await response.json();
    console.log('paso 1');
    console.log(data);

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

    navegar("/");
    return true;

  } catch (error) {
    console.error('Error capturado en catch:', error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error al intentar registrar el producto",
    });
    return false;
  }
};

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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

  const handleRegister = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
      text: "Logout exitoso, ¡nos vemos!",
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
