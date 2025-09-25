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
import Pizza from "./pages/Pizza";
import { Profile } from "./components/Profile";
import { NotFound } from "./components/NotFound";
import { GlobalContext } from "./context/GlobalContext";

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
        <Route path="/products" element={<Products />}/>
        <Route path="/pizza/:id" element={<Pizza />}/>
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
