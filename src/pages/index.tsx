// pages/index.tsx
import React from 'react';
import TopbarWebsite from '../components/Topbar/TopbarWebsite';
import Footer from '@/components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-purple-500 to-blue-500 min-h-screen">
      <TopbarWebsite />
      <div className="flex-grow flex flex-col items-center text-center relative overflow-x-auto mx-auto px-6 pb-10">
        <h1 className="text-4xl text-white font-bold mb-4">Why to give Online Coding Rounds Offline?</h1>
        <div className="mb-6">
          <p className="text-lg text-gray-300 leading-relaxed">
            🌍 <strong>Empowering Companies:</strong> We help companies develop the strongest tech teams around, striving to make all jobs remote.
          </p>
        </div>
        <div className="mb-6">
          <p className="text-lg text-gray-300 leading-relaxed">
            🚀 <strong>Empowering Candidates:</strong> We assist candidates in sharpening their tech skills, enabling them to pursue job opportunities from the comfort of their own homes.
          </p>
        </div>
        <div className="mt-6">
          <p className="text-lg text-gray-300 leading-relaxed">
            📊 <strong>Join the Movement:</strong> Over 40% of Students in Campus use CodingCampus to transform their hiring processes.
          </p>
        </div>
        {/* Image container at the bottom */}
        <div className="flex items-center justify-center py-4">
          <img src="Atlassian.png" width="50" height="50" alt="Atlassian" />
          <img src="jaguar.png" width="50" height="100" alt="Jaguar" />
          <img src="wells-fargo.png" width="50" height="50" alt="Wells Fargo" />
          <img src="DEshaw.png" width="50" height="50" alt="DE Shaw" />
          <img src="micron.png" width="50" height="50" alt="Micron" />
          <img src="intuit.png" width="50" height="50" alt="Intuit" />
          <img src="oracle.png" width="50" height="50" alt="Oracle" />
          <img src="rubrik.png" width="50" height="50" alt="Rubrik" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
