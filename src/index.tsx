import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import "./i18n";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);

