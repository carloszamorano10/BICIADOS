import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Favoritos from "./pages/Favoritos";
import Bici from "./pages/Bici";
import Ventas from "./pages/Ventas";
import { Profile } from "./components/Profile";
import { NotFound } from "./components/NotFound";
import { GlobalContext } from "./context/GlobalContext";
import Creapublicacion from "./pages/Creapublicacion";

function App() {
  const {userIsLogged} = useContext(GlobalContext)

  return (
    <>
    <div className="d-flex flex-column min-vh-100 justify-content-between">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/favoritos" element={<Favoritos />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/creaPublicacion" element={<Creapublicacion />}/>
        <Route path="/ventas" element={<Ventas />}/>
        <Route path="/bici/:id" element={<Bici />}/>
        <Route path="/profile" 
        element={userIsLogged ? <Profile /> : <Navigate to={"/login"}></Navigate>}/>
        <Route path="/*" element={<NotFound />}/>
      </Routes>
      <Footer />
    </div>
    </>
  );
}

export default App;
