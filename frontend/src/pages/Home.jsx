import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import CardBici from "../components/CardBici";
import { GlobalContext } from "../context/GlobalContext";
import Map from "../components/Map";
import Carrusel from "../components/Carrusel";

function Home() {
  const { bicilist, getBicis } = useContext(GlobalContext);

  useEffect(() => {
    getBicis();
  }, []);

  return (
    <>
      <Header />
      <Carrusel />
      <h2 className="text-center">Productos</h2>
      <div className="contbici">
        {bicilist.map((Bici) => (
          <CardBici
            key={Bici.id}
            id={Bici.id}
            name={Bici.name}
            price={Bici.price}
            categoria={Bici.categoria}
            img={Bici.img}
          />
        ))}
      </div>
      <Map />
    </>
  );
}

export default Home;
