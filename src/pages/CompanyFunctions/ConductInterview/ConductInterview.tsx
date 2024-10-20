import React, { useEffect, useState } from 'react';
import { firestore } from '@/firebase/firebase'; // Adjust this import based on your firebase setup
import { collection, getDocs } from 'firebase/firestore';

interface Student {
  id: string;
  name: string;
  score: number;
  performance: string;
  roundId: string;
}

interface CodingRound {
  id: string;
  title: string;
  companyName: string;
}

const ConductInterview: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [codingRounds, setCodingRounds] = useState<CodingRound[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch coding rounds
        const roundsCollection = collection(firestore, 'onlineCodingRounds');
        const roundsSnapshot = await getDocs(roundsCollection);
        const roundsList = roundsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as CodingRound));
        setCodingRounds(roundsList);

        // Fetch students
        const studentsCollection = collection(firestore, 'studentPerformance');
        const studentsSnapshot = await getDocs(studentsCollection);
        const studentsList = studentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Student));
        setStudents(studentsList);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Online Coding Round Results</h1>
      {codingRounds.map(round => (
        <div key={round.id} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{round.title} - {round.companyName}</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Score</th>
                <th className="border border-gray-300 p-2">Performance</th>
              </tr>
            </thead>
            <tbody>
              {students
                .filter(student => student.roundId === round.id)
                .map(student => (
                  <tr key={student.id}>
                    <td className="border border-gray-300 p-2">{student.name}</td>
                    <td className="border border-gray-300 p-2">{student.score}</td>
                    <td className="border border-gray-300 p-2">{student.performance}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ConductInterview;