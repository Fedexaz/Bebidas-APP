import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './resources/extras/extras.css';
import './resources/extras/loader.css';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_APIURL || "http://localhost:3001";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
