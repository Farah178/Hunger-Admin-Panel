import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

<React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  
);

reportWebVitals();
