import React from "react";

const Map = () => {
  return (
    <div>
      <hr />
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="pe-md-3">
              <h5 className="fw-bold">📍 Visítanos</h5>
              <p className="text-muted mb-3">
                Ven a conocer nuestra tienda física y prueba las mejores
                bicicletas.
              </p>

              <div className="small">
                <p className="mb-2">
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>
                  <strong>Dirección:</strong>
                  <br />
                  José Miguel Carrera 321
                  <br />
                  Santiago, Región Metropolitana
                </p>

                <p className="mb-2">
                  <i className="fas fa-clock text-primary me-2"></i>
                  <strong>Horario:</strong>
                  <br />
                  Lun-Vie: 9:00 - 18:00
                  <br />
                  Sáb: 10:00 - 14:00
                </p>

                <p className="mb-0">
                  <i className="fas fa-phone text-primary me-2"></i>
                  <strong>Teléfono:</strong>
                  <br />
                  +56 9 1234 5678
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.9111032593282!2d-70.66817501448543!3d-33.45162250477461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5013480fa99%3A0xdd31ecee0572b6e9!2sJos%C3%A9%20Miguel%20Carrera%20321%2C%208370152%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1758660690133!5m2!1ses-419!2scl"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de BICIADOS en Santiago"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;