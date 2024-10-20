/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtomStudent';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { auth, firestore } from '@/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';


const SignUpStudent: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [input, setInput] = useState({
    displayName: '',
    phoneNo: '',
    gSuiteId: '',
    password: '',
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const router = useRouter(); // This is used to direct to a particular page

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check for empty fields before registration
    if (!input.gSuiteId || !input.password || !input.displayName || !input.phoneNo) {
      return alert("Please fill all the fields");
    }
    try {
      toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });
      const newUser = await createUserWithEmailAndPassword(input.gSuiteId, input.password);
      if (!newUser) return;

      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: input.displayName,
        createAt: Date.now(),
        updateAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      router.push('/student-dashboard');
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      toast.dismiss("loadingToast");
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]); // This code is to avoid multiple signups from the same account

  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: 'loginStudent' }));
  };


  return (
    <form className="space-y-6 px-6 py-4" onSubmit={handleRegister}>
      <h3 className="text-xl font-medium text-white">Register to CodingCampus</h3>
      <div>
        <label
          htmlFor="displayName"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Name
        </label>
        <input
          onChange={handleChangeInput}
          type="text"
          name="displayName"
          id="displayName"
          value={input.displayName}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label
          htmlFor="phoneNo"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Phone No.
        </label>
        <input
          onChange={handleChangeInput}
          type="tel"
          name="phoneNo"
          id="phoneNo"
          value={input.phoneNo}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="988990XXXX"
        />
      </div>

      <div>
        <label
          htmlFor="gSuiteId"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          G-Suite ID
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="gSuiteId"
          id="gSuiteId"
          value={input.gSuiteId}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@branch.iitr.ac.in"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
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

      <button
        type="submit"
        style={{ backgroundColor: 'rgb(255, 161, 22)', color: 'white' }}
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <div className="text-sm font-medium text-gray-300">
        Already have an account?
        <a
          href="#"
          style={{ marginLeft: 20 }}
          className="text-blue-700 hover:underline"
          onClick={handleClick}
        >
          Login
        </a>
      </div>
    </form>
  );
};

export default SignUpStudent;
