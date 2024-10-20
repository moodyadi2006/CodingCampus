import TopbarStudent from '@/components/Topbar/TopbarStudent';
import React, { useEffect, useState } from 'react';
import { firestore } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
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
  const router = useRouter();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const testsCollection = collection(firestore, 'onlineCodingRounds');
      const testsSnapshot = await getDocs(testsCollection);
      const testsList = testsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Test));
      setTests(testsList);
    } catch (error) {
      console.error('There was an error fetching the tests!', error);
    } finally {
      setLoading(false);
    }
  };

  const requestPermissions = async () => {
    try {
      // Request camera and microphone permissions
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setHasPermission(true);
      // Request fullscreen mode
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
    requestPermissions();
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
        {!hasPermission ? (
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
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
              Submit Test
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">Available Online Coding Rounds</h2>
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
          </>
        )}
      </div>
    </div>
  );
};

export default OnlineCodingRounds;