import { useEffect, useState } from "react";

export default function SignPlayer({ tokens }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [tokens]);

  if (!Array.isArray(tokens) || tokens.length === 0) {
    return null;
  }

  const token = tokens[index];
  if (!token) return null;

  const nextVideo = () => {
    if (index < tokens.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="isl-output">
      <div className="avatar-stage">
        <video
          key={`${token}-${index}`}
          autoPlay
          muted
          playsInline
          onEnded={nextVideo}
          className="avatar-video"
        >
          <source
            src={`http://localhost:8000/static/isl_videos/${token}.mp4`}
            type="video/mp4"
          />
        </video>
      </div>

      <div className="caption">
        {String(token).replace(/_/g, " ").toUpperCase()}
      </div>
    </div>
  );
}
