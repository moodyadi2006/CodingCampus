/* eslint-disable @typescript-eslint/no-empty-object-type */
import { authModalState } from '@/atoms/authModalAtomStudent';
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import LoginCompany from './LoginCompany';
import LoginStudent from './LoginStudent';
import SignUpStudent from './SignUpStudent';
import SignUpCompany from './SignUpCompany';
import ResetPassword from './ResetPassword';

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const authModal = useRecoilValue(authModalState);
  const closeModal = useCloseModal(); // This function is written to close whenever clicked on cross
  return (
    <>
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60' onClick={closeModal}></div>
      <div className='w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center'>
        <div className='relative w-full h-full mx-auto flex items-center justify-center'>
          <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6">
            <div className='flex justify-end p-2'>
              <button
                type='button'
                className='bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white'
                onClick={closeModal}
              >
                <IoClose />
              </button>
            </div>
            {authModal.type === "loginCompany" ? <LoginCompany /> :
              authModal.type === "loginStudent" ? <LoginStudent /> :
                authModal.type === "registerCompany" ? <SignUpCompany /> :
                  authModal.type === "registerStudent" ? <SignUpStudent /> :
                    <ResetPassword />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;

function useCloseModal() {
  const setAuthModal = useSetRecoilState(authModalState);
  const closeModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false, type: "loginStudent" }));
  }
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        closeModal();
      }
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  return closeModal;
}