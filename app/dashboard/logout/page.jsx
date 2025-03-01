"use client";
import Logout from '@/Components/Logout'
import { auth } from '@/util/fire';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast, ToastContainer } from 'react-toastify';

const page = () => {
    const router = useRouter();
    const handleLogOut = async () => {
        try {
          await signOut(auth);
          toast.warning("You are logged out");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } catch (e) {
          toast.error(e);
        }
      };
  return (
    <>
    <ToastContainer/>
    <div className="w-full h-auto ">
        <Logout/>
    </div>
    
    <div className="flex flex-col md:flex-row justify-center ">
        <button className='text-2xl md:text-4xl text-center bg-cyan-500 p-3 text-white rounded-3xl' onClick={handleLogOut}>Logout</button>
    </div>
    </>
  )
}

export default page
