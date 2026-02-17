import AuthCard from "../components/AuthCard";

export default function Home() {
  return (
    <div className="isl-auth-bg">
      {/* Project Title */}
      <div className="isl-title">
        <h1>Indian Sign Language Translator</h1>
        <p>Bridging Speech and Sign</p>
      </div>

      {/* Auth Card */}
      <AuthCard />
    </div>
  );
}
