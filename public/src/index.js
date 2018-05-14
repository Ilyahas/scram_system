import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import rootReducer from './utils/rootReducer'
import { token } from '../src/actions/auth'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
if (localStorage.JWT) {
  store.dispatch(token(localStorage.JWT))
}
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)
