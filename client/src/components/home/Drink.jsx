import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcComments, FcLike } from "react-icons/fc";

export default function Drink({ data }) {
  const goto = useNavigate();
  const { idDrink, strDrink, strDrinkThumb, strCategory, strAlcoholic, strGlass } = data;

  return (
    <div className='drink-card'>
      <img src={strDrinkThumb} alt={strDrink} width='170px' className='drink-card-img' />
      <div className='drink-card-content'>
        <div className='drink-card-content'>
          <span style={{ fontSize: '20px', marginBottom: '5px' }}>Detalles:</span>
          <span>Nombre: <strong>{strDrink}</strong></span>
          <span>Categoría: <strong>{strCategory}</strong></span>
          <span>Es: <strong>{strAlcoholic}</strong></span>
          <span>Servirse en: <strong>{strGlass}</strong></span>
        </div>
        <div className='drink-card-stats'>
          <div title='Reacciones' style={{ marginRight: '10px' }} ><FcLike className='drink-card-stats-icon-static'/> 0</div>
          <div title='Comentarios'><FcComments className='drink-card-stats-icon-static'/> 0</div>
        </div>
        <div>
          <button className='button-drink-card' onClick={() => goto(`/detail/${idDrink}`)}>Más info</button>
          <button className='button-drink-card'>¡A favoritos!</button>
        </div>
      </div>
    </div>
  )
}
