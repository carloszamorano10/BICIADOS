import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import CardBici from "../components/CardBici";

function Favoritos() {
  const { favorites } = useContext(GlobalContext);
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="100" 
            height="100" 
            fill="#dee2e6" 
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
          <h3 className="text-muted mt-3">No tienes bicicletas favoritas</h3>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate("/")}
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Mis Favoritos ({favorites.length})</h1>
        <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
          ← Volver
        </button>
      </div>

      <div className="row">
        {favorites.map((bici) => (
          <div key={bici.id} className="col-lg-4 col-md-6 mb-4">
            <CardBici
              id={bici.id}
              name={bici.name}
              price={bici.price}
              categoria={bici.categoria}
              img={bici.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favoritos;