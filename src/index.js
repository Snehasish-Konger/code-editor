import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import  createBrowserHistory  from "./utils/history";

ReactDOM.render(
  <React.Fragment>
    <Router history={createBrowserHistory}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.Fragment>,
  document.getElementById("root")
);

reportWebVitals();
