import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">BICIADOS</h5>
            <p className="text-secondary">
              Tu tienda especializada en bicicletas y accesorios de calidad.
              Encuentra todo lo que necesitas para tu pasión sobre dos ruedas.
            </p>
            <div className="social-icons mt-3">
              <a href="#" className="text-light me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">ENLACES RÁPIDOS</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/home" className="text-secondary text-decoration-none">
                  Home
                </a>
              </li>
              <li className="mb-2">
                
              </li>
              <li className="mb-2">
                <a
                  href="/register"
                  className="text-secondary text-decoration-none"
                >
                  Register
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/login"
                  className="text-secondary text-decoration-none"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>

  

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">CONTACTO</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                <span className="text-secondary">
                  Av. José Miguel Carrera 323
                </span>
              </li>
              <li className="mb-2">
                <i className="fas fa-phone me-2"></i>
                <span className="text-secondary">+569 4321 6789</span>
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope me-2"></i>
                <span className="text-secondary">info@biciados.com</span>
              </li>
              <li className="mb-2">
                <i className="fas fa-clock me-2"></i>
                <span className="text-secondary">Lun-Vie: 9:00-18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-secondary" />
        <div className="row">
          <div className="col-md-6 text-md-start">
            <p className="text-secondary mb-0">
              2025 BICIADOS. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
