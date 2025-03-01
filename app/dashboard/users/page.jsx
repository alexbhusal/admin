"use client";
import React, { useEffect, useState } from "react";
import { getDocs, firestore, collection } from "../../../util/fire";
import Loadusers from "../../../Components/LoadUsers";
import * as XLSX from "xlsx"; 



const Page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDB = collection(firestore, "users");
        const sData = await getDocs(userDB);
        const userData = sData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
        setLoading(false);
      } catch (e) {
        console.log("Error fetching data: ", e);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      users.map((user, index) => ({
        "S No.": index + 1,
        "Name": user.fullName,
        "Email": user.email,
        "Phone": user.mobileNumber,
        "Batch": user.batch,
        "Faculty": user.faculty,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "user Data.xlsx");
  };

  return (
    <>
      {loading ? (
        <Loadusers />
      ) : (
        <>
          <div className="">
            <h1 className="text-2xl text-center md:text-4xl italic font-serif">User Record</h1>
          </div>

          <div className="mt-2">
            <div className="flex justify-end">
            <button
              onClick={exportToExcel}
              className="bg-black text-white  py-1 md:py-2 px-1 md:px-4 rounded mb-5"
            >
              Download Excel
            </button>
            </div>
            <div className="text-lg mb-2 font-semibold md:text-xl justify-start">
              Total Users: {users.length}
            </div>
            <table className=" min-w-full border-collapse">
              <thead>
                <tr className="text-xs md:text-2xl">
                  <th className="border px-1 md:px-4 py-1 md:py-2">S No.</th>
                  <th className="border px-1 md:px-4 py-1 md:py-2">Name</th>
                  <th className="border px-1 md:px-4 py-1 md:py-2">Email</th>
                  <th className="border px-1 md:px-4 py-1 md:py-2">Phone</th>
                  <th className="border px-1 md:px-4 py-1 md:py-2">Batch</th>
                  <th className="border px-1 md:px-4 py-1 md:py-2">Faculty</th>
                  <th className="border px-1 md:px-4 py-1 md:py-2">Profile</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .sort((a, b) => a.fullName.localeCompare(b.fullName))
                  .map((user, index) => (
                    <tr
                      key={user.id}
                      className="text-center text-xs md:text-xl font-mono italic"
                    >
                      <td className="border px-1 md:px-4 py-1 md:py-2">{index + 1}</td>
                      <td className="border px-1 md:px-4 py-1 md:py-2">{user.fullName}</td>
                      <td className="border px-1 md:px-4 py-1 md:py-2">{user.email}</td>
                      <td className="border px-1 md:px-4 py-1 md:py-2">{user.mobileNumber}</td>
                      <td className="border px-1 md:px-4 py-1 md:py-2">{user.batch}</td>
                      <td className="border px-1 md:px-4 py-1 md:py-2">{user.faculty}</td>
                      <td className="border px-1 md:px-4 py-1 md:py-2 w-32 ">
                        <img
                          src={
                            user.imgurl
                              ? user.imgurl
                              : "https://imgs.search.brave.com/JAHeWxUYEwHB7KV6V1IbI9oL7wxJwIQ4Sbp8dHQL09A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjAx/MzkxNTc2NC9waG90/by91c2VyLWljb24t/aW4tZmxhdC1zdHls/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9UEotMnZvUWZh/Q3hhZUNsdzZYYlVz/QkNaT3NTTjlIVWVC/SUg1Qk82VmRScz0"
                          }
                          className="rounded-xl"
                          alt=""
                        />
                      </td>
                    </tr> 
                  ))}
              </tbody>
              <tfoot>
                <tr className="text-xs md:text-xl">
                  <th className="border px-1 md:px-4 py-1 md:py-2">S No.</th>
                  <th className="border px-1 md:px-4 py-1 md:py-2">Name</th>
                  <th className="border px-1 md:px-4 py-1 md:py-2">Email</th>
                  <th className="border px-1 md:px-4 py-1 md:py-2">Phone</th>
                  <th className="border px-1 md:px-4 py-1 md:py-2">Batch</th>
                  <th className="border px-1 md:px-4 py-1 md:py-2">Faculty</th>
                  <th className="border px-1 md:px-4 py-1 md:py-2">Profile</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
