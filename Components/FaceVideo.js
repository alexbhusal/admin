"use client";
import { useEffect, useRef } from "react";

const FaceVideo = ({ onVideoReady }) => {
  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        if (onVideoReady) onVideoReady(videoRef.current);
      })
      .catch((err) => {
        console.error("Camera error:", err);
        alert("Please allow camera access.");
      });
  }, [onVideoReady]);

  return (
    <video
      ref={videoRef}
      autoPlay
      crossOrigin="anonymous"
      className="rounded-2xl border-4 border-dashed border-black w-full"
    />
  );
};

export default FaceVideo;
