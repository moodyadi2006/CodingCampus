import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtomStudent';
import { useRouter } from 'next/router';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';
//import SignUpStudent from '@/components/Modals/SignUpStudent';

type SignupProps = {};



const SignUpStudent: React.FC = () => {
  //const setAuthModalState = useSetRecoilState(authModalState);
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

  // const handleClick = () => {
  //   setAuthModalState((prev) => ({ ...prev, type: 'loginStudent' }));
  // };

  // const handleCreateAccount = () => {
  //   if (accountType === 'registerStudent') {
  //     setAuthModalState((prev) => ({
  //       ...prev,
  //       isOpen: true,
  //       type: 'registerStudent',
  //     }));
  //   } else {
  //     alert('Please select an account type to create.');
  //   }
  // };

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
          href="/Login&signUp/Login"
          style={{ marginLeft: 20 }}
          className="text-blue-700 hover:underline"
          // onClick={handleClick}
        >
          Login
        </a>
      </div>
    </form>
  );
};

const SignUpCompany: React.FC = () => {
  //const setAuthModalState = useSetRecoilState(authModalState);
  const [input, setInput] = useState({
    email: '',
    password: '',
    companyId: '',
    telephoneNo: '',
    name: ''
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const router = useRouter();

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.email || !input.password || !input.companyId || !input.telephoneNo || !input.name) {
      return alert("Please fill all the fields");
    }

    try {
      toast.loading("Registering...", { position: "top-center", toastId: "loadingToast" });

      // Create user with email and password
      const companyUser = await createUserWithEmailAndPassword(input.email, input.password);
      if (!companyUser) return;
      const companyData = {
        uid: companyUser.user.uid,
        email: companyUser.user.email,
        TelephoneNo: input.telephoneNo,
        password: input.password,
        companyId: input.companyId,
        displayName: input.name,
        createAt: Date.now(),
        updateAt: Date.now(),
      }

      // Save the company details to Firestore
      await setDoc(doc(firestore, "companies", companyUser.user.uid), companyData);

      // Redirect to company dashboard after registration
      router.push('/company-dashboard');
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
  }, [error]);

  // const handleClick = () => {
  //   setAuthModalState((prev) => ({ ...prev, type: 'loginCompany' }));
  // };

  return (
    <form className="space-y-6 px-6 py-4" onSubmit={handleRegister}>
      <h3 className="text-xl font-medium text-white">Register your Company to CodingCampus</h3>

      <div>
        <label htmlFor="name" className="text-sm font-medium block mb-2 text-gray-300">
          Name
        </label>
        <input
          onChange={handleChangeInput}
          type="text"
          name="name"
          id="name"
          value={input.name}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="ChillFlix Pvt. Ltd."
        />
      </div>

      <div>
        <label htmlFor="telephoneNo" className="text-sm font-medium block mb-2 text-gray-300">
          Telephone No.
        </label>
        <input
          onChange={handleChangeInput}
          type="tel"
          name="telephoneNo"
          id="telephoneNo"
          value={input.telephoneNo}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="+1-800-123-4567"
        />
      </div>


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
        {loading ? "Registering...." : "Register"}
      </button>

      <div className="text-sm font-medium text-gray-300">
        Already have an account?
        <a
          href="/Login&signUp/Login"
          style={{ marginLeft: 20 }}
          className="text-blue-700 hover:underline"
          // onClick={handleClick}
        >
          Login
        </a>
      </div>
    </form>
  );
};

const Signup: React.FC<SignupProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [accountType, setAccountType] = useState('');

  const handleCompanySignUpClick = () => {
    setAccountType('registerCompany');
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: 'registerCompany' }));
  };

  const handleStudentSignUpClick = () => {
    setAccountType('registerStudent');
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: 'registerStudent' }));
  };


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
          onClick={handleCompanySignUpClick}>
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
          onClick={handleStudentSignUpClick}>
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
          onClick={handleCreateAccount}>
          Create Account
        </button> */}

        <div className="mt-10 ml-7">
          {accountType === 'registerCompany' && <SignUpCompany />}
          {accountType === 'registerStudent' && <SignUpStudent />}
        </div>
      </div>
    </div>
  );
};

export default Signup;
