import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducers } from './redux/reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

const store = createStore(rootReducers);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root")
);