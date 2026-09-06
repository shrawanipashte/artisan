import { useState, useRef } from "react";
import "./App.css";

function App({ onDescriptionReady }) {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
      const [errorMsg, setErrorMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");

  const recognitionRef = useRef(null);
  const finalTextRef = useRef("");

  const startListening = () => {
    setErrorMsg("");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg("Speech recognition is not supported. Please use Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    finalTextRef.current = transcript;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTextRef.current += result[0].transcript + " ";
        } else {
          interim += result[0].transcript;
        }
      }

      setTranscript(finalTextRef.current + interim);
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        setErrorMsg("No speech detected. Try speaking louder or closer to the mic.");
      } else if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setErrorMsg("Microphone permission denied. Please allow mic access in Chrome.");
      } else if (event.error === "audio-capture") {
        setErrorMsg("No microphone found. Please check your device.");
      } else if (event.error === "network") {
        setErrorMsg("Network error. Please check your internet connection.");
      } else {
        setErrorMsg("Something went wrong: " + event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (e) {
      setErrorMsg("Could not start microphone. Try again.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const clearText = () => {
    setTranscript("");
    finalTextRef.current = "";
    setErrorMsg("");
  };

    return (
    <div className="page-container">
      <div className="card">
        <h1>Tell us about your product</h1>
        <p className="subtitle">
          Describe your handmade product in Hindi. We'll help turn your words into a professional product listing.
        </p>

        {errorMsg && <p className="status-message error">{errorMsg}</p>}

        <div>
          <button
            className={`mic-button ${isListening ? "listening" : ""}`}
            onClick={startListening}
            disabled={isListening}
          >
            {isListening ? "🔴 Listening..." : "🎤 Start Speaking"}
          </button>

          <button
            className="stop-button"
            onClick={stopListening}
            disabled={!isListening}
          >
            Stop Speaking
          </button>
        </div>

        <textarea
          className="transcript-box"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="आप अपने उत्पाद के बारे में बताइए..."
        />

        <div className="action-row">
          <button className="clear-button" onClick={clearText}>
            Clear
          </button>
          <button
            className="use-button"
            onClick={() => {
              console.log("Transcript ready for handoff:", transcript);
              if (onDescriptionReady) {
                onDescriptionReady(transcript);
              }
              setConfirmMsg("✅ Description saved!");
              setTimeout(() => setConfirmMsg(""), 2000);
            }}
          >
            Use This Description
          </button>
        </div>

        {confirmMsg && <p className="status-message success">{confirmMsg}</p>}
      </div>
    </div>
  );
  }

export default App;