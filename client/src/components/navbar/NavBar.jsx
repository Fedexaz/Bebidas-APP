import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ setDrinks }) {
  const goto = useNavigate();
  return (
    <>
    <nav className='nav-mobile'>
      <input type="checkbox" id="abrir-cerrar" name="abrir-cerrar" value="" />
      <label htmlFor="abrir-cerrar" style={{ fontSize: '29px' }}>&#9776; <span className="abrir"></span><span className="cerrar"></span></label>
      <div id="sidebar" className="sidebar">
        <ul className="menu">
          <span className='titulo'>TuFinde!</span>
          <li onClick={() => goto('/')}>Inicio</li>
          <li onClick={() => goto('/favoritos')}>Favoritos</li>
          <li>Opción 3</li>
          <li>Opción 4</li>
          <li>Opción 5</li>
        </ul>
      </div>
    </nav>
    </>
  )
}