import { authModalState } from '@/atoms/authModalAtomStudent';
//import LoginCompany from '@/components/Modals/LoginCompany';
//import LoginStudent from '@/components/Modals/LoginStudent';
import { auth, firestore } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

type LoginProps = {};


const LoginCompany: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [input, setInput] = useState({
    email: '',
    password: '',
    companyId: ''
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.email || !input.password || !input.companyId) return alert("Please fill all the fields");

    try {
      toast.loading("Logging in...", { position: "top-center", toastId: "loadingToast" });
      const companyUser = await signInWithEmailAndPassword(input.email, input.password);
      if (!companyUser) return;

      const companyDoc = await getDoc(doc(firestore, "companies", companyUser.user.uid));
      if (!companyDoc.exists() || companyDoc.data()?.companyId !== input.companyId) {
        toast.error("Invalid company ID", { position: "top-center" });
        return;
      }

      router.push('/company-dashboard'); // Redirect to company dashboard after login
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      toast.dismiss("loadingToast");
    }
  };

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  // const handleClickRegister = () => {
  //   setAuthModalState((prev) => ({ ...prev, type: 'registerCompany' }));
  // };

  const handleClickForgot = () => {
    setAuthModalState((prev) => ({ ...prev, type: 'forgotPassword' }));
  };

  return (
    <form className="space-y-6 px-6 py-4" onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white">Login to Your Company Account</h3>
      <div>
        <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
          Email
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          value={input.email}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="company@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
          Password
        </label>
        <input
          onChange={handleChangeInput}
          type="password"
          name="password"
          id="password"
          value={input.password}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="********"
        />
      </div>

      <div>
        <label htmlFor="companyId" className="text-sm font-medium block mb-2 text-gray-300">
          Company ID
        </label>
        <input
          onChange={handleChangeInput}
          type="text"
          name="companyId"
          id="companyId"
          value={input.companyId}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="Your Company ID"
        />
      </div>

      <button
        type="submit"
        style={{ backgroundColor: 'rgb(255, 161, 22)', color: 'white' }}
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {loading ? "Logging in...." : "Login"}
      </button>

      <button className='flex w-full justify-end' onClick={handleClickForgot}>
        <a href="/Login&signUp/ResetPassword" style={{ color: "rgb(255, 161, 22)" }} className='test-sm block text-brand-orange hover:underline w-full
        text-right'>
          Forgot Password?
        </a>
      </button>

      <div className='text-sm font-medium text-gray-300'>
        Not Registered?
        <Link href="/Login&signUp/Signup" style={{ marginLeft: 20 }} className='text-blue-700 hover:underline'>
          Create account
        </Link>
      </div>
    </form>
  );
};

const LoginStudent: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleClickRegister = () => {
    setAuthModalState((prev) => ({ ...prev, type: 'registerStudent' }));
  };

  const handleClickForgot = () => {
    setAuthModalState((prev) => ({ ...prev, type: 'forgotPassword' }));
  };

  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.email || !input.password) return alert("Please fill all the fields");
    try {
      const userCredential = await signInWithEmailAndPassword(input.email, input.password);
      if (userCredential.user) {
        router.push('/student-dashboard');
      } else {
        alert('Authentication failed');
      }
      router.push('/student-dashboard');
    } catch (error: any) {
      toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" })
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" })
    }
  }, [error]);  //this code is to avoid multiple signups from same account


  return (
    <form className='space-y-6 px-6 py-4' onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white"> Sign In to CodingCampus</h3>
      <div>
        <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
          Email
        </label>
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          className='
          border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
          placeholder='name@branch.iitr.ac.in'
        />
      </div>

      <div>
        <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
          Password
        </label>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          id="password"
          className='
          border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
          bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
          placeholder='********'
        />
      </div>

      <button type="submit" style={{ backgroundColor: "rgb(255, 161, 22)", color: "white" }} className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
      text-sm px-5 py-2.5 text-center'>
        {loading ? "loading..." : "log In"}
      </button>

      <button className='flex w-full justify-end' onClick={handleClickForgot}>
        <a href="/Login&signUp/ResetPassword" style={{ color: "rgb(255, 161, 22)" }} className='test-sm block text-brand-orange hover:underline w-full
        text-right'>
          Forgot Password?
        </a>
      </button>

      <div className='text-sm font-medium text-gray-300'>
        Not Registered?
        <a href="/Login&signUp/Signup" style={{
          marginLeft: 20,
        }} className='text-blue-700 hover:underline' onClick={handleClickRegister}>
          Create account
        </a>
      </div>
    </form>
  );
};



const Login: React.FC<LoginProps> = () => {

  const setAuthModalState = useSetRecoilState(authModalState);
  const [accountType, setAccountType] = useState('');

  const handleCompanyLoginClick = () => {
    setAccountType('loginCompany');
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: 'loginCompany' }));
  };

  const handleStudentLoginClick = () => {
    setAccountType('loginStudent');
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: 'loginStudent' }));
  };

  // const handleLogin = () => {
  //   if (accountType) {
  //     setAuthModalState((prev) => ({ ...prev, isOpen: true, type: accountType }));
  //   } else {
  //     alert('Please select an account type to create.');
  //   }
  // };

  return (
    <div className="bg-gradient-to-b from-purple-500 to-blue-500 min-h-screen">
      <Image
        src="/CodingCampuslogo.png"
        height={100}
        width={100}
        className="pl-7 pt-7 mb-20"
        alt="CodingCampuslogo"
      />

      <h1 className="text-6xl font-sans text-[#1F1F20] ml-7 mb-5 font-bold">
        How do you want to<br />
        use CodingCampus?
      </h1>

      <p className="text-white text-xl ml-7 mb-20">
        We'll personalize your set up experience accordingly.
      </p>

      <div>
        <button className="flex items-center text-lg p-2 bg-gradient-to-r 
          from-purple-500 to-blue-500 rounded-lg shadow-lg text-white ml-7 mb-5
          hover:text-blue-400 hover:bg-white border-2 border-transparent 
          transition duration-300 ease-in-out hover:from-transparent hover:to-transparent"
          onClick={handleCompanyLoginClick}>
          <p>
            <span className="flex items-center text-lg font-bold">
              I'm here to hire Tech talent<br />
            </span>
            Evaluate tech skills at scale
          </p>
        </button>

        <button className="flex items-center text-lg p-2 bg-gradient-to-r 
          from-purple-500 to-blue-500 rounded-lg shadow-lg text-white ml-7 
          hover:text-blue-400 hover:bg-white border-2 border-transparent 
          transition duration-300 ease-in-out hover:from-transparent hover:to-transparent"
          onClick={handleStudentLoginClick}>
          <p>
            <span className="flex items-center text-lg font-bold">
              I'm here to practice and prepare<br />
            </span>
            Solve problems and learn new skills
          </p>
        </button>

        {/* <button className="flex items-center text-lg font-bold p-2 bg-purple-400
          rounded-lg shadow-lg text-white ml-7 mt-10 hover:text-purple-500
          hover:bg-white border-2 border-transparent 
          transition duration-300 ease-in-out hover:from-transparent hover:to-transparent"
          onClick={handleLogin}>
          Login
        </button> */}

        <div className="mt-10 ml-7">
          {accountType === 'loginCompany' && <LoginCompany />}
          {accountType === 'loginStudent' && <LoginStudent />}
        </div>

      </div>
    </div>
  );
}
export default Login;