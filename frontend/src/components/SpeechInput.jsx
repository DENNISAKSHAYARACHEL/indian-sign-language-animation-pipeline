import { useState } from "react";



export default function SpeechInput({ onTextCaptured, speechLang }) {
  const [listening, setListening] = useState(false);

  const startSpeech = () => {
    if (listening) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLang;
    recognition.interimResults = false;

    setListening(true);

    recognition.onresult = (e) => {
      const capturedText = e.results[0][0].transcript;
      onTextCaptured(capturedText);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  return (
    <div className="mic-wrapper">
      <button
        className="isl-mic-btn"
        onClick={startSpeech}
        disabled={listening}
      >
        🎤
      </button>

      {listening && (
        <span style={{fontSize: "20px"}} className="listening-label">
              Listening...
        </span>
      )}
    </div>
  );
}
