import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./FacialExpression.css";
import axios from "axios";

export default function FacialExpression({ setsongs }) {
  const videoRef = useRef();

  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(() => setError("Camera access denied"));
  };

  async function detectMood() {
    setLoading(true);
    setError("");
    setMood("");

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      setError("No face detected");
      setLoading(false);
      return;
    }

    let max = 0;
    let detectedMood = "";

    for (const exp of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[exp] > max) {
        max = detections[0].expressions[exp];
        detectedMood = exp;
      }
    }

    setMood(detectedMood);

    try {
      const res = await axios.get(
        `http://localhost:3000/songs?mood=${detectedMood}`
      );
      setsongs(res.data.songs);
    } catch {
      setError("Server not running");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="mood-container">
      <div className="camera-card">
        <h2 className="card-title">Detect your mood 🎭</h2>

        <video
          ref={videoRef}
          autoPlay
          muted
          className="user-video-feed"
        />

        <button
          className="detect-btn"
          onClick={detectMood}
          disabled={loading}
        >
          {loading ? "Detecting..." : "Detect Mood"}
        </button>

        {mood && <p className="mood-text">Mood: {mood}</p>}
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}
