"use client";
import React, { useEffect } from "react";
import { useState } from "react";
// import { auth } from "../../util/firebase";
import { auth } from "../../util/fire";

import {  sendSignInLinkToEmail } from "firebase/auth";
import EmailImg from "@/Components/EmailImg";
import { ToastContainer ,toast } from "react-toastify";
import Load from "@/Components/Load";


const page = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },2000)
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }else if(email!="bhvnbhsl@gmail.com"){
      toast.error("You are not authorized to login");
      return;
    }

    try {
      await sendSignInLinkToEmail(auth, email, {
        // url: "http://localhost:4000/dashboard",
         url: "https://admin.nepathya.tech/dashboard",
        handleCodeInApp: true,
      });
      window.localStorage.setItem('emailForSignIn', email);
      toast("We have sent you an email with a link to sign in");
      setError("");
      setEmail("");
    } catch (err) {
      setError(err.message);
      setSuccessMessage("");
    }
  };
  return (
    <>
    {loading? <Load/>:<>
      <>
    <ToastContainer/>
      <h1 className="text-center text-5xl m-10 font-bold">Admin Login</h1>
      <div className="flex">
        <div className=" w-4/5 h-full">
          <EmailImg />
        </div>
        <div className="border-l-4 border-black"></div>
        <div className="w-2/5">
          <div className="m-20">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  id="email"
                  className=" focus:outline-none focus:ring-2 focus:ring-black w-72 border-2 border-black p-3 rounded-full"
                  placeholder="Enter Your Email Adderess"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
              <div className="">
                <button
                  type="submit"
                  className="font-bold bg-black text-white px-3 py-2 my-4 mx-28 rounded-3xl"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
    </>}
    </>
  );
};

export default page;
