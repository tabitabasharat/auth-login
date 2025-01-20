import React, { useState } from "react";
import "./SignIn.css";

import { useAuth0 } from "@auth0/auth0-react";


// with autho google

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle the form submission,
    // such as making an API call to authenticate the user.
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

  console.log("current user", user);
  return (
    <div className="container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          {isAuthenticated && <p>heloo {user.name}</p>}

          <div className="btns">
            {isAuthenticated ? (
              <button onClick={(e) => logout()}> logout</button>
            ) : (
              <>
                <h2>Sign In</h2>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" onClick={(e) => loginWithRedirect()}>
                  Sign In
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  loginBox: {
    width: "400px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    marginBottom: "20px",
  },
  inputField: {
    display: "block",
    width: "93%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  loginButton: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
  },
  GoogleButton: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#fff",
    color: "#007BFF",
    cursor: "pointer",
  },
};
export default SignIn;
