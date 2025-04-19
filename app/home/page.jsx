"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { auth } from "../../util/fire";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loading from "../../Components/Loading";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const handleSignIn = async () => {
      if (!isSignInWithEmailLink(auth, window.location.href)) return;

      Cookies.set("token", "AlexBhusal", { path: "/", expires: 30 });

      let email =
        localStorage.getItem("emailForSignIn") ||
        localStorage.getItem("email") ||
        window.prompt("Please provide your email");

      if (!email) return console.error("No email provided");

      localStorage.setItem("emailForSignIn", email);

      try {
        await signInWithEmailLink(auth, email, window.location.href);
        localStorage.removeItem("emailForSignIn");
        router.push("/dashboard");
      } catch (error) {
        console.error("Sign-in error:", error);
        router.push("/login");
      }
    };

    handleSignIn();
  }, [router]);

  return <Loading />;
};

export default Page;
