import moment from 'moment';

export const timeLeft = (fecha) => {
  return moment(fecha, "DD/MM/YYYY").fromNow();
};

export const timeLeftComment = (fecha) => {
  return moment(fecha).fromNow();
};