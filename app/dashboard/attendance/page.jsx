"use client";
import React, { useEffect, useState } from "react";
import { getDocs, firestore, collection } from "../../../util/fire";
import Loadusers from "../../../Components/LoadUsers";
import * as XLSX from "xlsx";

const Page = () => {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // today's date
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 1;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const attData = collection(firestore, `attendance/${selectedDate}/records`);
        const sData = await getDocs(attData);
        const userData = sData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAttendance(userData);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDate]);

  const filteredUsers = attendance.filter(
    (user) => user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers
    .sort((a, b) => a.name?.localeCompare(b.name))
    .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredUsers.map((user, i) => ({
        "S No.": i + 1,
        Name: user.name,
        Status: user.status,
        Time: user.time || "----",
        Date: user.date || selectedDate,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, "Attendance.xlsx");
  };

  return loading ? (
    <Loadusers />
  ) : (
    <div className="px-4">
      <h1 className="text-center text-2xl md:text-4xl italic font-serif mb-4">
        Attendance Record
      </h1>

      <div className="flex flex-col md:flex-row gap-2 mb-4 items-center">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-2 py-1 rounded w-full md:w-1/4"
        />
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-2 py-1 rounded w-full md:w-1/3"
        />
      </div>

      <div className="flex justify-end mb-2">
        <button
          onClick={exportToExcel}
          className="bg-black text-white py-1 px-4 rounded"
        >
          Download Excel
        </button>
      </div>

      <div className="text-lg font-semibold mb-2">
        Showing {filteredUsers.length} result{filteredUsers.length !== 1 && "s"}
      </div>

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="text-xs md:text-2xl">
            {["S No.", "Name", "Status", "Time", "Date"].map((h, i) => (
              <th key={i} className="border px-2 py-1">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, i) => (
            <tr
              key={user.id}
              className="text-center text-xs md:text-xl font-mono italic"
            >
              <td className="border px-2 py-1">
                {(currentPage - 1) * usersPerPage + i + 1}
              </td>
              <td className="border px-2 py-1">{user.name}</td>
              <td className="border px-2 py-1">{user.status}</td>
              <td className="border px-2 py-1">{user.time || "----"}</td>
              <td className="border px-2 py-1">{user.date || selectedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
