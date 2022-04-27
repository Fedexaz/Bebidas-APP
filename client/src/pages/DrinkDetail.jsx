import React, { useEffect, useState } from 'react';
import alerta from 'sweetalert2';
import NavBar from '../components/Home/NavBar';
import Footer from '../components/Home/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { getDrinkDetail } from '../services/getdrinks.service';
import Loader from '../components/Loader/Loader';

export default function DrinkDetail() {
  const { id } = useParams();
  const goto = useNavigate();
  const [loading, setLoading] = useState(true);
  const [drinkData, setDrinkData] = useState({});

  useEffect(() => {
    loadDrink();
    return () => {
      setDrinkData({});
    }
    // eslint-disable-next-line
  }, []);

  const loadDrink = async () => {
    try {
      const data = await getDrinkDetail(id);
      setDrinkData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alerta.fire('Error', "No se ha encontrado la bebida solicitada!", 'error');
      goto('/');
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-2">
        {
          !loading ?
            drinkData ?
            <div className='row my-3'>
              <div className="col-md-4">
                <img src={drinkData.img} alt={drinkData.nombre} className='img-fluid border-dark rounded-1' />
              </div>
              <div className="col-md-8 d-flex flex-column">
                <h1 className='display-6 text-light'>{drinkData.nombre}</h1>
                <span className='text-light mt-1' style={{ fontSize: '20px' }}>Categoría: <strong style={{ fontSize: '18px' }}>{drinkData.categoria}</strong></span>
                <span className='text-light mt-1' style={{ fontSize: '20px' }}>Es: <strong style={{ fontSize: '18px' }}>{drinkData.tieneAlcohol}</strong></span>
                <span className='text-light mt-1' style={{ fontSize: '20px' }}>Creada por: <strong style={{ fontSize: '18px' }}>{drinkData.createdInPage ? 'La comunidad' : 'Otros'}</strong></span>
                <span className='text-light mt-1' style={{ fontSize: '20px' }}>Ingredientes: <strong style={{ fontSize: '18px' }}>{drinkData.ingredientes}</strong></span>
                <div className='d-flex flex-column mt-3'>
                  <span className='text-light' style={{ fontSize: '20px' }}>Instrucciones:</span>
                  {
                    drinkData.instrucciones.split(',').map((el, i) => <span key={i} className='text-light' style={{ fontSize: '16px' }}>{i + 1}: {el}</span>)
                  }
                </div>
                
              </div>
            </div>
              :
              null
            :
            <Loader data='detalle de la bebida' />
        }
      </div>
      <div className='container-fluid'>
        <Footer />
      </div>
    </>
  )
}
