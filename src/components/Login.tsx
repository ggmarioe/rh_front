import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useNavigate } from 'react-router-dom';


interface LoginForm{
    username: string;
    password: string;
    remember: boolean
}


export const Login = () => {

    let navigate = useNavigate();
    const [ errorMessage, setErrorMessage ] = useState("")
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
            //validaciones 
            if(response.status === 401){
                setErrorMessage("Nombre de usuario o contraseña incorrectos")
            }

            //todo OK
            return response.json()
        })
        .then(data => {
            localStorage.setItem("token", data["access"])
            localStorage.setItem("refresh_token", data["refresh"])
            navigate('Dashboard');
        })
        .catch(error =>{
            setErrorMessage("Error en el ingreso, favor contactar a un administrador del sistema") 
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
                        <label>Nombre de usuario</label>
                        <input type="email" name="username" className="form-control" placeholder="Nombre usuario"  value={username} onChange={ handleChange} />
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
                    { errorMessage && <div className="error">{ errorMessage }</div> }
                </form>
                </div>
                
            </div>
        </div>
        </>
    )
}