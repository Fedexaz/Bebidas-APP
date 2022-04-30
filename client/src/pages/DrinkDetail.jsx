import React, { useEffect, useState } from 'react';
import alerta from 'sweetalert2';
import NavBar from '../components/Home/NavBar';
import Footer from '../components/Home/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { getDrinkComments, getDrinkDetail, postComentario, borrarComentario, addLike, removeLike, getLikes } from '../services/getdrinks.service';
import Loader from '../components/Loader/Loader';
import { FcComments, FcLike, FcEmptyTrash, FcRating } from 'react-icons/fc';
import { timeLeftComment } from '../services/time.utils';
import { agregarFavoritos, getUserData, obtenerFavoritos } from '../services/user.service';
import { tieneLike } from '../controllers/drinkLike.controller';
import { inFavorites } from '../controllers/drinkFavorites.controller';

export default function DrinkDetail() {
  const { id } = useParams();
  const goto = useNavigate();
  const usuarioID = getUserData('id');

  const [captcha, setCaptcha] = useState(Math.round(Math.random() * 100000));

  const [favoritos, setFavoritos] = useState([]);

  const [comentario, setComentario] = useState('');
  const [captchaController, setCaptchaController] = useState('');

  const [loading, setLoading] = useState(true);
  const [drinkData, setDrinkData] = useState({});
  const [drinkComments, setDrinkComments] = useState([]);
  const [drinkLikes, setDrinkLikes] = useState([]);

  useEffect(() => {
    document.title = "TuFinde! - " + drinkData.nombre;
  }, [drinkData])

  useEffect(() => {
    loadDrink();
    loadComments();
    obtenerLikes();
    cargarFavoritos();
    return () => {
      setDrinkData({});
      setDrinkComments([]);
      setDrinkLikes([]);
    }
    // eslint-disable-next-line
  }, [id]);

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

  const loadComments = async () => {
    try {
      const data = await getDrinkComments(id);
      setDrinkComments(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cargarFavoritos = async () => {
    try {
      const data = await obtenerFavoritos(usuarioID);
      setFavoritos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async () => {
    if (captcha === Number(captchaController)) {
      if (comentario.length) {
        try {
          await postComentario(id, JSON.parse(localStorage.getItem('data')).id, comentario, JSON.parse(localStorage.getItem('data')).name);
          alerta.fire('Excelente', "Comentario realizado correctamente!", 'success');
          setCaptcha(Math.round(Math.random() * 100000));
          setCaptchaController('');
          setComentario('');
          loadComments();
        } catch (error) {
          alerta.fire('Error', error, 'warning');
        }
      }
      else {
        alerta.fire('Error', "El comentario no puede estar vacío!", 'warning');
      }
    }
    else {
      alerta.fire('Error', "El captcha no coincide, reintenta!", 'warning');
      setCaptcha(Math.round(Math.random() * 100000));
    }
  };

  const deleteComment = async (commentID, userID) => {
    alerta.fire({
      title: '¿Deseas eliminar tu comentario?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await borrarComentario(commentID, userID);
          alerta.fire('Comentario eliminado', '', 'success');
          loadComments();
        } catch (error) {
          alerta.fire('Error al eliminar comentario', error, 'error');
        }
      }
    })
  };

  const obtenerLikes = async () => {
    try {
      const data = await getLikes(id);
      setDrinkLikes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const setLike = async () => {
    try {
      await addLike(id, usuarioID);
      obtenerLikes();
    } catch (error) {
      alerta.fire('Error al agregar reacción', error, 'error');
    }
  };

  const deleteLike = async () => {
    try {
      await removeLike(id, usuarioID);
      drinkData.likes.filter(el => el !== usuarioID);
      obtenerLikes();
    } catch (error) {
      alerta.fire('Error al eliminar reacción', error, 'error');
    }
  };

  const addFavoritos = async () => {
    try {
      await agregarFavoritos(usuarioID, id);
      alerta.fire('Excelente', drinkData.nombre + " agregada a favoritos!", 'success');
      cargarFavoritos();
    } catch (error) {
      alerta.fire('Error', error, 'warning');
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
                  <img src={drinkData.img} alt={drinkData.nombre} className='img-fluid border-dark rounded-1 my-2' />
                </div>
                <div className="col-md-8 d-flex flex-column">
                  <div className='text-light' style={{ fontSize: '23px' }}>
                    <a className='text-decoration-none text-light' href='#comments' title='comentarios'><FcComments style={{ fontSize: '23px' }} /> {drinkComments.length}</a>
                    &nbsp;&nbsp;
                    {
                      localStorage.getItem('loggedIn') ?
                        <>
                          <button className='btn btn-info' title='reaccionar' onClick={() => !tieneLike(drinkLikes, usuarioID) ? setLike() : deleteLike()}><FcLike style={{ fontSize: '23px' }} /> {drinkLikes.length}</button>
                          {
                            inFavorites(favoritos, id) ?
                              <button className='btn btn-info mx-1' title='Agregar a favoritos' onClick={addFavoritos}><FcRating style={{ fontSize: '23px' }} /> Agregar {drinkData.nombre} a favoritos</button>
                              :
                              null
                          }
                        </>
                        :
                        <span className='text-decoration-none text-light' title='reacciones'><FcLike style={{ fontSize: '23px' }} /> {drinkLikes.length}</span>
                    }
                  </div>
                  <h1 className='display-6 text-light mt-2'>{drinkData.nombre}</h1>
                  <span className='text-light mt-1' style={{ fontSize: '20px' }}>Categoría: <strong style={{ fontSize: '18px' }}>{drinkData.categoria}</strong></span>
                  <span className='text-light mt-1' style={{ fontSize: '20px' }}>Es: <strong style={{ fontSize: '18px' }}>{drinkData.tieneAlcohol}</strong></span>
                  <span className='text-light mt-1' style={{ fontSize: '20px' }}>Creada por: <strong style={{ fontSize: '18px' }}>{drinkData.createdInPage ? 'La comunidad' : 'Otros'}</strong></span>
                  <span className='text-light mt-1' style={{ fontSize: '20px' }}>Ingredientes: <strong style={{ fontSize: '18px' }}>{drinkData.ingredientes}</strong></span>
                  <div className='d-flex flex-column mt-3'>
                    <span className='text-light' style={{ fontSize: '20px' }}>Instrucciones:</span>
                    {
                      drinkData.instrucciones ?
                        drinkData.instrucciones.split(',').map((el, i) => <span key={i} className='text-light' style={{ fontSize: '16px' }}>{i + 1}: {el}</span>)
                        :
                        null
                    }
                  </div>
                  <hr />
                  <h3 className="display-6 text-light">Comentarios ({drinkComments.length})</h3>
                  <div className='d-flex flex-column' id='comments'>
                    {
                      drinkComments ?
                        drinkComments.map((comm, i) => {
                          const { comment, commentID, date, userID, userName } = comm;
                          return (
                            <div key={i} className='border border-light my-1 p-2 d-flex flex-row justify-content-between'>
                              <div>
                                <h5 className='text-light'>{userName} <span style={{ fontWeight: 'lighter', fontSize: '14px' }}>{timeLeftComment(date)}</span></h5>
                                <span className='text-light'>{comment}</span>
                              </div>
                              <div>
                                {userID !== null && userID === usuarioID ?
                                  <FcEmptyTrash style={{ fontSize: '25px' }} onClick={() => deleteComment(commentID, userID)} className='boton' title='Eliminar comentario' />
                                  :
                                  null
                                }
                              </div>
                            </div>)
                        })
                        :
                        localStorage.getItem('loggedIn') ?
                          <div className='alert alert-info'>
                            Aún no hay comentarios... ¡sé el primero en hacerlo!
                          </div>
                          :
                          <div className='alert alert-info'>
                            Aún no hay comentarios...<br />¡<strong className='boton' onClick={() => goto('/login')}>Inicia sesión</strong> o <strong className='boton' onClick={() => goto('/register')}>Regístrate</strong> para comentar!
                          </div>
                    }
                  </div>
                  <hr />
                  {
                    localStorage.getItem('loggedIn') ?
                      <div>
                        <label htmlFor="comentario" className="form-label text-light">Escribe un comentario</label>
                        <textarea className="form-control" name="comentario" id="comentario" rows="3" value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder='Escribe tu comentario aquí'></textarea>
                        <div className='alert alert-info d-flex align-items-center flex-wrap mt-2'>
                          Ingresá el siguiente número en el cuadro:&nbsp;<strong>{captcha}</strong>&nbsp;&nbsp;<input type="text" className="form-control" value={captchaController} onChange={(e) => setCaptchaController(e.target.value)} style={{ width: '200px' }} name="captchaController" id="captchaController" />
                        </div>
                        <button className='btn btn-info' onClick={postComment}>Comentar</button>
                      </div>
                      :
                      null
                  }
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
