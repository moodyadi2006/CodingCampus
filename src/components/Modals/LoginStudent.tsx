/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtomStudent';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';


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
        router.push('/');
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
        <a href="#" style={{ color: "rgb(255, 161, 22)" }} className='test-sm block text-brand-orange hover:underline w-full
        text-right'>
          Forgot Password?
        </a>
      </button>

      <div className='text-sm font-medium text-gray-300'>
        Not Registered?
        <a href="#" style={{
          marginLeft: 20,
        }} className='text-blue-700 hover:underline' onClick={handleClickRegister}>
          Create account
        </a>
      </div>
    </form>
  );
};

export default LoginStudent;