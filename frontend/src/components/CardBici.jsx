import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CardBici({ id, name, price, categoria, img }) {
  const { setCarrito, favorites, setFavorites, admininistrador, eliminarBici, userIsLogged, user, agregarFavorites, eliminarFavorites, isFavorite} = useContext(GlobalContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
    setIsLiked(favorites.includes(id));
  }, [favorites, id]);


  const getCategoriasParaMostrar = () => {
    if (!categoria) return ["Sin categoría"];

    if (Array.isArray(categoria)) {
      return categoria;
    }

    return [categoria];
  };

  const categoriasParaMostrar = getCategoriasParaMostrar();

  const handleAdd = async () => {
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    setCarrito((prevCarrito) => {
      const BiciExistente = prevCarrito.find((item) => item.id === id);
      if (BiciExistente) {
        return prevCarrito.map((item) =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevCarrito, { id, name, price, categoria, img, quantity: 1 }];
    });
    setIsAdding(false);
  };


  const irBici = () => {
    navigate(`/bici/${id}`);
  };

// favorito

const handleFavoriteClick = async () => {
    if (!userIsLogged) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión",
        text: "Debes iniciar sesión para agregar favoritos",
      });
      return;
    }
    
    if (isFavorite(id)) {
      await eliminarFavorites(id);
    } else {
      await agregarFavorites(id);
    }
  };



  return (
    <div className="Bici-card card h-100 shadow-sm hover-shadow">
      <div className="card-img-top position-relative">
        <img
          src={img}
          alt={`Bici ${name}`}
          className="img-fluid"
          style={{ height: "180px", objectFit: "cover", width: "100%" }}
          loading="lazy"
        />

        <button
          className="position-absolute top-0 start-0 bg-white rounded-circle border-0 m-2"
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
          onClick={handleFavoriteClick}
          aria-label={isFavorite(id) ? "❤️ Quitar" : "🤍 Agregar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill={isLiked ? "#dc3545" : "#6c757d"}
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        </button>

        <span className="position-absolute top-0 end-0 bg-success text-white px-2 py-1 rounded-bl">
          ${parseFloat(price || 0).toLocaleString("es-CL")}
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <h2
          className="card-title h5 text-truncate text-center mb-4"
          title={name}
        >
          {name}
        </h2>

        <div className="categoria mb-2 flex-grow-1">
          <h3 className="h6">Categoría:</h3>
          <ul className="list">
            {categoriasParaMostrar.map((ingredient, index) => (
              <li key={index} className="mb-1 d-flex align-items-center">
                <span>
                  - {ingredient.charAt(0)}
                  {ingredient.slice(1)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="buttons d-grid gap-2">
          <button
            className="btn btn-dark"
            onClick={handleAdd}
            disabled={isAdding}
            aria-label={`Añadir Bici ${name} al carrito`}
          >
            {isAdding ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Añadiendo...
              </>
            ) : (
              "Añadir al Carrito"
            )}
          </button>
          <button className="btn btn-dark" onClick={irBici}>
            Ver más
          </button>

       {admininistrador && admininistrador === "admin" && (
      <button className="btn btn-dark"  onClick={() => eliminarBici(id)}>
            Eliminar
          </button>
    )}

        </div>
      </div>
    </div>
  );
}

CardBici.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  categoria: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  img: PropTypes.string.isRequired,
};

CardBici.defaultProps = {
  categoria: "Sin categoría",
};

export default CardBici;