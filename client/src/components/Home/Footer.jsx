import React from 'react'

export default function Footer() {
  return (
    <div>
      <hr />
      <div className="row px-5">
        <div className="col-md-4">
          <h4 className='display-6 text-light'>Contacto</h4>
          <div className="d-flex flex-column">
            <a href='mailto:fedexaz3@gmail.com' target='_blank' rel='noreferrer' className='text-decoration-none'>Correo electrónico</a>
            <a href='https://www.linkedin.com/in/fedexaz' target='_blank' rel='noreferrer' className='text-decoration-none'>LinkedIn</a>
            <a href='https://www.github.com/fedexaz' target='_blank' rel='noreferrer' className='text-decoration-none'>Github</a>
          </div>
        </div>
        <div className="col-md-4">
          <h4 className='display-6 text-light'>Enlaces de interés</h4>
          <div className="d-flex flex-column">
            <a href='https://www.google.com/' target='_blank' rel='noreferrer' className='text-decoration-none'>Trabajá con nostros</a>
            <a href='https://www.thecocktaildb.com/' target='_blank' rel='noreferrer' className='text-decoration-none'>ThecocktailDB</a>
            <a href='https://www.freepik.es/fotos/refresco-cola' target='_blank' rel='noreferrer' className='text-decoration-none'>Imágen del banner</a>
          </div>
        </div>
        <div className="col-md-4">
          <h4 className='display-6 text-light'>Nuestros servicios</h4>
          <div className="d-flex flex-column">
            <a href='https://www.google.com/' target='_blank' rel='noreferrer' className='text-decoration-none'>SanJuanconVoz</a>
            <a href='https://www.google.com/' target='_blank' rel='noreferrer' className='text-decoration-none'>Entretiempo de San Juan</a>
            <a href='https://www.google.com/' target='_blank' rel='noreferrer' className='text-decoration-none'>API de Entretiempo de San Juan</a>
          </div>
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='d-flex flex-row justify-content-center'>
          <span className='text-light mx-2'>TuFinde! &copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}
