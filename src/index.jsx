require("babel-core/register");
require("babel-polyfill");
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { Auth0Provider } from "./react-auth0-spa.jsx";
import config from "./auth_config.json";
import history from "./utils/history.js";
/* styles */
import "./assets/styles/css/index.css";
import "./assets/styles/css/bootstrap.css";

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
