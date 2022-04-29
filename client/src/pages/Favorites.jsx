import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import alerta from 'sweetalert2';
import NavBar from '../components/Home/NavBar';
import Footer from '../components/Home/Footer';
import Loader from '../components/Loader/Loader';
import Drink from '../components/Favorites/Drink';
import { FcIdea, FcEmptyTrash } from 'react-icons/fc';
import { eliminarFavoritos, getUserData, obtenerFavoritos } from '../services/user.service';

export default function Favorites() {
  const goto = useNavigate();
  const usuarioID = getUserData('id');

  useEffect(() => {
    document.title = "TuFinde! - Mis favoritas";
    cargarFavoritos();
    return () => {
      setFavoritos([]);
      setLoadingFavoritos(true);
    }
    // eslint-disable-next-line
  }, []);

  const [favoritos, setFavoritos] = useState([]);
  const [loadingFavoritos, setLoadingFavoritos] = useState(true);

  const cargarFavoritos = async () => {
    try {
      const data = await obtenerFavoritos(usuarioID);
      setFavoritos(data);
      setLoadingFavoritos(false);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarFavorito = async (bebidaID, name) => {
    alerta.fire({
      title: '¿Deseas eliminar ' + name + ' de favoritos?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarFavoritos(usuarioID, bebidaID);
          alerta.fire(name + ' eliminada de favoritos!', '', 'success');
          cargarFavoritos();
        } catch (error) {
          alerta.fire('Error al eliminar de favoritos', error, 'error');
        }
      }
    })
  };

  return (
    <>
      <NavBar />
      <div className='container my-2'>
        <h3 className="display-6 text-light">Mis bebidas favoritas</h3>
        <div>
          {
            loadingFavoritos ?
              <Loader data='bebidas favoritas' />
              :
              favoritos.length ?
                <div className='d-flex flex-row flex-wrap justify-content-center'>
                  {favoritos.map(el => {
                    return (
                      <div className='bg-dark m-1' key={el.nombre}>
                        <Drink data={el} />
                        <div className='d-flex flex-row justify-content-center m-1 boton' onClick={() => eliminarFavorito(el._id, el.nombre)}>
                        <FcEmptyTrash className='mb-1' style={{ fontSize: '20px'}}/>
                        <span className='text-light'>Eliminar de favoritos</span>
                        </div>
                      </div>
                    )
                  }
                  )}
                </div>
                :
                <div className="alert alert-dark m-5 d-flex flex-column align-items-center" role="alert">
                  <div>
                    <FcIdea style={{ fontSize: '25px' }} /> <strong>No tienes bebidas en favoritos</strong>
                  </div>
                  <button type="button" class="btn btn-info mt-2" onClick={() => goto('/')}>¡Agregar bebidas!</button>
                </div>
          }
        </div>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
    </>
  )
}
