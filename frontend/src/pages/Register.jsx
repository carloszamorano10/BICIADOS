import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Register = () => {
  const { handleRegister } = useContext(GlobalContext);  

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(nombre, apellido, email, password);
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center py-3">
        <h1>Register</h1>
        <div>
          {/** Campo Nombre */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
            <input 
              type="text" 
              className="form-control" 
              aria-label="Sizing example input" 
              aria-describedby="inputGroup-sizing-default" 
              name="nombre" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          {/** Campo Apellido */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Apellido</span>
            <input 
              type="text" 
              className="form-control" 
              aria-label="Sizing example input" 
              aria-describedby="inputGroup-sizing-default" 
              name="apellido" 
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>

          {/** Campo Email */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
            <input 
              type="email" 
              className="form-control" 
              aria-label="Sizing example input" 
              aria-describedby="inputGroup-sizing-default" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/** Campo Contraseña */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Contraseña</span>
            <input 
              type="password" 
              className="form-control" 
              aria-label="Sizing example input" 
              aria-describedby="inputGroup-sizing-default" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/** Campo Confirmar contraseña */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Confirmar contraseña</span>
            <input 
              type="password" 
              className="form-control" 
              aria-label="Sizing example input" 
              aria-describedby="inputGroup-sizing-default" 
              name="pass"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">Enviar</button>
      </div>
    </>
  )
}

export default Register;