import React, { useEffect, useState } from 'react';
import alerta from 'sweetalert2';
import decoder from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Home/NavBar';
import Footer from '../components/Home/Footer';
import { userLogin } from '../services/user.service';

export default function Login() {
  useEffect(() => {
    document.title = "TuFinde! - Iniciar sesión";
  }, []);

  const goto = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datos = await userLogin(usuario, password);
      const data = decoder(datos);
      console.log(data)
      localStorage.setItem('token', JSON.stringify(datos));
      localStorage.setItem('data', JSON.stringify(data));
      localStorage.setItem('loggedIn', true);
      alerta.fire('Iniciar sesión', 'Iniciaste sesión correctamente como ' + data.name , 'success')
        .then((result) => {
          if (result.isConfirmed) {
            goto('/');
          } else if (result.isDenied) {
            goto('/');
          }
        })
    } catch (error) {
      alerta.fire(
        'Error',
        error,
        'error'
      )
    }
  };

  return (
    <>
      <NavBar />
      <div className='container'>
        <div className="row mt-2">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="display-5 text-light text-center">Ingresar a TuFinde!</div>
            <p className='text-light mx-2 text-center'>¡Ingresá para compartir con amigos!</p>
            <p className='text-light mx-2 text-center fw-bold'>¿No tienes una cuenta? <span className='link-info boton' onClick={() => goto('/register')}>Regístrate</span></p>
            <form action="#" method="post" className='mt-4' onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="usuario" className="form-label text-light">Correo electrónico:</label>
                <input required type="email" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} name="usuario" id="usuario" placeholder="ej: ejemplo@mail.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-light">Contraseña:</label>
                <input required type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder='ej: ************' />
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
