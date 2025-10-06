import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import CardBici from "../components/CardBici";
import { GlobalContext } from "../context/GlobalContext";

function Products() {
  const { bicilist, getBicis } = useContext(GlobalContext);

  useEffect(() => {
    getBicis();
  }, []);

  return (
    <>
      <Header />
      <h2 className="text-center p-5 fs-1">Productos</h2>
      <div className="contbici">
        {bicilist.map((Bici) => (
          <CardBici
            key={Bici.id}
            id={Bici.id}
            name={Bici.titulo}
            price={Bici.price}
            categoria={Bici.categoria}
            img={Bici.img}
          />
        ))}
      </div>
    </>
  );
}

export default Products;
