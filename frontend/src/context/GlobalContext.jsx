import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_API_URL;

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [admininistrador, setAdmininistrador] = useState([]);
  const [ventas, setVentas] = useState({});
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const savedFavorites = localStorage.getItem("biciFavorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
      } catch (error) {
        console.log("Error loading favorites from localStorage:", error);
        return [];
      }
    }
    return [];
  });
  const [bicilist, setBicislist] = useState([]);
  const [biciFav, setBicisFav] = useState([]);
  const [user, setUser] = useState("");
  const [userIsLogged, setUserIsLogged] = useState(() => {
    return Boolean(localStorage.getItem("token"));
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("biciFavorites", JSON.stringify(favorites));
      } catch (error) {
        console.log("Error saving favorites to localStorage:", error);
      }
    }
  }, [favorites]);

  const getBicis = async () => {
    const response = await fetch(`${API_URL}/api/pizzas`);
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
      console.log("Datos a enviar:", { name, desc, price, img, categoria });

      const response = await fetch(`${API_URL}/api/pizzas/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, desc, price, img, categoria }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en la respuesta:", response.status, errorText);
        Swal.fire({
          icon: "error",
          title: `Error ${response.status}`,
          text: errorText || "Error en la solicitud",
        });
        return false;
      }

      const data = await response.json();
      console.log("✅ Producto creado:", data);

      Swal.fire({
        icon: "success",
        text: "Producto registrado exitosamente",
      });

      await getBicis();
      navegar("/");
      return true;
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al registrar el producto",
      });
      return false;
    }
  };

  const handleLogin = async (
    email,
    password,
    nombre,
    apellido,
    tipoUsuario
  ) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          nombre,
          apellido,
          tipoUsuario,
        }),
      });

      const data = await response.json();
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
        text: "Inicio de sesión exitoso",
      });

      localStorage.setItem("token", data.token);
      setUserIsLogged(true);
      setUser(data.user);
      setAdmininistrador(data.user.tipoUsuario);
      navegar("/");
      console.log("aca", data);
      localStorage.setItem("codigousuario", data.user.id);
  
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
      const response = await fetch(`${API_URL}/api/auth/me`, {
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
      console.log("Registrando usuario:", { nombre, apellido, email });

      const response = await fetch(`${API_URL}/api/auth/register`, {
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
    setAdmininistrador(null);
    getBicis();
  };

  const eliminarBici = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/pizzas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la bicicleta");
      }

      const result = await response.json();

      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Bicicleta eliminada exitosamente",
      });

      getBicis();

      return result;
    } catch (error) {
      console.error("Error eliminando bicicleta:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la bicicleta",
      });
    }
  };


//favoritos!

const agregarFavorites = async (id_producto) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión",
        text: "Debes iniciar sesión para agregar favoritos",
      });
      return false;
    }

    if (!user || !user.id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo identificar al usuario",
      });
      return false;
    }

    const response = await fetch(`${API_URL}/api/pizzas/favs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_producto: id_producto, 
        id_usuario: user.id        
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al agregar favorito");
    }

    const data = await response.json();
    
    setFavorites(prevFavorites => {
      const newFavorites = [...prevFavorites, id_producto];
      return newFavorites;
    });

    Swal.fire({
      icon: "success",
      title: "¡Agregado!",
      text: "Producto agregado a favoritos",
      timer: 1500,
      showConfirmButton: false
    });

    return true;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    
    if (error.message.includes("ya existe")) {
      Swal.fire({
        icon: "info",
        title: "Ya en favoritos",
        text: "Este producto ya está en tus favoritos",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo agregar a favoritos",
      });
    }
    return false;
  }
};

const isFavorite = (id_producto) => {
  return favorites.includes(id_producto);
};

const eliminarFavorites = async (id_producto) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token || !user || !user.id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo identificar al usuario",
      });
      return false;
    }

    const response = await fetch(`${API_URL}/api/pizzas/favs/${id_producto}/${user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar favorito");
    }

    setFavorites(prevFavorites => 
      prevFavorites.filter(id => id !== id_producto)
    );

    Swal.fire({
      icon: "success",
      title: "Eliminado",
      text: "Producto eliminado de favoritos",
      timer: 1500,
      showConfirmButton: false
    });

    return true;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar de favoritos",
    });
    return false;
  }
};

const getFavBicis = async () => {
  try {
    if (!user || !user.id) {
      console.log("No hay usuario logueado para cargar favoritos");
      setBicisFav([]);
      return;
    }

    const response = await fetch(`${API_URL}/api/pizzas/favs/${user.id}`);
    
    if (!response.ok) {
      throw new Error("Error al cargar favoritos");
    }
    
    const data = await response.json();
    console.log("Favoritos cargados:", data);
    setBicisFav(data);
  } catch (error) {
    console.error("Error cargando favoritos:", error);
    setBicisFav([]);
  }
};

// ventas 
const handleRegisterVentas = async (id_producto, id_usuario, cantidad) => {
  try {
    console.log('esto trae');
    console.log({ id_producto, id_usuario, cantidad });

    const response = await fetch(`${API_URL}/api/ventas/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_producto, id_usuario, cantidad }),
    });

    if (!response.ok) {

      const errorText = await response.text();
      console.error('Error en la respuesta del servidor:', response.status, errorText);
      Swal.fire({
        icon: "error",
        title: Error `${response.status}`,
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

    await getBicis();
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


const getlasventas = async () => {
  const response = await fetch(`${API_URL}/api/ventas`);
  const data = await response.json();
  console.log('rescata las Ventas', data);
  setVentas(data); 
};

  const GrabaVentas = async (id_producto, id_usuario, cantidad) => {
  if (!ventas || !id_producto || !id_usuario || !cantidad) {
    console.warn("⚠️ Datos incompletos para grabar la venta:", ventas);
    return;
  }

  try {
    console.log("📦 Ventas que voy a grabar:", ventas);

    await handleRegisterVentas(
      id_producto,
      id_usuario,
      cantidad
    );

    console.log("✅ Venta registrada correctamente");
  } catch (error) {
    console.error("❌ Error al registrar venta:", error);
  }
};


  return (
    <GlobalContext.Provider
      value={{
        bicilist,
        admininistrador,
        getBicis,
        carrito,
        eliminarBici,
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
        handleRegisterProducto,
        agregarFavorites,
        isFavorite,
        eliminarFavorites,
        getFavBicis,
        biciFav,
        getlasventas,
        GrabaVentas,
        ventas, 
        setVentas
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
