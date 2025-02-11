"use client";
import { useEffect, useState } from "react";
// import { auth } from "../../util/firebase";
import { auth } from "../../util/fire";
import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  signInWithEmailLink,
  // signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Loading from "@/Components/Loading";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  // const handleLogOut = async () => {
  //   try {
  //     await signOut(auth);
  //     toast.warning("You are logged out");
  //     setTimeout(() => {
  //       router.push("/login");
  //     }, 2000);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   const email = window.localStorage.getItem('emailForSignIn');
  //   if (email) {
  //     const url = window.location.href;
  //     signInWithEmailLink(auth,email, url)
  //       .then((result) => {
  //         window.localStorage.removeItem('emailForSignIn');
  //         setUser(result.user);
  //       })
  //       .catch((error) => {
  //         console.error('Error signing in with email link:', error);
  //         router.push('/login');
  //       });
  //   }
  // }, [router]);

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email =
        window.localStorage.getItem("emailForSignIn") ||
        window.localStorage.getItem("email");

      if (!email) {
        email = window.prompt("Please provide your email");
        if (email) {
          window.localStorage.setItem("emailForSignIn", email);
        } else {
          toast.error("No email provided");
          return;
        }
      }

      // Continue with the sign-in process
      const url = window.location.href;
      signInWithEmailLink(auth, email, url)
        .then((result) => {
          window.localStorage.removeItem("emailForSignIn");
          setUser(result.user);
        })
        .catch((error) => {
          console.error("Error signing in with email link:", error);
          router.push("/login");
        });
    }
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      toast(`Welcome ${user.email}`);
    });
    return ()=>unsubscribe();
  }, []);

  return (
    <div>
      <ToastContainer />
      {user ? (
        <>
        <div  >
          <h1 className="text-center text-4xl font-serif italic">Admin Dashboard</h1>
        </div>
      
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;
