import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtomStudent";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { GoCode } from "react-icons/go";

type TopbarCompanyProps = {
  problemPage?: boolean;
};

const TopbarCompany: React.FC<TopbarCompanyProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  const handleProblemChange = (isForward: boolean) => {
    const currentProblem = problems[router.query.pid as string] as Problem;
    if (!currentProblem) {
      // Handle the case where the current problem is not found
      return;
    }

    const { order } = currentProblem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );

    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  const handleConductInterview = () => {
    router.push('/CompanyFunctions/ConductInterview/ConductInterview')
  }

  const handleAddQuestions = () => {
    router.push('/CompanyFunctions/addQuestion/AddQuestions')
  }

  const handleConductTest = () => {
    router.push('/CompanyFunctions/ConductTest/ConductTest')
  }

  return (
    <nav className='flex items-center justify-between p-2 bg-dark-layer-1 text-dark-gray-7'>
      
      {/* Logo Section */}
      <div className='flex items-center text-lg font-bold p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg mr-4'>
        <span className='text-white'>CodingCampus</span>
        <GoCode className='ml-1 h-5 w-5 text-white transition-transform transform hover:scale-125' />
      </div>

      {problemPage && (
        <div className='flex items-center gap-4 flex-1 justify-center'>
          <div
            className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
            onClick={() => handleProblemChange(false)}
          >
            <FaChevronLeft />
          </div>
          <Link
            href='/'
            className='flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer'
          >
            <div>
              <BsList />
            </div>
            <p>Problem List</p>
          </Link>
          <div
            className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
            onClick={() => handleProblemChange(true)}
          >
            <FaChevronRight />
          </div>
        </div>
      )}

      <div className='flex items-center space-x-4 flex-1 justify-end'>
        <div className="topbar flex items-center justify-center p-5">
          <button className="flex items-center text-lg p-2 mx-2 bg-gradient-to-r 
          from-purple-500 to-blue-500 rounded-lg shadow-lg text-white 
          hover:text-blue-400 hover:bg-white border-2 border-transparent 
          transition duration-300 ease-in-out hover:from-transparent hover:to-transparent"
            onClick={handleConductInterview}>
            Conduct Interview
          </button>
          <button className="flex items-center text-lg p-2 mx-2 bg-gradient-to-r 
          from-purple-500 to-blue-500 rounded-lg shadow-lg text-white 
          hover:text-blue-400 hover:bg-white border-2 border-transparent 
          transition duration-300 ease-in-out hover:from-transparent hover:to-transparent"
            onClick={handleAddQuestions}>
            Add Questions
          </button>
          <button className="flex items-center text-lg p-2 mx-2 bg-gradient-to-r 
          from-purple-500 to-blue-500 rounded-lg shadow-lg text-white 
          hover:text-blue-400 hover:bg-white border-2 border-transparent 
          transition duration-300 ease-in-out hover:from-transparent hover:to-transparent"
            onClick={handleConductTest}>
            Conduct Test
          </button>
        </div>

        {!user && (
          <Link
            href='/Login&signUp/Login'
            onClick={() => setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "loginStudent" }))}
          >
            <button className="bg-gradient-to-r 
          from-purple-500 to-blue-500 rounded-lg shadow-lg text-white 
          hover:text-blue-400 hover:bg-white border-2 border-transparent 
          transition duration-300 ease-in-out hover:from-transparent hover:to-transparent py-1 px-2 cursor-pointer rounded">Sign In</button>
          </Link>
        )}
        {user && problemPage && <Timer />}
        {user && (
          <div className='cursor-pointer group relative'>
            <Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
            <div
              className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
            >
              <p className='text-sm'>{user.email}</p>
            </div>
          </div>
        )}
        {user && <Logout />}
      </div>
    </nav >
  );
};
export default TopbarCompany;