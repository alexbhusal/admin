"use client";
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../util/firebase';
import { useRouter } from 'next/navigation';
import Load from '@/Components/Load';

const Page = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <>
    <Load/>
    </>;
  }

  return (
    <div>
      <div className="box">
        {user ? (
          <div>Welcome, {user.displayName || 'User'}!</div>
        ) : (
          null
        )}
      </div>
    </div>
  );
};

export default Page;
