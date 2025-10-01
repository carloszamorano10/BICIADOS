import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';



const CreaPublicacion = () => {
  const {handleRegisterProducto} = useContext(GlobalContext)  
  const [likes, setLikes] = useState(false);
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    cantidad: '',
    categoria: '',
    desc: '',
    img: "",
    foto: null,
    preview: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setProduct({
        ...product,
        foto: file,
        preview: URL.createObjectURL(file)
      });
    } else {
      setProduct({
        ...product,
        [name]: value
      });
    }
  };

  

  
  
  
  const handleSubmit = async(e) => 
    {
         e.preventDefault();
         await handleRegisterProducto(product.id, product.name, product.desc, product.price, product.img, [product.categoria]);
      
         console.log("Datos a enviar:", product);

  };




  return (
    <div className="d-flex flex-column bg-white align-items-center p-3 text-white">
      <form className="formulario" onSubmit={handleSubmit}>
        <h2 className="text-center">Crear Publicación</h2>

        {/** ID */}
        <div className="fila">
          <div className="columna-label">
            <label htmlFor="id">Id</label>
          </div>
          <div className="columna-input">
            <input type="text" name="id" value={product.id} onChange={handleChange} required />
          </div>
        </div>

        {/** Nombre */}
        <div className="fila">
          <div className="columna-label">
            <label htmlFor="nombre">Nombre</label>
          </div>
          <div className="columna-input">
            <input type="text" name="name" value={product.name} onChange={handleChange} required />
          </div>
        </div>

        {/** Precio */}
        <div className="fila">
          <div className="columna-label">
            <label htmlFor="precio">Precio</label>
          </div>
          <div className="columna-input">
            <input type="number" name="price" value={product.price} onChange={handleChange} required min="0" />
          </div>
        </div>

        {/** descricpion */}
        <div className="fila">
          <div className="columna-label">
            <label htmlFor="cantidad">Descripcion</label>
          </div>
          <div className="columna-input">
            <input type="text" name="desc" value={product.desc} onChange={handleChange}/>
          </div>
        </div>

        {/** Categoría */}
        <div className="fila">
          <div className="columna-label">
            <label htmlFor="categoria">Categoría</label>
          </div>
          <div className="columna-input">
            <input type="text" name="categoria" value={product.categoria} onChange={handleChange} />
          </div>
        </div>

        {/** img */}
        <div className="fila">
          <div className="columna-label">
            <label htmlFor="categoria">URL img : </label>
        
            
          </div>
          <div className="columna-input">
            <input type="text" name="img" value={product.img} onChange={handleChange} />
          </div>
        </div>

        

        


        

   {product.img && (
  <div className="fila justify-content-center">
    <img
      src={product.img}
      alt="Vista previa"
      style={{
        width: "100%",
        maxWidth: "200px",
        height: "auto",
        marginTop: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.4)"
      }}
    />
  </div>
)}
        

      
        <div className="text-center mt-4">

           <button onClick={handleSubmit} class="btn btn-success">Guardar producto</button>
        </div>
      </form>
    </div>
  );
};

export default CreaPublicacion;