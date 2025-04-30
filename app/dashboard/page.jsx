"use client";
import { useEffect, useState } from "react";
import { auth } from "../../util/fire";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../../Components/Loading";
import { toast, ToastContainer } from "react-toastify";
import AdminCard from "@/Components/AdminCard";
import BasicPie from "@/Components/AdminPieChart";
import CustomGauge from "@/Components/AdminGraph";

const Page = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      // Show toast only if not shown yet in this session
      if (user && !sessionStorage.getItem("welcomeToastShown")) {
        toast(`Welcome ${user.email}`);
        sessionStorage.setItem("welcomeToastShown", "true");
      }
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AdminCard />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center mt-10">
            <div className="w-1/2 flex flex-col items-center">
              <CustomGauge />
              <h1 className="text-center text-4xl font-serif italic">
                Today's Attendance
              </h1>
            </div>
            <div className="w-1/2 flex flex-col items-center">
              <BasicPie />
              <h1 className="text-center text-4xl font-serif italic">
                Available Faculties
              </h1>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;
