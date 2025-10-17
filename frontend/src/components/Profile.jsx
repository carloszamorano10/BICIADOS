import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import Swal from 'sweetalert2';

export const Profile = () => {
  const navigate = useNavigate();
  const {user, setUserIsLogged, fetchUserData, handleLogout2  } = useContext(GlobalContext);


  useEffect(() => {
    const loadUser = async () => {
      const userData = await fetchUserData();
      if (!userData) {
        navigate("/");
      }
    };
    
    loadUser();
  }, [fetchUserData, navigate]);


  
  if (!user) {
    return <div className="d-flex justify-content-center mt-5">Cargando perfil...</div>;
  }

  return (
    <div className='d-flex justify-content-center mt-4'>
      <div className="card" style={{ width: "25rem" }}>
        <img 
          src="https://static.vecteezy.com/system/resources/previews/002/205/989/non_2x/user-profile-icon-free-vector.jpg" 
          className="card-img-top" 
          alt="Imagen de perfil" 
        />
        <div className="card-body">
         <h5 className="card-title text-center">{user.user?.nombre || "Nombre no disponible"}</h5>
         <h5 className="card-title text-center">{user.user?.apellido || "Apellido no disponible"}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Email: {user.email}</li>
          <li className="list-group-item">ID: {user.id}</li>
          
        </ul>
        <div className="card-body">
          <div className="d-grid gap-2">
            <button 
              className="btn btn-primary" 
              type="button" 
              onClick={handleLogout2}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;