import { useContext, useState } from "react"
import React from 'react'
import { GlobalContext } from "../context/GlobalContext"


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {handleLogin} = useContext(GlobalContext);
    const handleSubmit = async (e) =>{
         e.preventDefault();
         await handleLogin(email, password);  
       }
   
   
  return (
    <>
    <div class="d-flex flex-column align-items-center py-3">
        <h1>Login</h1>
        <div>
            <div class="input-group mb-3">
                 <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                 <input type="email" 
                 class="form-control" 
                 aria-label="Sizing example input" 
                 aria-describedby="inputGroup-sizing-default" 
                 name="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 />
            </div>
            <div class="input-group mb-3">
                 <span class="input-group-text" id="inputGroup-sizing-default">Contraseña</span>
                 <input type="password" 
                 class="form-control" 
                 aria-label="Sizing example input" 
                 aria-describedby="inputGroup-sizing-default" 
                 name="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 />
            </div>
       
            
        </div>
       <button onClick={handleSubmit} class="btn btn-success">Enviar</button>

    </div>
    
    </>
  )
}

export default Login