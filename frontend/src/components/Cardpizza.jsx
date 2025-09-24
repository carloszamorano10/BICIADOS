import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


function Cardpizza({ id, name, price, ingredients, img }) {
  const { setCarrito, carrito } = useContext(GlobalContext);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate(); 

  const handleAdd = async () => {
    setIsAdding(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCarrito(prevCarrito => {
      const pizzaExistente = prevCarrito.find(item => item.id === id);
      
      if (pizzaExistente) {
        return prevCarrito.map(item =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      
      return [...prevCarrito, { 
        id,
        name, 
        price, 
        ingredients, 
        img,
        quantity: 1 
      }];
    });
    
    setIsAdding(false);
  };
  
  const irPizza = ()=> {
    navigate(`/pizza/${id}`);
  }
  return (
    <div className='pizza-card card h-100 shadow-sm hover-shadow'>
      <div className='card-img-top position-relative'>
        <img 
          src={img} 
          alt={`Pizza ${name}`} 
          className='img-fluid'
          style={{ height: '180px', objectFit: 'cover', width: '100%' }}
          loading='lazy'
        />
        <span className='position-absolute top-0 end-0 bg-success text-white px-2 py-1 rounded-bl'>
          ${price}
        </span>
      </div>
      
      <div className='card-body d-flex flex-column'>
        <h2 className='card-title h5 text-truncate text-center mb-4' title={name}>{name.toUpperCase()}</h2>
        
        <div className='ingredients mb-2 flex-grow-1'>
          <h3 className='h6'>Ingredientes:</h3>
          <ul className='list-unstyled'>
            {ingredients.map((ingredient, index) => (
              <li key={index} className='mb-1 d-flex align-items-center'>
                <span className='me-1'>🍕</span>
                <span>{ingredient.charAt(0).toUpperCase()}{ingredient.slice(1)}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className='buttons d-grid gap-2'>
          <button 
            className='btn btn-dark'
            onClick={handleAdd}
            disabled={isAdding}
            aria-label={`Añadir pizza ${name} al carrito`}
          >
            {isAdding ? (
              <>
                <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span>
                Añadiendo...
              </>
            ) : (
              'Añadir al Carrito'
            )}
          </button>
          <button  className='btn btn-dark' onClick={irPizza}>Ver más</button>
        </div>
      </div>
    </div>
  );
}

Cardpizza.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired
};

export default Cardpizza;