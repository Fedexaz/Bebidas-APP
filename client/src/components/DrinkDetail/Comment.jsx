import React from 'react';
import alerta from 'sweetalert2';
import { timeLeftComment } from '../../services/time.utils';
import { getUserData } from '../../services/user.service';
import { FcEmptyTrash } from 'react-icons/fc';
import { borrarComentario } from '../../services/getdrinks.service';

export default function Comment({ data }) {
  const usuarioID = getUserData('id');

  const { comment, commentID, date, userID, userName } = data;

  const deleteComment = async () => {
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
        } catch (error) {
          alerta.fire('Error al eliminar comentario', error, 'error');
        }
      }
    })
  };

  return (
    <div className='border border-light my-1 p-2 d-flex flex-row justify-content-between'>
      <div>
      <h5 className='text-light'>{userName} <span style={{ fontWeight: 'lighter', fontSize: '14px' }}>{timeLeftComment(date)}</span></h5>
      <span className='text-light'>{comment}</span>
      </div>
      <div>
        { userID !== null && userID === usuarioID ?
          <FcEmptyTrash style={{ fontSize: '25px' }} onClick={deleteComment} className='boton' title='Eliminar comentario' />
          :
          null
        }
      </div>
    </div>
  )
}
