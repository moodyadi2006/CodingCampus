import React, { useState } from 'react';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";
// import { title } from "process";
import TopbarCompany from '@/components/Topbar/TopbarCompany';

// type AddQuestionsProps = {

// };

const AddQuestions: React.FC = () => {
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    videoId: "",
    link: "",
    order: 0,
    likes: 0,
    dislikes: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page refresh
    // convert inputs.order to integer
    const newProblem = {
      ...inputs,
      order: Number(inputs.order),
    };

    await setDoc(doc(firestore, "problems", inputs.id), newProblem);
  };

  return (
    <>
      <TopbarCompany />
      <main className="bg-gradient-to-b from-purple-500 to-blue-500 min-h-screen flex items-center justify-center">


        <form className='p-8 flex flex-col max-w-sm gap-4 bg-white rounded-lg shadow-lg' onSubmit={handleSubmit}>
          <input
            onChange={handleInputChange}
            type='text'
            placeholder='Problem ID'
            name='id'
            className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <input
            onChange={handleInputChange}
            type='text'
            placeholder='Title'
            name='title'
            className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <input
            onChange={handleInputChange}
            type='text'
            placeholder='Difficulty'
            name='difficulty'
            className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <input
            onChange={handleInputChange}
            type='text'
            placeholder='Company'
            name='Company'
            className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <input
            onChange={handleInputChange}
            type='text'
            placeholder='Category'
            name='category'
            className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <input
            onChange={handleInputChange}
            type='text'
            placeholder='Order'
            name='order'
            className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <input
            onChange={handleInputChange}
            type='text'
            placeholder='Video ID'
            name='videoId'
            className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <button className='bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition duration-200'>
            Add Problem
          </button>
        </form>
      </main>
    </>

  )
}
export default AddQuestions;

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };