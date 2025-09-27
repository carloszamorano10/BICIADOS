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
          <i class="fa-regular fa-heart fa-7x"></i>
          <h3 className="text-muted mt-3">No tienes productos en tus favoritos</h3>
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