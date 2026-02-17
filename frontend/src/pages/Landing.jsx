import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  const navigate = useNavigate();

  const videos = [
    "/videos/isl1.mp4",
    "/videos/isl2.mp4",
    "/videos/isl3.mp4",
    "/videos/isl4.mp4",
    "/videos/isl5.mp4",
  ];

  return (
    <div className="landing-wrapper">

      {/* BACKGROUND VIDEO GRID */}
      <div className="video-grid-bg">
        {[...Array(6)].map((_, colIndex) => (
  <div
    key={colIndex}
    className={`video-column ${
      colIndex % 2 === 0 ? "move-up" : "move-down"
    }`}
  >
    {[...videos, ...videos].map((src, i) => (
      <video
        key={i}
        src={src}
        autoPlay
        loop
        muted
        playsInline
      />
    ))}
  </div>
))}

      </div>

      {/* DARK OVERLAY */}
      <div className="overlay"></div>

      {/* FOREGROUND CONTENT */}
      <div className="landing-content">
        <h1>Indian Sign Language Animation Pipeline</h1>
        <p className="subtitle">Video-based Hand Communication</p>

        <button
          className="get-started-btn"
          onClick={() => navigate("/auth")}
        >
          Get Started
        </button>

        <p style={{fontSize: "25px"}} className="quote">
          “Communication is not about speaking,
          it is about being understood.”
        </p>
      </div>

    </div>
  );
}
