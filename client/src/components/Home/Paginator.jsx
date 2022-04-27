import React, { useState, useEffect } from 'react';
import Drink from './Drink';

export default function Paginator({ data, hasChange }) {
  const ITEMS_PER_PAGE = 10;
  const BUTTONS_IN_SCREEN = 5;
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [hasChange]);

  const items = (datos) => {
    return datos.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  };

  const getMaxPage = () => {
    return (Math.ceil(data.length / ITEMS_PER_PAGE));
  };

  const getButtonPages = () => {
    const start = Math.floor((page) / BUTTONS_IN_SCREEN) * BUTTONS_IN_SCREEN;
    return new Array(BUTTONS_IN_SCREEN).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <>
      {
        items(data).map(drink => <Drink key={drink._id} data={drink} />)
      }
      <div style={{ width: '100%' }} className='d-flex justify-content-center'>
        <ul className="nav nav-pills flex-row">
          <li className="nav-item m-1">
            <button type="button" className={`btn btn-info ${page < 1 ? 'btn-dark disabled' : ''}`} onClick={() => page < 1 ? null : setPage(page - 1)}>Ant</button>
          </li>
          {
            getButtonPages().map(el => {
              if (el <= getMaxPage()) {
                return (
                  <li className="nav-item m-1" key={el}>
                    <button type="button" className={`btn btn-info ${page === el - 1 ? 'text-light' : ''}`} onClick={() => setPage(el - 1)}>{el}</button>
                  </li>
                )
              } else {
                return null;
              }
            })
          }
          <li className="nav-item m-1">
            <button type="button" className={`btn btn-info ${page >= (getMaxPage() - 1) ? 'btn-dark disabled' : ''}`} onClick={() => page >= (getMaxPage() - 1) ? null : setPage(page + 1)}>Sig</button>
          </li>
        </ul>
      </div>
    </>
  )
}
