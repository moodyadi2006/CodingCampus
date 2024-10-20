import TopbarStudent from '@/components/Topbar/TopbarStudent';
import React, { useEffect, useState } from 'react';
import { firestore } from '@/firebase/firebase';
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

type Test = {
  id: string;
  title: string;
  description: string;
  duration: number;
  problems: any[]; // You might want to define a more specific type for problems
  createdAt: Date;
};

interface FullscreenElement extends HTMLElement {
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
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
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={startActualTest}>
              Start Test
            </button>
          </div>
        ) : !hasPermission ? (
          <div className="flex justify-center items-center h-screen">
            <div className="text-lg font-medium">
              You must allow camera and microphone permissions to take the test.
            </div>
          </div>
        ) : currentTest ? (
          <div className="test-container">
            <h3 className="text-3xl font-semibold text-center mb-6">{currentTest.title}</h3>
            <div className="test-problems">
              <p>Test problems go here...</p>
            </div>
            <div className="code-editor">
              <p>Code editor goes here...</p>
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
    </div>
  );
};

export default OnlineCodingRounds;
