import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import axios from 'axios'

 const domain = process.env.REACT_APP_AUTH0_DOMAIN;
 const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
 axios.defaults.baseURL= "http://localhost:3001";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
    <Auth0Provider 
    domain={domain} 
    clientId={clientId} 
    redirectUri={window.location.origin}>
    <App />
    </Auth0Provider>
    </Router>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
