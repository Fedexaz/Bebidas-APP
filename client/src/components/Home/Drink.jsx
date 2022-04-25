import React from 'react';
import { FcComments, FcLike } from 'react-icons/fc';

export default function Drink({ data }) {

  const { nombre, categoria, tieneAlcohol, dondeSeSirve, img } = data;

  return (
    <div className="card text-white bg-dark m-1 d-flex flex-row hover-tarjeta" style={{ width: '480px' }}>
      <img className="img-fluid border-dark" width='210px' src={img} alt={nombre} />
      <div className="card-body">
        <h6 className="card-title">{nombre}</h6>
        <p className="card-text" style={{ fontSize: '13px' }}>
          <span style={{ fontSize: '12px' }}>Categoría</span><br /><strong>&nbsp;&nbsp;{categoria}</strong><br />
          <span style={{ fontSize: '12px' }}>¿Es?</span><br /><strong>&nbsp;&nbsp;{tieneAlcohol}</strong><br />
          <span style={{ fontSize: '12px' }}>¿Donde se sirve?</span><br /><strong>&nbsp;&nbsp;{dondeSeSirve}</strong>
        </p>
        <div className='d-flex flex-row justify-content-between'>
          <button type="button" class="btn btn-sm btn-info">Ver más</button>
          <div>
            <FcComments /> 0
            &nbsp;
            <FcLike /> 0
          </div>
        </div>
      </div>
    </div>
  )
}
