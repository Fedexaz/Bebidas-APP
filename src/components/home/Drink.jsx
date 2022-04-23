import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Drink({ data }) {
  const goto = useNavigate();
  const { idDrink, strDrink, strDrinkThumb } = data;

  return (
    <div className='drink-card' onClick={() => goto(`/detail/${idDrink}`)}>
      {
        strDrink.length < 26 ?
        <h3 style={{ marginLeft: '10px' }}>{ strDrink }</h3>
        :
        <span style={{ display: 'block', fontWeight: 600, marginTop: '20px', marginBottom: '20px' }}>{ strDrink }</span>
      }
      <img src={strDrinkThumb} alt={strDrink} width='300px' style={{ borderRadius: '5px' }}/>
    </div>
  )
}
