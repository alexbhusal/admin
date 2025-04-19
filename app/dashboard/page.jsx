"use client";
import { useEffect, useState } from "react";
import { auth } from "../../util/fire";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../../Components/Loading";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      toast(`Welcome ${user?.email}`);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <ToastContainer />
      {user ? (
        <>
          <div>
            <h1 className="text-center text-4xl font-serif italic">
              Admin Dashboard
            </h1>
          </div>
        </>
      ) : (
        <Loading />
      
      )}
    </div>
  );
};

export default Page;
