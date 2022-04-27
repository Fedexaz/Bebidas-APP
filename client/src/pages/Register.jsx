import React, { useEffect, useState } from 'react';
import alerta from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Home/NavBar';
import Footer from '../components/Home/Footer';
import { userRegister } from '../services/user.service';

export default function Register() {
  useEffect(() => {
    document.title = "TuFinde! - Registro";
  }, []);

  const goto = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mayor, setMayor] = useState(false);
  const [terminos, setTerminos] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!mayor) return alerta.fire('Error', "Debes ser mayor de edad para poder registrarte", 'info'); 
    if(!terminos) return alerta.fire('Error', "Debes aceptar los términos y condiciones para poder registrate", 'info'); 
    try {
      await userRegister(email, usuario, password);
      alerta.fire('Registro', 'Registro exitoso. Ahora inicia sesión', 'success')
        .then((result) => {
          if (result.isConfirmed) {
            goto('/login');
          } else if (result.isDenied) {
            goto('/login');
          }
        })
    } catch (error) {
      alerta.fire('Error', error, 'error');
    }
  };

  return (
    <>
      <NavBar />
      <div className='container'>
        <div className="row mt-2">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="display-5 text-light text-center">Registro en TuFinde!</div>
            <p className='text-light mx-2 text-center'>¡Regístrate para obtener beneficios y compartir con amigos!</p>
            <p className='text-light mx-2 text-center fw-bold'>Ya tienes una cuenta? <span className='link-info boton' onClick={() => goto('/login')}>Inicia sesión</span></p>
            <form action="#" method="post" className='mt-4' onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="usuario" className="form-label text-light">Ingresa un nombre de usuario:</label>
                <input type="text" required value={usuario} onChange={(e) => setUsuario(e.target.value)} className="form-control" name="usuario" id="usuario" placeholder="ej: Usuario" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-light">Ingresa un correo electrónico:</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" name="email" id="email" placeholder="ej: Usuario" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-light">Ingresa una contraseña:</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" name="password" id="password" placeholder='ej: ************' />
              </div>
              <div className="form-check form-switch my-3">
                <input type="checkbox" className="form-check-input bg-info btn-outline-info" checked={mayor} onChange={(e) => setMayor(e.target.checked)} name="mayor" id="mayor" value="checkedValue" />
                <label className="form-check-label text-light" htmlFor="mayor">
                  Soy mayor de <strong>18 años</strong>.
                </label>
              </div>
              <div className="form-check form-switch my-3">
                <input type="checkbox" className="form-check-input bg-info btn-outline-info" checked={terminos} onChange={(e) => setTerminos(e.target.checked)} name="terminos" id="terminos" value="checkedValue" />
                <label className="form-check-label text-light" htmlFor="terminos">
                  Acepto los <strong>términos y condiciones</strong>.
                </label>
              </div>
              <button type="submit" className="btn btn-info">Ingresar</button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
      <div className='container-fluid'>
        <Footer />
      </div>
    </>
  )
}
