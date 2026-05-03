import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../style/blog.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    if (!email || !password) {
      alert("All fields required ⚠️");
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className="forgot">Forgot password?</p>

        <button className="login-btn" onClick={loginUser}>
          LOGIN
        </button>

        <p className="or">Or Sign Up Using</p>

        <div className="socials">
          <span className="circle fb">f</span>
          <span className="circle tw">t</span>
          <span className="circle gg">G</span>
        </div>
      </div>
    </div>
  );
}

export default Login;