import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './store/storeConfig';
import Modal from './components/modal';
import * as serviceWorker from "./serviceWorker";

const store = configureStore();

const app = (
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    <Modal
      ref={Modal => {
        window.modal = Modal;
      }}
    />
  </React.Fragment>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
