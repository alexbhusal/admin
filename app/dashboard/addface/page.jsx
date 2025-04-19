"use client";
import { useEffect } from "react";
import FaceVideo from "../../../Components/FaceVideo";
import useFaceDetection from "../../../Components/FaceDetection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const { userName, startFaceDetection, stopDetection } = useFaceDetection();

  useEffect(() => {
    return () => stopDetection();
  }, [stopDetection]);

  const handleVideoReady = (videoElement) => {
    startFaceDetection(videoElement);
  };

  return (
    <>
      <ToastContainer />
      <p className="text-2xl md:text-5xl text-center m-6 text-black">
        {" "}
        Face Add
      </p>

      <div className="flex justify-center items-center ">
        <div className="">
        <FaceVideo onVideoReady={handleVideoReady} />
        </div>
      </div>

      {userName ? (
        <div className="text-center mt-4">
          <h1 className="text-3xl text-red-600 italic">{userName}</h1>
          <p>Your face is already registered</p>
        </div>
      ) : (
        <p className="text-xl text-center mt-4">Please wait... Loading...</p>
      )}
    </>
  );
};

export default Page;
