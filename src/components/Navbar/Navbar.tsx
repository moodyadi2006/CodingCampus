/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtomStudent';
import { useRouter } from 'next/router';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  const handleCompanyLogInClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: 'loginCompany' }));
    router.push('/loginCompany')
  };

  const handleCompanySignUpClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: 'registerCompany' }));
    router.push('/registerCompany')
  };

  const handleStudentLogInClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: 'loginStudent' }));
    router.push('/loginStudent')
  };

  const handleStudentSignUpClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: 'registerStudent' }));
    router.push('/registerStudent')
  };

  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24 ">
      <Link href="/" className="flex items-center justify-center h-20">
        <img src="/CodingCampuslogo.png" alt="CodingCampus" className="h-full" />
      </Link>
      <div className="flex items-center">

        <button
          className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium 
          hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-transparent
          transition duration-300 ease-in-out"
          onClick={handleCompanyLogInClick}
        >
          Company Log In
        </button>

        <button
          className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium ml-2
          hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-transparent
          transition duration-300 ease-in-out"
          onClick={handleCompanySignUpClick}
        >
          Company Sign Up
        </button>

        <button
          className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium ml-2
          hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-transparent
          transition duration-300 ease-in-out"
          onClick={handleStudentLogInClick}
        >
          Student Log In
        </button>

        <button
          className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium ml-2
          hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-transparent
          transition duration-300 ease-in-out"
          onClick={handleStudentSignUpClick}
        >
          Student Sign Up
        </button>
        
      </div>
    </div>
  );
};

export default Navbar;

/*
1.  #if we want to use any color that is already 
specified in tailwind.config.js then we use prefix=bg
*/
