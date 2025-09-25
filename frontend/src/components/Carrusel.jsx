import React from 'react';

const Carrusel = () => {
  const leftCarouselImages = [
    "http://imgfz.com/i/rVmKPQd.jpeg",
    "http://imgfz.com/i/ZAR5zal.jpeg",
    "http://imgfz.com/i/uHYy3cd.jpeg",
    "http://imgfz.com/i/u1qXaTm.jpeg",
    "http://imgfz.com/i/53GPKQq.jpeg"
  ];

  const rightCarouselImages = [
    "http://imgfz.com/i/Da0rOoI.jpeg",
    "http://imgfz.com/i/QfRZG6P.jpeg",
    "http://imgfz.com/i/8Pp6FfG.jpeg",
    "http://imgfz.com/i/ojeyR5J.jpeg",
    "http://imgfz.com/i/ZaWrnMk.jpeg"
  ];

  const containerStyle = {
    height: '700px'
  };

  return (
    <div className="container-fluid my-5">
      <div className="row align-items-center justify-content-center">
        
        <div className="col-md-5 pe-md-4">
          <div 
            id="carouselLeft" 
            className="carousel slide shadow-lg" 
            data-bs-ride="carousel"
            style={containerStyle}
          >
            <div className="carousel-inner h-100">
              {leftCarouselImages.map((src, index) => (
                <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
                  <img 
                    src={src} 
                    className="d-block w-100 h-100 rounded object-fit-cover" 
                    alt={`Imagen ${index + 1}`} 
                  />
                </div>
              ))}
            </div>
            
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselLeft" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            
            <button className="carousel-control-next" type="button" data-bs-target="#carouselLeft" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>

        <div className="col-md-1 d-none d-md-flex justify-content-center">
          <div className="vr" style={{ height: '700px' }}></div>
        </div>

        <div className="col-md-5 ps-md-4">
          <div 
            id="carouselRight" 
            className="carousel slide shadow-lg" 
            data-bs-ride="carousel"
            style={containerStyle}
          >
            <div className="carousel-inner h-100">
              {rightCarouselImages.map((src, index) => (
                <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
                  <img 
                    src={src} 
                    className="d-block w-100 h-100 rounded object-fit-cover" 
                    alt={`Imagen ${index + 1}`} 
                  />
                </div>
              ))}
            </div>
            
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselRight" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            
            <button className="carousel-control-next" type="button" data-bs-target="#carouselRight" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>

      </div>
      <hr className="my-5" />
    </div>
    
  );
};

export default Carrusel;