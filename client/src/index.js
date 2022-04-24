import React from 'react';
import ReactDOM from 'react-dom/client';
import './resources/css/index.css';
import './resources/css/buttons.css';
import './resources/css/containers.css';
import './resources/css/cards.css';
import './resources/css/inputs.css';
import './resources/css/extras.css';
import './resources/css/sidebar.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
