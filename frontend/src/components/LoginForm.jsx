import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      password,
    };

    try {
      const res = await loginUser(formData);

      if (res.message === "Login successful") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        navigate("/translator");
      } else {
        setError(res.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin} autoComplete="off">
      <input
        name="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="off"
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        required
      />

      {error && (
        <p style={{ color: "red", marginTop: "8px" }}>
          {error}
        </p>
      )}

      <button type="submit">
        Login
      </button>
    </form>
  );
}
