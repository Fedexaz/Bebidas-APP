import React from 'react';

export default function Home() {
  return (
    <>
      <div className="p-5 bg-dark banner-img">
        <div className='d-flex flex-column align-items-center'>
          <h1 className="display-3 text-light">Tu Finde!</h1>
          <p className="lead text-light">Para disfrutar con amigos!</p>
          <hr />
          <div className="mb-3" style={{ width: '300px' }}>
            <label htmlFor="bebidas" className="form-label text-light">Buscar bebidas:</label>
            <input type="text" className="form-control" name="bebidas" id="bebidas" placeholder="Ingresa algún nombre" />
            <button type="button" className="btn btn-primary mt-2 ml-auto">Buscar</button>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='d-flex flex-lg-wrap justify-content-center'>
            <div className="card m-2">
              <img className="card-img-top" src="holder.js/100x180/" alt="Card image cap" />
              <div className="card-body">
                <h4 className="card-title">Title</h4>
                <p className="card-text">Text</p>
              </div>
            </div>
            <div className="card m-2">
              <img className="card-img-top" src="holder.js/100x180/" alt="Card image cap" />
              <div className="card-body">
                <h4 className="card-title">Title</h4>
                <p className="card-text">Text</p>
              </div>
            </div>
        </div>
        <a href='https://www.freepik.es/fotos/refresco-cola'>Foto de refresco cola creado por Racool_studio - www.freepik.es</a>
      </div>
    </>
  )
}
