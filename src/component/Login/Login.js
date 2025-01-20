import React, { useState } from "react";
import "./Login.css";

import { useAuth0 } from "@auth0/auth0-react";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedinImage from "react-linkedin-login-oauth2/assets/linkedin.png";

const CLIENT_ID = "your_github_client_id"; // Replace with your GitHub Client ID
const CLIENT_SECRET = "your_github_client_secret"; // Use this in your backend only (not recommended in the frontend)
const REDIRECT_URI = `${window.location.origin}/main`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [githubUser, setGithubUser] = useState(null);

  const responseFacebook = (response) => {
    console.log("Login with Facebook:", response);
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: "77zr60xwmw8qhh",
    redirectUri: REDIRECT_URI,
    scope: "openid profile email",
    onSuccess: (code) => {
      console.log("LinkedIn login successful. Authorization code:", code);
      alert("LinkedIn Login Success!");
    },
    onError: (error) => {
      console.log("LinkedIn login failed:", error);
      alert("LinkedIn Login Failed");
    },
  });

  const handleGitHubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${`Ov23liJwowr5MmEjFLUR`}&redirect_uri=${REDIRECT_URI}&scope=read:user user:email`;
    window.location.href = githubAuthUrl;
  };

  const handleGitHubCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      try {
        const response = await fetch("https://github.com/login/oauth/access_token", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
          }),
        });

        const data = await response.json();
        const accessToken = data.access_token;

        if (accessToken) {
          const userResponse = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const githubUserData = await userResponse.json();
          setGithubUser(githubUserData);
        } else {
          console.error("GitHub login failed: No access token received.");
        }
      } catch (error) {
        console.error("Error during GitHub login:", error);
      }
    }
  };

  // Automatically handle GitHub callback when the component loads
  React.useEffect(() => {
    handleGitHubCallback();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          {isAuthenticated && <p>Hello, {user.name}</p>}

          <div className="btns">
            {isAuthenticated ? (
              <button onClick={() => logout()}>Logout</button>
            ) : (
              <>
                <h2>Login</h2>
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
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
                <img
                  onClick={linkedInLogin}
                  src={linkedinImage}
                  alt="Sign in with LinkedIn"
                />
                <FacebookLogin
                  appId="1647215686171432"
                  onSuccess={responseFacebook}
                  onError={(error) =>
                    console.error("Facebook Login Error:", error)
                  }
                  onProfileSuccess={(response) =>
                    console.log("Facebook Profile:", response)
                  }
                />
                <button
                  type="button"
                  onClick={handleGitHubLogin}
                  className="bg-gray-700 text-white px-4 py-2 mt-4 rounded"
                >
                  Login with GitHub
                </button>
              </>
            )}
          </div>
        </form>
        {githubUser && (
          <div className="github-user">
            <h3>Welcome, {githubUser.login}!</h3>
            <img
              src={githubUser.avatar_url}
              alt="GitHub Avatar"
              className="w-16 h-16 rounded-full"
            />
            <p>GitHub ID: {githubUser.id}</p>
            <p>Email: {githubUser.email || "Not Available"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
