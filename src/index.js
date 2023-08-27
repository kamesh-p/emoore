import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./store"; // Import your Redux store
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* Wrap your component tree with Provider */}
    <React.StrictMode>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
