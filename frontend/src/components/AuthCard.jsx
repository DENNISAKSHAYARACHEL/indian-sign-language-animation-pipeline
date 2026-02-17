import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./AuthCard.css";

export default function AuthCard() {
  const [flip, setFlip] = useState(false);

  return (
    <div className={`auth-card ${flip ? "flipped" : ""}`}>
      <div className="card-face front">
        <LoginForm />
        <p onClick={() => setFlip(true)}>New user? Sign up</p>
      </div>

      <div className="card-face back">
        <SignupForm />
        <p onClick={() => setFlip(false)}>Already have an account? Login</p>
      </div>
    </div>
  );
}