import TopbarStudent from '@/components/Topbar/TopbarStudent';
import React, { useEffect, useState } from 'react';
import { auth, firestore } from '@/firebase/firebase';
import { getDocs, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Playground from '@/components/Workspace/Playground/Playground';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { problems } from '@/mockProblems/problems';
import PreferenceNav from '@/components/Workspace/Playground/PreferenceNav/PreferenceNav';
import Split from 'split.js';
import ReactCodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from '@/components/Workspace/Playground/EditorFooter';


type Test = {
  id: string;
  title: string;
  description: string;
  duration: number;
  problems: any[]; // You might want to define a more specific type for problems
  createdAt: Date;
};

type PlaygroundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
  setSolved: React.Dispatch<React.SetStateAction<boolean>>
};

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean
}

interface FullscreenElement extends HTMLElement {
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {

  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  let [userCode, setUserCode] = useState<string>(problem.starterCode)

  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false
  })




  const { query: { pid } } = useRouter();
  const [user] = useAuthState(auth)
  const handleSubmit = () => {
    if (!user) {
      toast.error("Please Login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark"
      })
      return;
    }
    try {
      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName)) // this code ignores the comments or any space,line before the actual function
      const callback = new Function(` return ${userCode}`)(); // It is used to convert a string into any function
      const handler = problems[pid as string].handlerFunction;

      if (typeof handler === "function") {
        const success = handler(callback);

        if (success) {
          toast.success("Congrats, All test Cases passed succesfully", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark"
          })
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000)
        }

        const userRef = doc(firestore, "users", user.uid);
        updateDoc(userRef, {
          solvedProblems: arrayUnion(pid),
        })
        setSolved(true);

      }
    } catch (error: any) {
      if (error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")) {
        toast.error("Oops! One or more test cases failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }

    }
  }

  useEffect(() => {
    const code = localStorage.getItem(`code-${pid}`);
    if (user) {
      setUserCode(code ? JSON.parse(code) : problem.starterCode);
    } else {
      setUserCode(problem.starterCode);
    }
  }, [pid, user, problem.starterCode])

  const onChange = (value: string) => {
    setUserCode(value)
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  }

  return (
    <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
      <PreferenceNav settings={settings} setSettings={setSettings} />
      <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
        <div className='w-full overflow-auto ' >
          <ReactCodeMirror
            value={userCode}
            theme={vscodeDark}
            onChange={onChange}
            extensions={[javascript()]}
            style={{ fontSize: settings.fontSize }}
          />
        </div>

        <div className='w-full px-5 overflow-auto'>
          {/* Testcase Heading */}
          <div className='flex h-10 items-center space-x-6'>
            <div className='relative flex h-full flex-col justify-center cursor-pointer'>
              <div className='text-sm font-medium leading-5 text-white'>
                Testcases
              </div>
              <hr className='absolute bottom-0 h-0.5 w-16 rounded-full border-none bg-white' />
            </div>
          </div>

          <div className='flex'>
            {problem.examples.map((example, index) => (
              <div
                className='mr-2 items-start mt-2 '
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className='flex flex-wrap items-center gap-y-4'>
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                  ${activeTestCaseId === index ? "text-white" : "text-gray-500"}
                `}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='font-semibold my-4'>
            <p className='text-sm font-medium mt-4 text-white'>Input : </p>
            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3
                border-transparent text-white mt-2 '>
              {problem.examples[activeTestCaseId].inputText}
            </div>

            <p className='text-sm font-medium mt-4 text-white'>Output : </p>
            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3
                border-transparent text-white mt-2 '>
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>


        </div>


      </Split >
      <EditorFooter handleSubmit={handleSubmit} />
    </div >
  )
}

const OnlineCodingRounds: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  const [instructionsVisible, setInstructionsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const companiesCollection = collection(firestore, 'companies');
      const companiesSnapshot = await getDocs(companiesCollection);

      let allTests: Test[] = [];

      const fetchCompanyTests = async (companyId: string) => {
        const testsCollection = collection(firestore, `companies/${companyId}/onlineCodingRounds`);
        const testsSnapshot = await getDocs(testsCollection);

        return testsSnapshot.docs.map(doc => ({
          id: doc.id,

          ...doc.data(),
        } as Test));
      };

      for (const companyDoc of companiesSnapshot.docs) {
        const companyId = companyDoc.id;
        const companyTests = await fetchCompanyTests(companyId);
        allTests = [...allTests, ...companyTests];
      }

      setTests(allTests);
    } catch (error) {
      console.error('There was an error fetching the tests!', error);
      alert('Failed to fetch tests: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setHasPermission(true);
      enterFullscreen();
    } catch (error) {
      console.error('Permission denied', error);
      setHasPermission(false);
    }
  };

  const enterFullscreen = () => {
    const element = document.documentElement as FullscreenElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(document.fullscreenElement !== null);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const startTest = (test: Test) => {
    setCurrentTest(test);
    setInstructionsVisible(true);
  };

  const startActualTest = () => {
    setInstructionsVisible(false);
    requestPermissions();
  };

  const submitTest = async () => {
    if (!currentTest) return;

    const studentId = usersDoc.id;
    const performanceData = {
      studentId,
      score: Math.floor(Math.random() * 100),
      timestamp: new Date(),
    };

    const companyDocRef = doc(firestore, `companies/${currentTest.companyId}`);
    try {
      await updateDoc(companyDocRef, {
        studentPerformance: performanceData,
      });
      alert('Test submitted successfully!');
      router.push('/student-dashboard'); // Redirect to student dashboard or appropriate page
    } catch (error) {
      console.error('Error updating student performance:', error);
      alert('Failed to submit test: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <TopbarStudent />
      <div className="container mx-auto p-6">
        {instructionsVisible ? (
          <div className="instruction-container">
            <h3 className="text-3xl font-semibold text-center mb-6">Instructions</h3>
            <p>1. Ensure you have a stable internet connection.</p>
            <p>2. Allow camera and microphone access.</p>
            <p>3. The test screen will be locked, and only a code editor, compile button, and submit button will be available.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={startActualTest, router.push(`/users/onlineCodingRounds/${currentTest.id}`)}>
              Start Test
            </button>
          </div>
        ) : (<Playground problem={currentTest.problems[0]} setSuccess={() => { }} setSolved={() => { }} />)} </div>: !hasPermission ? (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium">
          You must allow camera and microphone permissions to take the test.
        </div>
      </div>
      ) : currentTest ? (
      <div className="test-container">
        <h3 className="text-3xl font-semibold text-center mb-6">{currentTest.title}</h3>
        <div className="code-editor">
          <Playground{...currentTest, setSuccess, setSolved} />
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={submitTest}>
          Submit Test
        </button>
      </div>
      ) : (
      <>
        <h2 className="text-3xl font-bold text-center mb-6">Available Online Coding Rounds</h2>
        {tests.length === 0 ? (
          <p className="text-center">No online coding rounds available at the moment.</p>
        ) : (
          <ul className="space-y-4">
            {tests.map(test => (
              <li key={test.id} className="bg-white p-6 rounded-lg shadow-md">
                <button className="test-item w-full text-left" onClick={() => startTest(test)}>
                  <h3 className="text-xl font-semibold">{test.title}</h3>
                  <p className="text-black">Duration: {test.duration} minutes</p>
                  <p className="text-black">Description: {test.description}</p>
                  <p className="text-black">Number of Problems: {test.problems.length}</p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </>
        )}
    </div>
    </div >
  );
};

export default OnlineCodingRounds;


