import { GoogleLogin } from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedEmail && storedName && storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      console.log(`Already logged in as ${storedEmail}`);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate the email format (basic regex for email validation)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !name || !password) {
      setError("Enter requried fields!");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    // Store the email (avoid storing password for security reasons)
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("isLoggedIn", "true");

    // Log success and alert user
    console.log("Login successful!", email);
    alert("Login successful!");

    // Redirect to the main page with the email (excluding password for security)
    navigate("/main", { state: {name, email, } });

    // Set logged-in state
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Remove all login-related data from localStorage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userpass");
    localStorage.removeItem("googleName");
    localStorage.removeItem("googleEmail");
    localStorage.removeItem("googlePicture");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setError("");
    alert("You have logged out.");
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        {isLoggedIn ? (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Welcome, {localStorage.getItem("userEmail")}!
            </h2>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                disabled={!email || !password} // Disable submit button if email or password is empty
              >
                Login
              </button>

              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const credentialResponseDecoded = jwtDecode(
                    credentialResponse.credential
                  );
                  console.log(credentialResponseDecoded);

                  // Save to localStorage
                  localStorage.setItem(
                    "googleName",
                    credentialResponseDecoded.name
                  );
                  localStorage.setItem(
                    "googleEmail",
                    credentialResponseDecoded.email
                  );
                  localStorage.setItem(
                    "googlePicture",
                    credentialResponseDecoded.picture
                  );

                  // Navigate to the main page with user data
                  navigate("/main", {
                    state: {
                      name: credentialResponseDecoded.name,
                      picture: credentialResponseDecoded.picture,
                      email: credentialResponseDecoded.email,
                    },
                  });
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
                ux_mode="popup"
                scope="openid profile email"
              />
            </form>

            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
