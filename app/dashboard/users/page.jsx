"use client";
import React, { useEffect, useState } from "react";
import { getDocs, firestore, collection } from "../../../util/fire";
import Loadusers from "../../../Components/LoadUsers";
import * as XLSX from "xlsx";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const defaultImg = "https://imgs.search.brave.com/..."; // Truncated for brevity

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDB = collection(firestore, "users");
        const sData = await getDocs(userDB);
        const userData = sData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(userData);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      users.map((user, i) => ({
        "S No.": i + 1,
        Name: user.fullName,
        Email: user.email,
        Phone: user.mobileNumber,
        Batch: user.batch,
        Faculty: user.faculty,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "User_Data.xlsx");
  };

  const filteredUsers = users.filter((user) =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedBatch || user.batch === selectedBatch) &&
    (!selectedFaculty || user.faculty === selectedFaculty)
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers
    .sort((a, b) => a.fullName?.localeCompare(b.fullName))
    .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const uniqueValues = (key) =>
    [...new Set(users.map((u) => u[key]).filter(Boolean))].sort((a, b) => a.localeCompare(b));

  return loading ? (
    <Loadusers />
  ) : (
    <div className="px-4">
      <h1 className="text-center text-2xl md:text-4xl italic font-serif mb-4">User Record</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="border px-2 py-1 rounded w-full md:w-1/3"
        />
        <select
          value={selectedBatch}
          onChange={(e) => { setSelectedBatch(e.target.value); setCurrentPage(1); }}
          className="border px-2 py-1 rounded w-full md:w-1/4"
        >
          <option value="">All Batches</option>
          {uniqueValues("batch").map((batch) => (
            <option key={batch} value={batch}>{batch}</option>
          ))}
        </select>
        <select
          value={selectedFaculty}
          onChange={(e) => { setSelectedFaculty(e.target.value); setCurrentPage(1); }}
          className="border px-2 py-1 rounded w-full md:w-1/4"
        >
          <option value="">All Faculties</option>
          {uniqueValues("faculty").map((fac) => (
            <option key={fac} value={fac}>{fac}</option>
          ))}
        </select>
      </div>

      {/* Export Button */}
      <div className="flex justify-end mb-2">
        <button onClick={exportToExcel} className="bg-black text-white py-1 px-4 rounded">
          Download Excel
        </button>
      </div>

      <div className="text-lg font-semibold mb-2">
        Showing {filteredUsers.length} result{filteredUsers.length !== 1 && "s"}
      </div>

      {/* Table */}
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="text-xs md:text-2xl">
            {["S No.", "Name", "Email", "Phone", "Batch", "Faculty", "Profile"].map((h, i) => (
              <th key={i} className="border px-2 py-1">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, i) => (
            <tr key={user.id} className="text-center text-xs md:text-xl font-mono italic">
              <td className="border px-2 py-1">{(currentPage - 1) * usersPerPage + i + 1}</td>
              <td className="border px-2 py-1">{user.fullName}</td>
              <td className="border px-2 py-1">{user.email}</td>
              <td className="border px-2 py-1">{user.mobileNumber || "----"}</td>
              <td className="border px-2 py-1">{user.batch || "----"}</td>
              <td className="border px-2 py-1">{user.faculty || "----"}</td>
              <td className="border px-2 py-1 w-32">
                <img src={user.imgurl || defaultImg} alt="" className="rounded-xl" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
