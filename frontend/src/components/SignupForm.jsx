import { signupUser } from "../services/api";
import { useState } from "react";

export default function SignupForm() {
  const [msg, setMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    const res = await signupUser(data);

    if (res.message) {
      setMsg("Signup successful. Please login.");
      setUsername("");
      setPassword("");
    } else {
      setMsg(res.error || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup} autoComplete="off">
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

      <button type="submit">Signup</button>

      {msg && (
        <p style={{ marginTop: "8px" }}>
          {msg}
        </p>
      )}
    </form>
  );
}
