import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Cardpizza from "../components/Cardpizza";
import { GlobalContext } from "../context/GlobalContext";
import Map from "../components/Map";

function Home() {
  const { pizzalist, getPizzas } = useContext(GlobalContext)

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <>
      <Header />

      <div className="contpizza">
        {pizzalist.map((pizza) => (
          <Cardpizza
            key={pizza.id}
            id={pizza.id}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
            img={pizza.img}
          />
        ))}
      </div>
      <Map />
    </>
  );
}

export default Home;
