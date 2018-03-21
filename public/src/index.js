import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter,Route}from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
        <Route component={App}/>
  </BrowserRouter>
  , document.getElementById('root'));
