import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcComments, FcLike } from 'react-icons/fc';

export default function Drink({ data }) {
  const goto = useNavigate();
  const { _id, nombre, categoria, tieneAlcohol, img, likes, comments } = data;

  return (
    <div className="card text-white bg-dark m-1 d-flex flex-row align-items-center hover-tarjeta boton" onClick={() => goto('/drink/' + _id)} style={{ width: '480px' }}>
      <img className="img-fluid border-dark" width='210px' src={img} alt={nombre} />
      <div className="card-body">
        <h6 className="card-title">{nombre}</h6>
        <div className="card-text" style={{ fontSize: '14px' }}>
          <span style={{ fontSize: '15px' }}>Categoría</span><strong>&nbsp;&nbsp;{categoria}</strong><br />
          <span style={{ fontSize: '15px' }}>¿Es?</span><strong>&nbsp;&nbsp;{tieneAlcohol}</strong><br />
          <FcComments /> {comments ? comments : 0} <br />
          <FcLike /> {likes.length}
        </div>
      </div>
    </div>
  )
}