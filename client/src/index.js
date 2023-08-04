import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import thunk from "redux-thunk";
import {createStore,applyMiddleware,compose} from "redux";
import { Provider } from 'react-redux';
import reducers from "./reducers";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store=createStore(reducers,applyMiddleware(compose(thunk)));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);


