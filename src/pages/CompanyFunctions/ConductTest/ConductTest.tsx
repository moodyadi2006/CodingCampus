// import TopbarCompany from '@/components/Topbar/TopbarCompany';
// import { auth, firestore } from '@/firebase/firebase';
// import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
// import React, { useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { toast } from 'react-toastify';

// // Define interfaces for the state structure
// interface TestCase {
//   input: string;
//   output: string;
// }

// interface Test {
//   uid?: string;
//   title: string;
//   description: string;
//   duration: number;
//   problems: Problem[];
//   createdAt: Date;
// }

// interface Problem {
//   id: string;
//   title: string;
//   difficulty: string;
//   company: string;
//   category: string;
//   order: number;
//   likes: number;
//   dislikes: number;
//   testCases: TestCase[];
// }

// interface Inputs {
//   problems: Problem[];
// }

// const ConductTest: React.FC = () => {
//   const [user, loading, error] = useAuthState(auth);


//   const [inputs, setInputs] = useState<Inputs>({
//     problems: [
//       { id: "", title: "", difficulty: "", company: "", category: "", order: 0, likes: 0, dislikes: 0, testCases: [] },
//       { id: "", title: "", difficulty: "", company: "", category: "", order: 0, likes: 0, dislikes: 0, testCases: [] },
//       { id: "", title: "", difficulty: "", company: "", category: "", order: 0, likes: 0, dislikes: 0, testCases: [] },
//       { id: "", title: "", difficulty: "", company: "", category: "", order: 0, likes: 0, dislikes: 0, testCases: [] },
//       { id: "", title: "", difficulty: "", company: "", category: "", order: 0, likes: 0, dislikes: 0, testCases: [] },
//     ],
//   });

//   const handleProblemChange = (problemIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputs((prevInputs) => ({
//       ...prevInputs,
//       problems: prevInputs.problems.map((problem, i) => {
//         if (i === problemIndex) {
//           return { ...problem, [e.target.name]: e.target.value };
//         }
//         return problem;
//       }),
//     }));
//   };

//   const handleTestCaseChange = (problemIndex: number, testCaseIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputs((prevInputs) => ({
//       ...prevInputs,
//       problems: prevInputs.problems.map((problem, i) => {
//         if (i === problemIndex) {
//           return {
//             ...problem,
//             testCases: problem.testCases.map((testCase, j) => {
//               if (j === testCaseIndex) {
//                 return { ...testCase, [e.target.name]: e.target.value };
//               }
//               return testCase;
//             }),
//           };
//         }
//         return problem;
//       }),
//     }));
//   };

//   const addTestCase = (problemIndex: number) => {
//     setInputs((prevInputs) => ({
//       ...prevInputs,
//       problems: prevInputs.problems.map((problem, i) => {
//         if (i === problemIndex) {
//           return { ...problem, testCases: [...problem.testCases, { input: "", output: "" }] };
//         }
//         return problem;
//       }),
//     }));
//   };

//   const removeTestCase = (problemIndex: number, testCaseIndex: number) => {
//     setInputs((prevInputs) => ({
//       ...prevInputs,
//       problems: prevInputs.problems.map((problem, i) => {
//         if (i === problemIndex) {
//           return { ...problem, testCases: problem.testCases.filter((_, j) => j !== testCaseIndex) };
//         }
//         return problem;
//       }),
//     }));
//   };

//   const [test, setTest] = useState<Test>({
//     title: "",
//     description: "",
//     duration: 0,
//     problems: [],
//     createdAt: new Date(),
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error("Please login to continue", { position: "top-center" });
//       return;
//     }
//     const newProblems = inputs.problems.filter(problem => problem.id && problem.title).map((problem) => ({
//       ...problem,
//       order: Number(problem.order),
//       id: problem.id || Date.now().toString(),
//     }));

//     try {
//       // Assume we have the company's ID. You'll need to get this from somewhere (e.g., auth state or props)
//       const companyId = user.uid;

//       // Reference to the company document
//       const companyRef = doc(firestore, "companies", companyId);

//       // Get the current company document
//       const companySnap = await getDoc(companyRef);

//       if (companySnap.exists()) {
//         // Create the new test object
//         const newTest: Test = {
//           uid: Date.now().toString(),
//           title: test.title,
//           description: test.description,
//           duration: test.duration,
//           problems: newProblems,
//           createdAt: new Date(),
//         };

//         let updateField = '';

//         if (test.title === 'PracticeTest') {
//           updateField = 'practiceTests';
//         } else if (test.title === 'Online Coding Round') {
//           updateField = 'OnlineCodingRound';
//         } else {
//           throw new Error('Unknown test type');
//         }
//         // Update the company document with the new test
//         await updateDoc(companyRef, {
//           [updateField]: arrayUnion(newTest)
//         });
//         // Reset the input fields after submission
//         setInputs({
//           problems: [
//             { id: "", title: "", difficulty: "", company: "", category: "", order: 0, likes: 0, dislikes: 0, testCases: [] },
//           ],
//         });
//         setTest({
//           title: "",
//           description: "",
//           duration: 0,
//           problems: [],
//           createdAt: new Date(),
//         });

//         toast.success("Test saved successfully!"); // Notify user of success
//       } else {
//         throw new Error("Company document does not exist");
//       }
//     } catch (error: any) {
//       console.error(error);
//       toast.error("Error saving test: ", error.message);
//     }
//   };

//   return (
//     <>
//       <TopbarCompany />
//       <main className="bg-gradient-to-b from-purple-500 to-blue-500 min-h-screen flex items-center justify-center">
//         <form className='p-8 flex flex-col max-w-sm gap-4 bg-white rounded-lg shadow-lg my-5' onSubmit={handleSubmit}>
//           <div>
//             <h1 className="text-3xl font-sans text-[#dd2ee0] ml-7 mb-5 font-bold">
//               Creating a Test
//             </h1>
//           </div>
//           <div>
//             <input
//               onChange={(e) => setTest({ ...test, title: e.target.value })}
//               type='text'
//               placeholder='Test Title'
//               value={test.title}
//               className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500' />
//             <input
//               onChange={(e) => setTest({ ...test, description: e.target.value })}
//               type='text'
//               placeholder='Test Description'
//               value={test.description}
//               className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
//             />
//           </div>
//           {inputs.problems.map((problem, problemIndex) => (
//             <div key={problemIndex}>
//               <h2>Problem {problemIndex + 1}</h2>
//               <input
//                 onChange={(e) => handleProblemChange(problemIndex, e)}
//                 type='text'
//                 placeholder='Problem ID'
//                 name='id'
//                 value={problem.id}
//                 className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
//               />
//               <input
//                 onChange={(e) => handleProblemChange(problemIndex, e)}
//                 type='text'
//                 placeholder='Title'
//                 name='title'
//                 value={problem.title}
//                 className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
//               />
//               <input
//                 onChange={(e) => handleProblemChange(problemIndex, e)}
//                 type='text'
//                 placeholder='Difficulty'
//                 name='difficulty'
//                 value={problem.difficulty}
//                 className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
//               />
//               <input
//                 onChange={(e) => handleProblemChange(problemIndex, e)}
//                 type='text'
//                 placeholder='Company'
//                 name='company'
//                 value={problem.company}
//                 className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
//               />
//               <input
//                 onChange={(e) => handleProblemChange(problemIndex, e)}
//                 type='text'
//                 placeholder='Category'
//                 name='category'
//                 value={problem.category}
//                 className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
//               />
//               <input
//                 onChange={(e) => handleProblemChange(problemIndex, e)}
//                 type='number'
//                 placeholder='Order'
//                 name='order'
//                 value={problem.order}
//                 className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
//               />
//               {problem.testCases.map((testCase, testCaseIndex) => (
//                 <div key={testCaseIndex}>
//                   <input
//                     onChange={(e) => handleTestCaseChange(problemIndex, testCaseIndex, e)}
//                     type='text'
//                     placeholder='Input'
//                     name='input'
//                     value={testCase.input}
//                     className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
//                   />
//                   <input
//                     onChange={(e) => handleTestCaseChange(problemIndex, testCaseIndex, e)}
//                     type='text'
//                     placeholder='Output'
//                     name='output'
//                     value={testCase.output}
//                     className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
//                   />
//                   <button type='button' className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mx-3' onClick={() => removeTestCase(problemIndex, testCaseIndex)}>Remove</button>
//                 </div>
//               ))}
//               <button type='button' className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded' onClick={() => addTestCase(problemIndex)}>Add Test Case</button>
//             </div>
//           ))}


//           <button type='submit' className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </form>
//       </main>
//     </>
//   );
// };

// export default ConductTest;

import TopbarCompany from '@/components/Topbar/TopbarCompany';
import { auth, firestore } from '@/firebase/firebase';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

// Define interfaces for the state structure
interface TestCase {
  input: string;
  output: string;
}

interface Test {
  uid?: string;
  title: string;
  description: string;
  duration: number;
  problems: Problem[];
  createdAt: Date;
}

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  company: string;
  category: string;
  order: number;
  likes: number;
  dislikes: number;
  testCases: TestCase[];
}

interface Inputs {
  problems: Problem[];
}

const ConductTest: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  const [inputs, setInputs] = useState<Inputs>({
    problems: [
      { id: "", title: "", difficulty: "", company: "", category: "", order: 0, likes: 0, dislikes: 0, testCases: [] },
      { id: "", title: "", difficulty: "", company: "", category: "", order: 0, likes: 0, dislikes: 0, testCases: [] },
      { id: "", title: "", difficulty: "", company: "", category: "", order: 0, likes: 0, dislikes: 0, testCases: [] },
      { id: "", title: "", difficulty: "", company: "", category: "", order: 0, likes: 0, dislikes: 0, testCases: [] },
      { id: "", title: "", difficulty: "", company: "", category: "", order: 0, likes: 0, dislikes: 0, testCases: [] },
    ],
  });

  const [testDetails, setTestDetails] = useState({
    title: "",
    description: "",
    duration: 0,
  });

  const handleProblemChange = (problemIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      problems: prevInputs.problems.map((problem, i) => {
        if (i === problemIndex) {
          return { ...problem, [e.target.name]: e.target.value };
        }
        return problem;
      }),
    }));
  };

  const handleTestCaseChange = (problemIndex: number, testCaseIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      problems: prevInputs.problems.map((problem, i) => {
        if (i === problemIndex) {
          return {
            ...problem,
            testCases: problem.testCases.map((testCase, j) => {
              if (j === testCaseIndex) {
                return { ...testCase, [e.target.name]: e.target.value };
              }
              return testCase;
            }),
          };
        }
        return problem;
      }),
    }));
  };

  const addTestCase = (problemIndex: number) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      problems: prevInputs.problems.map((problem, i) => {
        if (i === problemIndex) {
          return { ...problem, testCases: [...problem.testCases, { input: "", output: "" }] };
        }
        return problem;
      }),
    }));
  };

  const removeTestCase = (problemIndex: number, testCaseIndex: number) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      problems: prevInputs.problems.map((problem, i) => {
        if (i === problemIndex) {
          return { ...problem, testCases: problem.testCases.filter((_, j) => j !== testCaseIndex) };
        }
        return problem;
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to continue", { position: "top-center" });
      return;
    }

    const newProblems = inputs.problems.filter(problem => problem.id && problem.title).map((problem) => ({
      ...problem,
      order: Number(problem.order),
      id: problem.id || Date.now().toString(),
    }));

    try {
      // Assume we have the company's ID. You'll need to get this from somewhere (e.g., auth state or props)
      const companyId = user.uid;

      // Reference to the company document
      const companyRef = doc(firestore, "companies", companyId);

      // Get the current company document
      const companySnap = await getDoc(companyRef);

      // Create the new test object
      const newTest: Test = {
        uid: Date.now().toString(),
        title: testDetails.title,
        description: testDetails.description,
        duration: testDetails.duration,
        problems: newProblems,
        createdAt: new Date(),
      };

      let updateField = '';

      if (testDetails.title === 'Practice Test') {
        updateField = 'practiceTests';
      } else if (testDetails.title === 'Online Coding Round') {
        updateField = 'onlineCodingRounds';
      } else {
        throw new Error('Unknown test type');
      }

      if (companySnap.exists()) {
        // Update the company document with the new test
        await updateDoc(companyRef, {
          [updateField]: arrayUnion(newTest)
        });
      } else {
        // Create the company document with the new test
        await setDoc(companyRef, {
          [updateField]: [newTest]
        });
      }

      // Reset the input fields after submission
      setInputs({
        problems: [
          { id: "", title: "", difficulty: "", company: "", category: "", order: 0, likes: 0, dislikes: 0, testCases: [] },
        ],
      });
      setTestDetails({
        title: "",
        description: "",
        duration: 0,
      });

      toast.success("Test saved successfully!"); // Notify user of success
    } catch (error: any) {
      console.error(error);
      toast.error("Error saving test: " + error.message);
    }
  };


  return (
    <>
      <TopbarCompany />
      <main className="bg-gradient-to-b from-purple-500 to-blue-500 min-h-screen flex items-center justify-center">
        <form className='p-8 flex flex-col max-w-sm gap-4 bg-white rounded-lg shadow-lg my-5' onSubmit={handleSubmit}>
          <div>
            <h1 className="text-3xl font-sans text-[#dd2ee0] ml-7 mb-5 font-bold">
              Creating a Test
            </h1>
          </div>
          <div>
            <input
              onChange={(e) => setTestDetails({ ...testDetails, title: e.target.value })}
              type='text'
              placeholder='Test Title'
              value={testDetails.title}
              className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500' />
            <input
              onChange={(e) => setTestDetails({ ...testDetails, description: e.target.value })}
              type='text'
              placeholder='Test Description'
              value={testDetails.description}
              className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
          {inputs.problems.map((problem, problemIndex) => (
            <div key={problemIndex}>
              <h2>Problem {problemIndex + 1}</h2>
              <input
                onChange={(e) => handleProblemChange(problemIndex, e)}
                type='text'
                placeholder='Problem ID'
                name='id'
                value={problem.id}
                className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              <input
                onChange={(e) => handleProblemChange(problemIndex, e)}
                type='text'
                placeholder='Title'
                name='title'
                value={problem.title}
                className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              <input
                onChange={(e) => handleProblemChange(problemIndex, e)}
                type='text'
                placeholder='Difficulty'
                name='difficulty'
                value={problem.difficulty}
                className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              <input
                onChange={(e) => handleProblemChange(problemIndex, e)}
                type='text'
                placeholder='Company'
                name='company'
                value={problem.company}
                className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              <input
                onChange={(e) => handleProblemChange(problemIndex, e)}
                type='text'
                placeholder='Category'
                name='category'
                value={problem.category}
                className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              <input
                onChange={(e) => handleProblemChange(problemIndex, e)}
                type='number'
                placeholder='Order'
                name='order'
                value={problem.order}
                className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              <h3>Test Cases</h3>
              {problem.testCases.map((testCase, testCaseIndex) => (
                <div key={testCaseIndex}>
                  <input
                    onChange={(e) => handleTestCaseChange(problemIndex, testCaseIndex, e)}
                    type='text'
                    placeholder='Input'
                    name='input'
                    value={testCase.input}
                    className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
                  />
                  <input
                    onChange={(e) => handleTestCaseChange(problemIndex, testCaseIndex, e)}
                    type='text'
                    placeholder='Output'
                    name='output'
                    value={testCase.output}
                    className='p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
                  />
                  <button type="button" onClick={() => removeTestCase(problemIndex, testCaseIndex)} className='flex items-center text-lg p-2 mx-2 bg-gradient-to-r 
          from-purple-500 to-blue-500 rounded-lg shadow-lg text-white 
          hover:text-blue-400 hover:bg-white border-2 border-transparent 
          transition duration-300 ease-in-out hover:from-transparent hover:to-transparent'>Remove TestCase</button>
                </div>
              ))}
              <button type="button" className='flex items-center text-lg p-2 mx-2 bg-gradient-to-r 
          from-purple-500 to-blue-500 rounded-lg shadow-lg text-white 
          hover:text-blue-400 hover:bg-white border-2 border-transparent 
          transition duration-300 ease-in-out hover:from-transparent hover:to-transparent' onClick={() => addTestCase(problemIndex)}>Add TestCase</button>
            </div>
          ))}
          <button type='submit' className='p-2 bg-purple-500 text-white rounded'>Submit</button>
        </form>
      </main>
    </>
  );
};

export default ConductTest;
