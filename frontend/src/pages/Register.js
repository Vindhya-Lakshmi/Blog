import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../style/register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        username,
        email,
        password
      });

      alert("Registered successfully ✅");
      navigate("/login");
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert(err.response?.data?.error || "Registration failed ❌");
    }
  };

  return (
    <div className="register-container">

      <div className="left-panel">
        <h1>Get Started</h1>

        <p>Already have an account?</p>

        <button
          className="login-switch"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </div>

      <div className="right-panel">
        <p className="help">Need help?</p>

        <h2>Create account</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          placeholder="Full Name"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <div className="terms">
          <input type="checkbox"/>
          <span>I accept the terms of the agreement</span>
        </div>

        <button
          className="signup-btn"
          onClick={handleRegister}
        >
          Sign up
        </button>
      </div>

    </div>
  );
}

export default Register;