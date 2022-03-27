import { BrowserRouter, Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import { Dashboard } from "../components/dashboard/Dashboard";
import { HorasExtra } from "../components/horas-extra/HorasExtra";
import { SolicitarHoraExtra } from "../components/horas-extra/SolicitarHoraExtra";
import { Login } from "../components/Login";


export const Navigation = () => {

    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    }

    return (
        
        <BrowserRouter>
            <div className="nav-layout">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul>
                        <li><NavLink to="/">Login</NavLink></li>
                        <li><NavLink to="/dashboard">Incio</NavLink></li>
                        <li><NavLink to="/horas-extra">Listar Horas Extra</NavLink></li>
                        <li><NavLink to="/horas-extra/create">Agregar Horas Extra</NavLink></li>
                        <li><NavLink to="/logout">Logout</NavLink></li>
                    </ul>
                </nav>
            </div>
            
            <Routes>
                <Route path="horas-extra" element={ <HorasExtra />} />
                <Route path="horas-extra/create" element={ <SolicitarHoraExtra />} />

                <Route path="dashboard" element={ <Dashboard />} />
                <Route path="/" element={ <Login />} />
                <Route path="/logout" />
                <Route path="/*" element={ <h1>Error 404</h1>} />
            </Routes>
        </BrowserRouter>
    )
}
