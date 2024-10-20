import React, { useEffect, useState } from 'react';
import { firestore } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import TopbarStudent from '@/components/Topbar/TopbarStudent';

interface PracticeTest {
  id: string;
  title: string;
  description: string;
  companyName: string;
}

const PracticeTests: React.FC = () => {
  const [practiceTests, setPracticeTests] = useState<PracticeTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPracticeTests = async () => {
      try {
        const practiceTestsCollection = collection(firestore, 'practiceTests');
        const practiceTestsSnapshot = await getDocs(practiceTestsCollection);

        const practiceTestsList = practiceTestsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as PracticeTest));

        console.log('Fetched practice tests:', practiceTestsList);
        setPracticeTests(practiceTestsList);
      } catch (err) {
        console.error('Error fetching practice tests:', err);
        setError('Failed to fetch practice tests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPracticeTests();
  }, []);

  if (loading) {
    return <div>Loading practice tests...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <TopbarStudent />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Practice Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiceTests.length > 0 ? (
            practiceTests.map((test) => (
              <div key={test.id} className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{test.title}</h2>
                <p className="text-gray-600">Company: {test.companyName}</p>
                <p className="mt-2">{test.description}</p>
              </div>
            ))
          ) : (
            <div>No practice tests available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeTests;