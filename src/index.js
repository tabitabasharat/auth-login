import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserReducer from "./component/main-for-redux/UserReducer"

const store = configureStore({
  reducer:{
    users: UserReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="813691994222-uninufaub2p14nlaqbtrro35chuhu6ml.apps.googleusercontent.com">
  <React.StrictMode>
    <Provider store={store}>
    <Auth0Provider
      domain="dev-7m1ki30gz0u6n1lv.us.auth0.com"
      clientId="4tyEHdEpDkAKDSnj5EcWLJj0c9zMQ2Qe"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
    </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
