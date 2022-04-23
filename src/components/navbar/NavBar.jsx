import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const goto = useNavigate();
  return (
    <nav className='nav'>
      <div>
        <button className='button' onClick={() => goto('/')}>
          Inicio
        </button>
        <button className='button' onClick={() => goto('/favoritos')}>
          Favoritos
        </button>
      </div>
      <a href="https://www.github.com/fedexaz" target='_blank' rel='noreferrer' className='button'>Mi GitHub</a>
    </nav>
  )
}
