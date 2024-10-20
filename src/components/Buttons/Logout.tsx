/* eslint-disable @typescript-eslint/no-empty-object-type */
import { auth } from '@/firebase/firebase';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';

type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
  const [signOut, Loading, error] = useSignOut(auth);
  const handleLogout = () => {
    signOut();
  }
  return <button className='bg-gradient-to-r 
          from-purple-500 to-blue-500 rounded-lg shadow-lg text-white 
          hover:text-blue-400 hover:bg-white border-2 border-transparent 
          transition duration-300 ease-in-out hover:from-transparent hover:to-transparent py-1 px-2 cursor-pointer ' onClick={handleLogout}>
    <FiLogOut />
  </button>
}
export default Logout;