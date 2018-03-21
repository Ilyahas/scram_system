import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from "react-router-dom";
//redux conf
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './utils/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension'
////
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <BrowserRouter>
    <Provider>
      <Route component={App} />
    </Provider>

  </BrowserRouter>
  , document.getElementById('root'));
