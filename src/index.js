import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChakraProvider } from '@chakra-ui/react'
import Provider from './context/Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
  <React.StrictMode>
    <Provider>
     <App />
    </Provider> 
  </React.StrictMode>
  </ChakraProvider>
);


