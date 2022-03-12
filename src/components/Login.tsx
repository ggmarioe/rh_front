import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useNavigate } from 'react-router-dom';


interface LoginForm{
    username: string;
    password: string;
    remember: boolean
}


export const Login = () => {
    let key = ""
    let navigate = useNavigate();
    const [ messageError, setMessageError ] = useState("")
    const { formulario, handleChange } = useForm<LoginForm>({
        username: "",
        password: "",
    })
    const { username, password, remember } = formulario

    const submitForm = (evt: any) => {
        evt.preventDefault();
        const url = "http://127.0.0.1:8000/api/token/obtain/"

        fetch(url, {
                method: 'POST',
                body: JSON.stringify(formulario),
                headers: {
                'Content-Type': 'application/json',
                    }
        })
        .then(response => { 
            console.log(response.ok)
            if(response.ok) 
                navigate('Dashboard');
            else if(response.status === 401)    
                setMessageError("Nombre de usuario o contraseña incorrectos")
        })
        .catch(error =>{
            setMessageError("Error en el ingreso, favor contactar a un administrador del sistema") 
        })
    }

    

    return (
        <>
        <div className="container">
            
            <div className="card">
                <div className="card-body">
                <form>
                    <h3>Iniciar Sesión</h3>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="username" className="form-control" placeholder="Enter email"  value={username} onChange={ handleChange} />
                    </div>              
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Enter password" value={password} onChange={ handleChange} />
                    </div>              
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" name="remember" className="custom-control-input" id="customCheck1" defaultChecked={remember } onClick={ handleChange }  />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>              
                    <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={ submitForm }>Sign in</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                    { messageError && <div className="error">{ messageError }</div> }
                </form>
                </div>
                
            </div>
        </div>
        </>
    )
}