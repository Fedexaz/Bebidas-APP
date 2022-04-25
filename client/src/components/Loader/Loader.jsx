import React from 'react'

export default function Loader({ data }) {
  return (
    <div className='d-flex flex-column align-items-center p-5'>
      <div className="lds-heart"><div></div></div>
      <span className='text-light'>Cargando {data}...</span>
    </div>
  )
}
