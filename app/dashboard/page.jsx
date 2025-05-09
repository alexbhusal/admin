"use client";
import { useEffect, useState } from "react";
import { auth } from "../../util/fire";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../../Components/Loading";
import { toast, ToastContainer } from "react-toastify";
import AdminCard from "@/Components/AdminCard";
import BasicPie from "@/Components/AdminPieChart";
import CustomGauge from "@/Components/AdminGraph";
import { firestore } from "../../util/fire"; 
import { collection, getDocs } from "firebase/firestore";

const Page = () => {
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);

  // Fetch student data from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user && !sessionStorage.getItem("welcomeToastShown")) {
        toast(`Welcome ${user.email}`);
        sessionStorage.setItem("welcomeToastShown", "true");
      }
    });

    // Fetch student data when the component mounts
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
        const department = student.faculty ; 
        if (departmentCounts[department] !== undefined) {
          departmentCounts[department]++;
        }
      });

      setStudentData(departmentCounts);
    };

    fetchStudentData();

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
              <CustomGauge />
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
