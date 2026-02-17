import { useState } from "react";
import { translateToSign } from "../api";
import SignPlayer from "../components/SignPlayer";
import SpeechInput from "../components/SpeechInput";
import "../components/isl-ui.css";

export default function Translator() {
  const username = localStorage.getItem("username") || "User";

  const [language, setLanguage] = useState(null);
  const [text, setText] = useState("");
  const [speechText, setSpeechText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);

  const langCode = language === "Tamil" ? "ta" : "te";

  const transliterate = async (input) => {
    if (!input) return "";

    const langParam =
      language === "Tamil"
        ? "ta-t-i0-und"
        : "te-t-i0-und";

    try {
      const res = await fetch(
        `https://inputtools.google.com/request?text=${encodeURIComponent(
          input
        )}&itc=${langParam}`
      );

      const data = await res.json();

      if (data[0] === "SUCCESS") {
        return data[1][0][1][0];
      }
    } catch (err) {
      console.error(err);
    }

    return input;
  };

  const handleSubmit = async () => {
    const finalInput = text || speechText;
    if (!finalInput.trim()) return;

    try {
      setLoading(true);
      setTokens([]);
      setDisplayText("");

      const converted = await transliterate(finalInput);
      setDisplayText(converted);

      const res = await translateToSign({
        text: converted,
        lang: langCode,
      });

      setTokens(res.data.isl_sequence);

      setText("");
      setSpeechText("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="translator-bg">
      <div className="translator-container">

        {!language && (
          <div className="language-overlay">
            <h2>Welcome, {username}</h2>
            <p>Select your preferred language</p>

            <div className="lang-buttons">
              <button onClick={() => setLanguage("Telugu")}>
                Telugu
              </button>
              <button onClick={() => setLanguage("Tamil")}>
                Tamil
              </button>
            </div>
          </div>
        )}

        {language && (
          <div className="translator-layout">

            {/* ===== TOP CENTERED LANGUAGE BAR ===== */}
            <div className="top-bar">
              <div className="lang-pill">
                {language}
                <button
                  className="change-lang-btn"
                  onClick={() => {
                    setLanguage(null);
                    setTokens([]);
                    setDisplayText("");
                  }}
                >
                  Change
                </button>
              </div>
            </div>

            {/* ===== MIDDLE VIDEO AREA ===== */}
            <div className="middle-output">

              {loading && (
                <div className="placeholder-text">
                  Translating…
                </div>
              )}

              {!loading && tokens.length === 0 && (
                <div className="placeholder-text">
                  Your sign animation will appear here
                </div>
              )}

              <SignPlayer tokens={tokens} />

            </div>

            {/* ===== BOTTOM INPUT AREA ===== */}
            <div className="bottom-input">

              <div className="input-row">
                <textarea
                  className="isl-textarea"
                  placeholder="Type here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                <SpeechInput
                  onTextCaptured={(captured) => setSpeechText(captured)}
                  speechLang={langCode === "te" ? "te-IN" : "ta-IN"}
                />
              </div>

              <button
                className="submit-btn"
                onClick={handleSubmit}
              >
                Submit
              </button>

              {displayText && (
                <div className="converted-text">
                  <strong>Input:</strong> {displayText}
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

