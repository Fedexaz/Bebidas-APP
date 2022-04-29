import React, { useState, useEffect } from 'react';
import alerta from 'sweetalert2';
import NavBar from '../components/Home/NavBar';
import Footer from '../components/Home/Footer';
import { getUserData } from '../services/user.service';
import { agregarBebida } from '../services/myDrink.service';

const Modal = () => {
  const usuarioID = getUserData('id');

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [alcoholica, setAlcoholica] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [instrucciones, setInstrucciones] = useState('');
  const [imagen, setImagen] = useState('');

  const [captcha, setCaptcha] = useState(Math.round(Math.random() * 100000));
  const [captchaController, setCaptchaController] = useState('');

  useEffect(() => {
    document.title = "TuFinde! - Mis bebidas";
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
          instrucciones: instrucciones.split(','),
          ingredientes: ingredientes.split(','),
          img: imagen,
          createdInPage: true,
          creatorID: usuarioID
        };
        try {
          await agregarBebida(datos);
          alerta.fire('Perfecto!', "Bebida agregada correctamente a la base de datos!, ahora podrán disfrutar de tu creación!", "success");
        } catch (error) {
          alerta.fire('Ups', "Error al agregar la bebida", "error");
        }

      }
      else {
        const faltantes = "" + !nombre & "El nombre" + !categoria & ", la categoria" + !alcoholica & ", es alcoholica?" + !ingredientes & ", faltan los ingredientes" + !instrucciones & ", faltan las instrucciones" + !imagen & ", falta la imagen";
        alerta.fire('Alerta', "Faltan agregar algunos datos: " + faltantes, "warning");
      }
    }
    else {
      alerta.fire('Error', "El captcha no coincide, reintenta!", 'warning');
      setCaptcha(Math.round(Math.random() * 100000));
    }
  };

  return (
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
                  <label htmlFor="imagen" className="form-label">Imagen de la bebida</label>
                  <input type="file" className="form-control" required name="imagen" id="imagen" onChange={(e) => setImagen(e.target.files[0])} aria-describedby="fileHelpId" />
                  <small id="fileHelpId" className="form-text text-muted">La imagen de la bebida (tamaño máximo: 3mb)</small>
                  {
                    imagen ?
                      <div className='text-light'>Imagen: {imagen.name}</div>
                      :
                      null
                  }
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
  );
};

export default function MyDrinks() {
  return (
    <>
      <NavBar />
      <div className='container my-2'>
        <h3 className="display-4 text-light">Mis bebidas</h3>
        <hr />
        <div className="row">
          <div className="col-md-9">
            <h3 className="display-6 text-light">Todas tus bebidas</h3>
            <p>
              Aquí van todas tus bebidas
            </p>
          </div>
          <div className="col-md-3 d-flex flex-column align-items-center">
            <button type="button" className="btn btn-info mt-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Agregar mis bebidas
            </button>
            <Modal />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
    </>
  )
}