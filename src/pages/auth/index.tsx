/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import AuthModal from '@/components/Modals/AuthModal';
import { useRecoilValue } from 'recoil';
import { authModalState } from '@/atoms/authModalAtomStudent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';

type AuthPageProps = {};
//this is for authentication page
const AuthPage: React.FC<AuthPageProps> = () => {
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/student-dashboard');
    }
    if (!loading && !user) {
      setPageLoading(false);
    }
  }, [user, router, loading]);


  if (pageLoading) return null;

  return <div className="bg-gradient-to-b from-purple-500 to-blue-500 min-h-screen" >
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none 
      select-none ">
        {/* <img src="Makeithappen.png" width="200" height="100" />
        <img src="Faang.png" width="200" height="100" /> */}
        <img src="Atlassian.png" width="100" height="100" alt="Atlassian" />
        <img src="jaguar.png" width="100" height="100" alt="Jaguar" />
        <img src="wells-fargo.png" width="100" height="100" alt="Wells Fargo" />
        <img src="DEshaw.png" width="100" height="100" alt="DE Shaw" />
        <img src="micron.png" width="100" height="100" alt="Micron" />
        <img src="intuit.png" width="100" height="100" alt="Intuit" />
        <img src="oracle.png" width="100" height="100" alt="Oracle" />
        <img src="rubrik.png" width="100" height="100" alt="Rubrik" />

      </div>
      {authModal.isOpen && <AuthModal />}
    </div>
  </div>
}
export default AuthPage;