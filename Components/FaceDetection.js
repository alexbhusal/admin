"use client";
import { useState, useRef } from "react";
import * as faceapi from "face-api.js";
import {firestore, collection, addDoc, getDocs } from "../util/fire";
import { toast } from "react-toastify";
import UserPrompt from "./UserPrompt";

const useFaceDetection = () => {
  const [userName, setUserName] = useState("");
  const [faceDetected, setFaceDetected] = useState(false);
  const intervalRef = useRef();

  const startFaceDetection = async (videoElement) => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);
      intervalRef.current = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        if (detections.length > 0) {
          const descriptor = detections[0].descriptor;
          const matchedName = await matchFace(descriptor);

          if (matchedName) {
            setUserName(matchedName);
          } else if (!faceDetected) {
            setFaceDetected(true);
            await handleNewFace(descriptor);
          }
        } else {
          setFaceDetected(false);
        }
      }, 5000);
    } catch (error) {
      console.error("Error starting detection:", error);
    }
  };

  const matchFace = async (descriptor) => {
    const snapshot = await getDocs(collection(firestore, "faces"));
    const faces = snapshot.docs.map((doc) => doc.data());

    for (const face of faces) {
      const stored = new Float32Array(face.faceDescriptor);
      if (faceapi.euclideanDistance(descriptor, stored) < 0.6) {
        return face.name;
      }
    }
    return null;
  };

  const handleNewFace = async (descriptor) => {
    const usersSnapshot = await getDocs(collection(firestore, "users"));
    const userList = usersSnapshot.docs.map((doc) => doc.data().fullName);

    const result = await UserPrompt(userList);

    if (result.isConfirmed) {
      await addDoc(collection(firestore, "faces"), {
        name: result.value,
        faceDescriptor: Array.from(descriptor),
        timestamp: new Date(),
      });

      toast.success(`Face registered for ${result.value}`);
    }
  };

  return {
    userName,
    startFaceDetection,
    stopDetection: () => clearInterval(intervalRef.current),
  };
};

export default useFaceDetection;
