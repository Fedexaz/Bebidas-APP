import React, { useState, useEffect } from 'react';
import Drink from '../components/Home/Drink';
import Loader from '../components/Loader/Loader';
import { getDrinks } from '../services/getdrinks.service';
import { FcIdea } from 'react-icons/fc';

export default function Home() {
  useEffect(() => {
    document.title = "TuFinde! - Inicio"
  }, []);

  const [drinks, setDrinks] = useState([]);
  const [loadingDrinks, setLoadingDrinks] = useState(true);

  useEffect(() => {
    loadData();
    return () => {
      setDrinks([]);
      setLoadingDrinks(true);
    }
  }, []);

  const loadData = async () => {
    try {
      setDrinks(await getDrinks());
      setLoadingDrinks(false);
    } catch (error) {
      console.log(error);
      setDrinks([]);
      setLoadingDrinks(false);
    }
  };

  return (
    <>
      <div className="p-5 bg-dark banner-img border-dark">
        <div className='d-flex flex-column align-items-center'>
          <h1 className="display-3 text-light">Tu Finde!</h1>
          <p className="lead text-light">Para disfrutar con amigos!</p>
          <hr />
          <div className="mb-3" style={{ width: '350px' }}>
            <label htmlFor="bebidas" className="form-label text-light">Buscar bebidas:</label>
            <input type="text" className="form-control" name="bebidas" id="bebidas" placeholder="Ingresa algún nombre. ej: Martini" />
            <button type="button" className="btn btn-info mt-2 ml-auto">Buscar</button>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className="col-md-3">
            <h6 className='text-light mt-4 mx-4 display-6'>Filtros</h6>
            <hr />
            <div className="mb-3">
              <label htmlFor="bebidas" className="form-label text-light">Buscar por nombre:</label>
              <input type="text" className="form-control" name="bebidas" id="bebidas" placeholder="Ingresa algún nombre. ej: Martini" />
              <button type="button" className="btn btn-info mt-2 ml-auto">Buscar</button>
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="" className="form-label text-light">¿Es alcoholica?</label>
              <select className="form-control" name="alcohol" id="alcohol">
                <option selected>Seleccionar...</option>
                <option>Si</option>
                <option>No</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label text-light">Por categoría</label>
              <select className="form-control" name="alcohol" id="alcohol">
                <option selected>Seleccionar categoría...</option>
                <option>Común</option>
                <option>Coctel</option>
                <option>Shake</option>
                <option>Otros</option>
                <option>Chocolate</option>
                <option>Shot</option>
                <option>Café / Té</option>
                <option>Licor casero</option>
                <option>Bebidas de fiesta</option>
                <option>Cerveza</option>
                <option>Bebidas livianas</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label text-light">Más comentadas</label>
              <select className="form-control" name="alcohol" id="alcohol">
                <option selected>Seleccionar...</option>
                <option>Ascendente</option>
                <option>Descendente</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label text-light">Más populares</label>
              <select className="form-control" name="alcohol" id="alcohol">
                <option selected>Seleccionar...</option>
                <option>Ascendente</option>
                <option>Descendente</option>
              </select>
            </div>
          </div>
          <div className="col-md-9">
            <div className='d-flex'>
              <h2 className='text-light mt-4 mx-4 display-5'>Explora</h2>
            </div>
            <div className='pt-3 d-flex flex-wrap justify-content-center'>
              {
                loadingDrinks ?
                  <Loader data='bebidas' />
                  :
                  drinks.length ?
                    drinks.map(drink => <Drink key={drink._id} data={drink} />)
                    :
                    <div className="alert alert-dark m-5 d-flex align-items-center" role="alert">
                      <FcIdea style={{ fontSize: '25px' }} /> <strong>No hay bebidas disponibles</strong>
                    </div>
              }
            </div>
          </div>
        </div>
        <a href='https://www.freepik.es/fotos/refresco-cola'>Foto de refresco cola creado por Racool_studio - www.freepik.es</a>
      </div>
    </>
  )
}
