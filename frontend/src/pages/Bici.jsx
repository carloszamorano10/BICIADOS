import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const Bici = () => {
  const { id } = useParams();
  const navegar = useNavigate();

  const [bici, setBici] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBici = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔍 Buscando producto con ID:", id);

      const response = await fetch(`${API_URL}/api/pizzas/${id}`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("📦 Datos recibidos del backend:", data);

      // El backend devuelve { success: true, producto: {...} }
      if (data.success && data.producto) {
        setBici(data.producto);
      } else {
        setError("Producto no encontrado");
      }
    } catch (error) {
      console.error("❌ Error al cargar el producto:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getBici();
    }
  }, [id]);

  const volver = () => {
    navegar("/");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center m-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !bici) {
    return (
      <div className="d-flex justify-content-center m-5">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title text-danger">Error</h5>
            <p className="card-text">{error || "Producto no encontrado"}</p>
            <button className="btn btn-primary" onClick={volver}>
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center m-5">
      <div className="card" style={{ width: "24rem" }}>
        <img
          src={bici.img}
          className="card-img-top"
          alt={bici.titulo}
          style={{ height: "300px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x300?text=Imagen+no+disponible";
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{bici.titulo}</h5>
          <h5 className="card-title text-success">
            ${parseFloat(bici.price || 0).toLocaleString("es-CL")}
          </h5>
          <p className="card-text">{bici.descripcion}</p>
          <p className="card-text">
            <small className="text-muted">
              Categoría: {bici.categoria || "Sin categoría"}
            </small>
          </p>
          <button className="btn btn-primary" onClick={volver}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bici;
