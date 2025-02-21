"use client";
import React, { useEffect, useState } from "react";
import { getDocs, firestore, collection } from "../../../util/fire";
import Loadusers from "@/Components/LoadUsers";
import DownloadButton from "@/Components/DownloadButton";
import UserTable from "@/Components/UserTable";

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

  return (
    <>
      {loading ? (
        <Loadusers />
      ) : (
        <>
          <div>
            <h1 className="text-center text-4xl italic font-serif">User Record</h1>
          </div>

          <div className="mt-2">
            <div className="flex justify-end">
              <DownloadButton users={users} />
            </div>
            <div className="flex mb-2 font-semibold text-xl justify-start">
              Total Users: {users.length}
            </div>
            <UserTable users={users} />
          </div>
        </>
      )}
    </>
  );
};

export default Page;
