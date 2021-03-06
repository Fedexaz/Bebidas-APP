import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { getDrinks } from '../services/getdrinks.service';
import { FcIdea } from 'react-icons/fc';
import { filterByAlcoholic, filterByCategory, filterByName, orderByComments, orderByName, orderByReactions } from '../controllers/drinksFilters.controller';
import { logueado } from '../services/user.service';
import Paginator from '../components/Home/Paginator';
import Footer from '../components/Home/Footer';
import NavBar from '../components/Home/NavBar';

export default function Home() {
  useEffect(() => {
    document.title = "TuFinde! - Inicio"
  }, []);

  const goto = useNavigate();

  const [change, setChange] = useState(false);

  const [buscarPorName, setbuscarPorName] = useState('');
  const [filtroAlcoholica, setFiltroAlcoholica] = useState(0);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [ordenComentadas, setOrdenComentadas] = useState(0);
  const [ordenReaccionadas, setOrdenReaccionadas] = useState(0);
  const [ordenPorNombre, setOrdenPorNombre] = useState(0);

  const [drinks, setDrinks] = useState([]);
  const [drinksBackup, setDrinksBackup] = useState([]);
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
      setDrinksBackup(await getDrinks());
      setLoadingDrinks(false);
    } catch (error) {
      console.log(error);
      setDrinks([]);
      setLoadingDrinks(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'buttonName') {
      setbuscarPorName(value);
      const nombreABuscar = document.getElementById('nombreInput').value;
      const backup = drinksBackup;
      const data = filterByName(backup, nombreABuscar);
      setDrinks(data);
      setChange(!change);
    }
    if (name === 'alcohol') {
      setFiltroAlcoholica(value);
      if (value !== '') {
        const backup = drinksBackup;
        const data = filterByAlcoholic(backup, Number(value) === 1 ? 'Alc??holica' : 'No alc??holica');
        setDrinks(data);
        setChange(!change);
      }
    }
    if (name === 'categoria') {
      setFiltroCategoria(value);
      if (value !== '') {
        const backup = drinksBackup;
        const data = filterByCategory(backup, value);
        setDrinks(data);
        setChange(!change);
      }
    }
    if (name === 'comentadas') {
      setOrdenComentadas(value);
      if (value !== '') {
        const data = orderByComments(drinks, value);
        setDrinks(data);
        setChange(!change);
      }
    }
    if (name === 'reaccionadas') {
      setOrdenReaccionadas(value);
      if (value !== '') {
        const data = orderByReactions(drinks, value);
        setDrinks(data);
        setChange(!change);
      }
    }
    if (name === 'nombre') {
      setOrdenPorNombre(value);
      if (value !== '') {
        const data = orderByName(drinks, value);
        setDrinks(data);
        setChange(!change);
      }
    }
  };

  const clearFilters = () => {
    setFiltroAlcoholica('');
    setFiltroCategoria('');
    setOrdenComentadas(0);
    setOrdenReaccionadas(0);
    setOrdenPorNombre(0);
    setbuscarPorName('');
    setChange(!change);
    setDrinks(drinksBackup);
  };

  return (
    <>
      <NavBar />
      <div className="p-5 bg-dark banner-img border-dark">
        <div className='d-flex flex-column align-items-center'>
          <h1 className="display-3 text-light mt-5">Tu Finde!</h1>
          <p className="lead text-light mb-5">Para disfrutar con amigos!</p>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className="col-md-3">
            <h6 className='text-light mt-4 mx-4 display-6'>Filtros</h6>
            <hr />
            <div className="mb-3">
              <label htmlFor="bebidas" className="form-label text-light">Buscar por nombre:</label>
              <input type="text" className="form-control" value={buscarPorName} onChange={(e) => setbuscarPorName(e.target.value)} name="bebidas" id="nombreInput" placeholder="Ingresa alg??n nombre. ej: Martini" />
              <button type="button" name='buttonName' className="btn btn-info mt-2 ml-auto float-end" onClick={handleChange}>Buscar</button>
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="categoria" className="form-label text-light">Por categor??a</label>
              <select className="form-control" value={filtroCategoria} onChange={handleChange} name="categoria" id="categoria">
                <option value=''>Seleccionar categor??a...</option>
                <option value='Com??n'>Com??n</option>
                <option value='Coctel'>Coctel</option>
                <option value='Shake'>Shake</option>
                <option value='Otros'>Otros</option>
                <option value='Chocolate'>Chocolate</option>
                <option value='Shot'>Shot</option>
                <option value="Caf?? / T??'">Caf?? / T??</option>
                <option value='Licor Casero'>Licor casero</option>
                <option vaue='Bebidas de fiesta'>Bebidas de fiesta</option>
                <option value='Cerveza'>Cerveza</option>
                <option value='Bebidas livianas'>Bebidas livianas</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="alcohol" className="form-label text-light">??Es alcoholica?</label>
              <select className="form-control" value={filtroAlcoholica} onChange={handleChange} name="alcohol" id="alcohol">
                <option value={0}>Seleccionar...</option>
                <option value={1} >Si</option>
                <option value={2} >No</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label text-light">Por nombre</label>
              <select className="form-control" value={ordenPorNombre} onChange={handleChange} name="nombre" id="nombre">
                <option value={0}>Seleccionar...</option>
                <option value={1}>A - Z</option>
                <option value={2}>Z - A</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="comentadas" className="form-label text-light">M??s comentadas</label>
              <select className="form-control" value={ordenComentadas} onChange={handleChange} name="comentadas" id="comentadas">
                <option value={0}>Seleccionar...</option>
                <option value={2}>Primero</option>
                <option value={1}>Al ??ltimo</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="reaccionadas" className="form-label text-light">M??s populares</label>
              <select className="form-control" value={ordenReaccionadas} onChange={handleChange} name="reaccionadas" id="reaccionadas">
                <option value={0}>Seleccionar...</option>
                <option value={2}>Primero</option>
                <option value={1}>Al ??ltimo</option>
              </select>
            </div>
            <div className="mb-3">
              <button type="button" className='btn btn-info' onClick={clearFilters}>Limpiar filtros</button>
            </div>
            <hr />
            <div className="alert alert-info" role="alert">
              ??Tienes la receta de una bebida y deseas compartirla? <br /> <button onClick={() => logueado() ? goto('/mis-bebidas') : goto('/login')} type="button" className='btn btn-info'>??Hazlo aqu??!</button>
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
                    <Paginator data={drinks} hasChange={change} />
                    :
                    <div className="alert alert-dark m-5 d-flex flex-column align-items-center" role="alert">
                      <div>
                        <FcIdea style={{ fontSize: '25px' }} /> <strong>No hay bebidas disponibles</strong>
                      </div>
                      <button type="button" class="btn btn-info mt-2" onClick={clearFilters}>Recargar bebidas</button>
                    </div>
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
