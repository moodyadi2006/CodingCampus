import React, { useState, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getDoc, doc } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtomStudent';

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

  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: 'registerCompany' }));
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

      <button className='flex w-full justify-end' onClick={() => handleClick("forgotPassword")}>
        <a href="#" style={{ color: "rgb(255, 161, 22)" }} className='test-sm block text-brand-orange hover:underline w-full
        text-right'>
          Forgot Password?
        </a>
      </button>

      <div className='text-sm font-medium text-gray-300'>
        Not Registered?
        <a href="#" style={{
          marginLeft: 20,
        }} className='text-blue-700 hover:underline' onClick={() => handleClick("registerStudent")}>
          Create account
        </a>
      </div>
    </form>
  );
};

export default LoginCompany;
