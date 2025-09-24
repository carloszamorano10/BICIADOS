import React from 'react'
import { Link } from 'react-router-dom';

export const NotFound = () => {
    
  return (
    <>
    <img src={"../src/assets/img/404pizza.jpg"}alt="imagen pagina no encontrada" />
    <Link className='notfound' to="/">Volver Al Inicio</Link>
    </>
  )
}

export default NotFound