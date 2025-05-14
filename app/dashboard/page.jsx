"use client";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../util/fire";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

import Loading from "../../Components/Loading";
import AdminCard from "@/Components/AdminCard";
import BasicPie from "@/Components/AdminPieChart";
import CustomGauge from "@/Components/AdminGraph";

const Page = () => {
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [presentCount, setPresentCount] = useState(0);
  const selectedDate = new Date().toISOString().split("T")[0]; // Today's date



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user && !sessionStorage.getItem("welcomeToastShown")) {
        toast(`Welcome ${user.email}`);
        sessionStorage.setItem("welcomeToastShown", "true");
      }
    });

    const fetchStudentData = async () => {
      const userDB = collection(firestore, "users");
      const snapshot = await getDocs(userDB);
      const students = snapshot.docs.map(doc => doc.data());

      // Calculate total students in each department
      const departmentCounts = {
        BCA: 0,
        "Bsc. CSIT": 0,
        Other: 0,
      };

      students.forEach(student => {
        const department = student.faculty;
        if (departmentCounts[department] !== undefined) {
          departmentCounts[department]++;
        } else {
          departmentCounts.Other++;
        }
      });

      setStudentData(departmentCounts);
    };

    const fetchAttendanceData = async () => {
      try {
        const attData = collection(firestore, `attendance/${selectedDate}/records`);
        const snapshot = await getDocs(attData);
        const records = snapshot.docs.map(doc => doc.data());

        const present = records.filter(record => record.status === "present").length;
        setPresentCount(present);
      } catch (error) {
        console.error("Error fetching today's attendance:", error);
      }
    };

    fetchStudentData();
    fetchAttendanceData();

    return () => unsubscribe();
  }, []);

  if (!studentData) {
    return <Loading />;
  }

  const totalStudents = Object.values(studentData).reduce((acc, count) => acc + count, 0);

  return (
    <div>
      <ToastContainer />
      {user ? (
        <>
          <div>
            <h1 className="text-center text-4xl font-serif italic m-2">Admin Dashboard</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-200 rounded-3xl">
            <AdminCard totalStudents={totalStudents} />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center mt-10">
            <div className="w-1/2 flex flex-col items-center">
              <CustomGauge totalStudents={totalStudents} presentCount={presentCount} />
              <h1 className="text-center text-4xl font-serif italic">Today's Attendance</h1>
            </div>
            <div className="w-1/2 flex flex-col items-center">
              <BasicPie departmentCounts={studentData} />
              <h1 className="text-center text-4xl font-serif italic">Available Faculties</h1>
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
