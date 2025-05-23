import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="121562687363-0kb3u42nfafbgmpd52sqvac5vmjmjkj5.apps.googleusercontent.com">
  <React.StrictMode>
    <Auth0Provider
      domain="dev-7m1ki30gz0u6n1lv.us.auth0.com"
      clientId="4tyEHdEpDkAKDSnj5EcWLJj0c9zMQ2Qe"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
