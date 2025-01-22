// axios.js (interceptor setup in plain JS)
import axios from "axios";

var api = axios.create();

if (typeof window !== "undefined") {
  api.interceptors.request.use(
    function (config) {
      var token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (token) {
        config.headers.Authorization = token;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
}

export default api;
