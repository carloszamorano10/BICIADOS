import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Bici = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const volver = () => {
    navegar("/");
  };
  console.log(id);

  const [bicilist, setBicislist] = useState([]);

  const getBicis = async () => {
    const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
    const data = await response.json();
    console.log(data);
    setBicislist(data);
  };

  useEffect(() => {
    getBicis();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center m-5">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={bicilist.img}
            className="card-img-top"
            alt="imagen del producto seleccionado"
          />
          <div className="card-body">
            <h5 className="card-title">{bicilist.name}</h5>
            <h5 className="card-title">${bicilist.price}</h5>
            <p className="card-text">{bicilist.desc}</p>
            <button className="btn btn-primary" onClick={volver}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bici;
