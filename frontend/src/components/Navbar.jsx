import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import Swal from 'sweetalert2';



function Navbar() {
  const { totalCart, setDireccion, setUser, userIsLogged, setUserIsLogged, handleLogout2, admininistrador } = useContext(GlobalContext);
 
 
   const validaRoot = ({ isActive }) => isActive? "text-decoration-none text-warning" : "text-decoration-none text-light"
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary pt-0 pb-0">
  <div className="container-fluid bg-dark p-3">
    <NavLink className="text-decoration-none text-light fs-1 me-3 px-4" to="/">BICIADOS</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item px-2">
          <NavLink className={validaRoot} text-light aria-current="page" to="/">Home</NavLink>
        </li>

        <li className="nav-item px-2">
          <NavLink className={validaRoot} text-light aria-current="page" to="/favoritos">Mis Favoritos</NavLink>
        </li>

      {userIsLogged ? 
  <>
    {admininistrador && admininistrador === "admin" && (
      <li className="nav-item px-2">
        <NavLink className={validaRoot} text-light to="/creaPublicacion">Crear Publicación</NavLink>
        <NavLink className={validaRoot} to="/ventas"> 📊 Ventas</NavLink>
      </li>
      
    )}
    <li className="nav-item px-2">
      <NavLink className={validaRoot} text-light to="/profile">🪪Profile</NavLink>
    </li>
    <li className="nav-item px-2">
      <NavLink className={validaRoot} text-light onClick={handleLogout2}>🔓Log Out</NavLink>
    </li>
  </> :
  <>
    <li className="nav-item px-2">
      <NavLink className={validaRoot} text-light to="/login">🔒Login</NavLink>
    </li>
    <li className="nav-item px-2">
      <NavLink className={validaRoot} text-light to="/register">🔒Register</NavLink>
    </li>
  </>   
}
      </ul>
      
    </div>
        <li className="nav-item d-flex justify-content-end ">
          <NavLink className={validaRoot} to="/cart">🗑️ Total: ${Number(totalCart).toLocaleString('es-CL')}</NavLink>
        </li>      
  </div>
</nav>
  )
}

export default Navbar