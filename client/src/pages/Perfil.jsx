import React from 'react';
import NavBar from '../components/Home/NavBar';
import Footer from '../components/Home/Footer';

export default function Perfil() {
  return (
    <>
      <NavBar />
      <div>Perfil</div>
      <div className="container-fluid">
        <Footer />
      </div>
    </>
  )
}