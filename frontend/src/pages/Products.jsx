import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Cardpizza from "../components/Cardpizza";
import { GlobalContext } from "../context/GlobalContext";



function Products() {
  const { pizzalist, getPizzas } = useContext(GlobalContext)

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <>
      <Header />
      <h2 className="text-center">Productos</h2>
      <div className="contpizza">
        {pizzalist.map((pizza) => (
          <Cardpizza
            key={pizza.id}
            id={pizza.id}
            name={pizza.name}
            price={pizza.price}
            categoria={pizza.categoria}
            img={pizza.img}
          />
        ))}
      </div>
    </>
  );
}

export default Products;
