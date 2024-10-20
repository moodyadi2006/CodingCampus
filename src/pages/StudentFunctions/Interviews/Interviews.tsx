import React, { useEffect, useState } from 'react';
import { firestore } from '@/firebase/firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
//import { useRouter } from 'next/router';
import VideoChat from '@/components/VideoChats/VideoChat';

type Submission = {
  id: string;
  studentName: string;
  score: number;
  selectedForInterview: boolean;
};

type Test = {
  id: string;
  title: string;
  submissions: Submission[];
};

const Interviews: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentChat, setCurrentChat] = useState<{ chatId: string, isCaller: boolean } | null>(null);
  const [greetingMessage, setGreetingMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchTestsAndSubmissions();
  }, []);

  const fetchTestsAndSubmissions = async () => {
    try {
      const companiesCollection = collection(firestore, 'companies');
      const companiesSnapshot = await getDocs(companiesCollection);

      const allTests: Test[] = [];

      for (const companyDoc of companiesSnapshot.docs) {
        const companyId = companyDoc.id;
        const testsCollection = collection(firestore, `companies/${companyId}/onlineCodingRounds`);
        const testsSnapshot = await getDocs(testsCollection);

        for (const testDoc of testsSnapshot.docs) {
          const testId = testDoc.id;
          const testTitle = testDoc.data().title;
          const submissionsCollection = collection(firestore, `companies/${companyId}/onlineCodingRounds/${testId}/submissions`);
          const submissionsSnapshot = await getDocs(submissionsCollection);

          const submissions = submissionsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Submission));

          allTests.push({
            id: testId,
            title: testTitle,
            submissions: submissions
          });
        }
      }

      setTests(allTests);
    } catch (error) {
      console.error('Error fetching tests and submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const startVideoChat = async (submissionId: string) => {
    const chatId = `${submissionId}-${Date.now()}`;
    setCurrentChat({ chatId, isCaller: true });
    await setDoc(doc(firestore, 'videoChats', chatId), { offer: '', answer: '', candidates: [] });
  };

  const handleGreetingMessage = (studentName: string) => {
    setGreetingMessage(`Congratulations ${studentName}! You have been selected for an interview.`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Interviews - Student Test Results</h2>
      {tests.length === 0 ? (
        <p className="text-center">No test results available at the moment.</p>
      ) : (
        tests.map(test => (
          <div key={test.id} className="mb-8">
            <h3 className="text-2xl font-semibold">{test.title}</h3>
            {test.submissions.length === 0 ? (
              <p>No submissions for this test.</p>
            ) : (
              <ul className="space-y-4">
                {test.submissions.map(submission => (
                  <li key={submission.id} className="bg-white p-6 rounded-lg shadow-md">
                    <p><strong>Student:</strong> {submission.studentName}</p>
                    <p><strong>Score:</strong> {submission.score}</p>
                    {submission.selectedForInterview && (
                      <>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                          onClick={() => {
                            startVideoChat(submission.id);
                            handleGreetingMessage(submission.studentName);
                          }}
                        >
                          Start Video Chat
                        </button>
                        <p className="text-green-500 mt-4">{greetingMessage}</p>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
      {currentChat && (
        <VideoChat chatId={currentChat.chatId} isCaller={currentChat.isCaller} />
      )}
    </div>
  );
};

export default Interviews;
