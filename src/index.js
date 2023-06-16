import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import axios from 'axios';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const vercelUrl = "https://bebidas-app-sandy.vercel.app"; // URL de Vercel

axios.defaults.baseURL = vercelUrl; // Establecer la URL base para las solicitudes de axios


ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
    <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
  </Auth0Provider>
);

reportWebVitals();
