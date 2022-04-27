import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcComments, FcLike, FcInfo } from 'react-icons/fc';

export default function Drink({ data }) {
  const goto = useNavigate();
  const { _id, nombre, categoria, tieneAlcohol, img, likes, comments } = data;

  return (
    <div className="card text-white bg-dark m-1 d-flex flex-row hover-tarjeta" style={{ width: '480px' }}>
      <img className="img-fluid border-dark" width='210px' src={img} alt={nombre} />
      <div className="card-body">
        <h6 className="card-title mt-2">{nombre}</h6>
        <div className="card-text" style={{ fontSize: '13px' }}>
          <span style={{ fontSize: '12px' }}>Categoría</span><br /><strong>&nbsp;&nbsp;{categoria}</strong><br />
          <span style={{ fontSize: '12px' }}>¿Es?</span><br /><strong>&nbsp;&nbsp;{tieneAlcohol}</strong><br />
          <div className='d-flex flex-row justify-content-between'>
            <div className='mt-1'>
              <FcComments /> {comments ? comments : 0}
              &nbsp;
              <FcLike /> {likes.length}
            </div>
          </div>
        </div>
        <div className='mt-1'>
          <button type="button" className="btn btn-sm btn-info m-1" onClick={() => goto('/drink/' + _id)}><FcInfo style={{ fontSize: '20px'}} />Más detalles</button>
        </div>
      </div>
    </div>
  )
}