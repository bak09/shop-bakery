import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { adminCredentials } from "../../data/mockData";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/admin/dashboard";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (login(email, password)) {
      navigate(redirectPath, { replace: true });
      return;
    }

    setError("Invalid credentials.");
  };

  return (
    <div className="main">
      <div className="container">
        <section className="section">
          <h2 className="section__title">Admin Login</h2>
          <div className="card" style={{ maxWidth: "420px", margin: "0 auto" }}>
            <p className="muted">
              Demo access: {adminCredentials.email} / {adminCredentials.password}
            </p>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>Email</label>
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>Password</label>
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              {error ? <p className="form-error">{error}</p> : null}
              <button className="btn" type="submit">
                Login
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
