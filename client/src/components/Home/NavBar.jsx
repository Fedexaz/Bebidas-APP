import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, logout, logueado } from '../../services/user.service';
import { FcExpand } from 'react-icons/fc';

export default function NavBar() {

  const goto = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-sm-top">
      <div className="container-fluid">
        <span className="navbar-brand boton">TuFinde!</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <span className="nav-link boton">Inicio</span>
            </li>
            <li className="nav-item mr-auto">
              <span className="nav-link boton">¡Publicá tus bebidas!</span>
            </li>
          </ul>
          <ul className="navbar-nav barra mb-2 mb-lg-0">
            <div className='d-flex flex-row'>
              {
                logueado() ?
                  <li className="nav-item dropstart">
                    <span className="nav-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      { getUserData('name') } &nbsp;
                      <FcExpand />
                    </span>
                    <ul className="dropdown-menu bg-dark text-light" aria-labelledby="navbarDropdown">
                      <li><span className="dropdown-item boton-menu text-light">Perfil</span></li>
                      <li><span className="dropdown-item boton-menu text-light">Mis bebidas favoritas</span></li>
                      <li><span className="dropdown-item boton-menu text-light">Mis bebidas publicadas</span></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><span className="dropdown-item boton-menu text-light" onClick={logout}>Cerrar sesión</span></li>
                    </ul>
                  </li>
                  :
                  <>
                    <li className="nav-item">
                      <span className="nav-link boton mx-2" onClick={() => goto('/login')}>Iniciar sesión</span>
                    </li>
                    <li className="nav-item">
                      <span className="nav-link btn btn-info text-dark boton" onClick={() => goto('/register')}>Registrate!</span>
                    </li>
                  </>
              }
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}
