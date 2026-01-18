import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data.result;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ 关键：登录成功后跳转
      if (user.role === "ADMIN") {
        navigate("/admin/users");
      } else {
        setMessage("Not an admin user");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
