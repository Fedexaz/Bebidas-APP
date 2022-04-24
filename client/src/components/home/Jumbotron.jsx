import React from 'react'

export default function Jumbotron() {
  return (
    <div className='jumbotron'>
      <div className='jumbotron-search'>
        <div className='search-box-container'>
          <div className='jumbotron-title'>
            TuFinde!
          </div>
          <div className='jumbotron-subtitle'>
            ¡Ingresa alguna bebida que desees buscar!
          </div>
          <input className='search-box' type="text" placeholder='Escribe tu búsqueda' />
          <button className='button'>Buscar</button>
        </div>
      </div>
    </div>
  )
}
