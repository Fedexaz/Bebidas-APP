import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import alerta from 'sweetalert2';
import NavBar from '../components/Home/NavBar';
import Footer from '../components/Home/Footer';
import Loader from '../components/Loader/Loader';
import { getUserData } from '../services/user.service';
import { agregarBebida, eliminarBebida, loadMyDrinks } from '../services/myDrink.service';
import { FcComments, FcLike, FcEmptyTrash } from 'react-icons/fc';

export default function MyDrinks() {
  const goto = useNavigate();
  const usuarioID = getUserData('id');
  const logeado = getUserData('loggedIn');
  const [misBebidas, setMisBebidas] = useState([]);
  const [loadingMisBebidas, setLoadingMisBebidas] = useState(true);

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [alcoholica, setAlcoholica] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [instrucciones, setInstrucciones] = useState('');
  const [imagen, setImagen] = useState('');

  const [captcha, setCaptcha] = useState(Math.round(Math.random() * 100000));
  const [captchaController, setCaptchaController] = useState('');


  useEffect(() => {
    if(!logeado){
      goto('/');
    }
    document.title = "TuFinde! - Mis bebidas";
    cargarMisBebidas();
    return () => {
      setMisBebidas([]);
      setLoadingMisBebidas(true);
    };
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captcha === Number(captchaController)) {
      if (nombre && categoria && alcoholica && ingredientes && instrucciones && imagen) {
        const datos = {
          nombre,
          categoria,
          tieneAlcohol: alcoholica,
          instrucciones,
          ingredientes,
          img: imagen,
          createdInPage: true,
          creatorID: usuarioID
        };
        try {
          await agregarBebida(datos);
          alerta.fire('Perfecto!', "Bebida agregada correctamente a la base de datos!, ahora podrán disfrutar de tu creación!", "success");
          setNombre('');
          setCategoria('');
          setAlcoholica('');
          setIngredientes('');
          setInstrucciones('');
          setImagen('');
          cargarMisBebidas();
        } catch (error) {
          alerta.fire('Ups', "Error al agregar la bebida", "error");
        }

      }
      else {
        alerta.fire('Alerta', "Faltan agregar algunos datos!", "warning");
      }
    }
    else {
      alerta.fire('Error', "El captcha no coincide, reintenta!", 'warning');
      setCaptcha(Math.round(Math.random() * 100000));
    }
  };

  const cargarMisBebidas = async () => {
    try {
      const datos = await loadMyDrinks(usuarioID);
      setMisBebidas(datos);
      setLoadingMisBebidas(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDrink = async (drinkID, name) => {
    alerta.fire({
      title: '¿Deseas eliminar ' + name + '?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarBebida(usuarioID, drinkID);
          alerta.fire(name + ' eliminada!', '', 'success');
          cargarMisBebidas();
        } catch (error) {
          alerta.fire('Error al eliminar la bebida', error, 'error');
        }
      }
    })
  };

  return (
    <>
      <NavBar />
      <div className='container my-2'>
        <h3 className="display-4 text-light">Mis bebidas</h3>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <h3 className="display-6 text-light">Todas tus bebidas</h3>
            {
              loadingMisBebidas ?
                <Loader data='tus bebidas' />
                :
                misBebidas.length ?
                  misBebidas.map(el => {
                    return (
                      <div className='card bg-dark border border-dark d-flex flex-row hover-tarjeta boton my-1' key={el._id} onClick={() => goto('/drink/' + el._id)}>
                        <img src={el.img} alt={el.nombre} width='200px' height='180px' />
                        <div className='d-flex flex-column'>
                          <span className='text-light mx-2 my-1 d-flex align-items-center' style={{ fontSize: '22px' }}>{el.nombre} &nbsp;<FcEmptyTrash onClick={() => deleteDrink(el._id, el.nombre)} title='eliminar bebida' className='boton' /></span>
                          <span className='text-light mx-2 my-1' style={{ fontSize: '17px' }}>Categoría: <strong>{el.categoria}</strong></span>
                          <span className='text-light mx-2 my-1' style={{ fontSize: '17px' }}>Es: <strong>{el.tieneAlcohol}</strong></span>
                          <div className='d-flex flex-row mx-2 my-1 text-light align-items-center' title='comentarios'>
                            <FcComments />&nbsp;{el.comments ? el.comments : 0}
                          </div>
                          <div className='d-flex flex-row mx-2 my-1 text-light align-items-center' title='reacciones'>
                            <FcLike />&nbsp;{el.likes.length}
                          </div>
                        </div>
                      </div>
                    )
                  })
                  :
                  <div className="alert alert-info">
                    No tienes bebidas agregadas aún, pero puedes &nbsp;
                    <span type="button" className="boton text-dark text-decoration-underline" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                      Agregar una bebida
                    </span>
                  </div>
            }
          </div>
          <div className="col-md-4">
            <h3 className="display-6 text-light">Agregar bebidas</h3>
            <div className="alert alert-info">
              Puedes agregar tus bebidas clickeando&nbsp;
              <span type="button" className="boton text-dark text-decoration-underline" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                aquí
              </span>
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-xl">
                <div className="modal-content bg-dark">
                  <div className="modal-header border border-dark">
                    <h5 className="modal-title text-light" id="staticBackdropLabel">Agregar nueva bebida</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body border border-dark">
                    <form method='POST' onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="mb-3 col-md-5">
                          <label htmlFor="nombre" className="form-label text-light">Nombre de la bebida:</label>
                          <input type="text" required className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} name="nombre" id="nombre" aria-describedby="helpId" placeholder="ej: Fernet" />
                          <small id="helpId" className="form-text text-muted">El nombre que tendrá la bebida.</small>
                        </div>
                        <div className="mb-3 col-md-4">
                          <label htmlFor="nombre" className="form-label text-light">Categoría de la bebida:</label>
                          <select className="form-control" required name="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} id="categoria">
                            <option value=''>Seleccionar categoría...</option>
                            <option value='Común'>Común</option>
                            <option value='Coctel'>Coctel</option>
                            <option value='Shake'>Shake</option>
                            <option value='Otros'>Otros</option>
                            <option value='Chocolate'>Chocolate</option>
                            <option value='Shot'>Shot</option>
                            <option value="Café / Té'">Café / Té</option>
                            <option value='Licor Casero'>Licor casero</option>
                            <option vaue='Bebidas de fiesta'>Bebidas de fiesta</option>
                            <option value='Cerveza'>Cerveza</option>
                            <option value='Bebidas livianas'>Bebidas livianas</option>
                          </select>
                          <small id="helpId" className="form-text text-muted">La categoría que tendrá la bebida.</small>
                        </div>
                        <div className="mb-3 col-md-3">
                          <label htmlFor="alcoholica" className="form-label text-light">¿Es alcohólica?:</label>
                          <select className="form-control" required name="alcoholica" id="alcoholica" value={alcoholica} onChange={(e) => setAlcoholica(e.target.value)}>
                            <option value=''>Seleccionar...</option>
                            <option value='Alcohólica'>Sí</option>
                            <option value='No alcohólica'>No</option>
                          </select>
                          <small id="helpId" className="form-text text-muted">¿Es alcohólica o no la bebida?.</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3">
                          <label htmlFor="ingredientes" className="form-label text-light">Ingredientes:</label>
                          <textarea name="ingredientes" required id="ingredientes" className='form-control' rows="3" value={ingredientes} onChange={(e) => setIngredientes(e.target.value)}></textarea>
                          <small id="helpId" className="form-text text-muted">Los ingredientes de la bebida. TIP: separá con comas ' , ' cada paso y no pongas el número del mismo (ej "vino, gaseosa de pomelo").</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3">
                          <label htmlFor="instrucciones" className="form-label text-light">Instrucciones:</label>
                          <textarea name="instrucciones" required id="instrucciones" className='form-control' rows="3" value={instrucciones} onChange={(e) => setInstrucciones(e.target.value)}></textarea>
                          <small id="helpId" className="form-text text-muted">Las instrucciones de la bebida. TIP: separá con comas ' , ' cada paso y no pongas el número del mismo (ej "mezclar todo, servir bien frio").</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3">
                          <label htmlFor="imagen" className="form-label text-light">Link a Imagen de la bebida:</label>
                          <input type="text" className="form-control" required name="imagen" value={imagen} id="imagen" onChange={(e) => setImagen(e.target.value)} aria-describedby="fileHelpId" />
                          <small id="fileHelpId" className="form-text text-muted">El enlace de la imagen de la bebida (TIP: Puedes subir la imagen <a href='https://postimages.org/' rel='noreferrer' target='_blank' className='boton text-decoration-none text-info'>aquí</a>)</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className='alert alert-info d-flex align-items-center mt-2'>
                          Ingresá el siguiente número en el cuadro:&nbsp;<strong>{captcha}</strong>&nbsp;&nbsp;<input type="text" className="form-control" value={captchaController} onChange={(e) => setCaptchaController(e.target.value)} style={{ width: '320px' }} name="captchaController" id="captchaController" />
                        </div>
                        <button type="submit" className="btn btn-info mt-2">Agregar bebida</button>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer border border-dark">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
    </>
  )
}