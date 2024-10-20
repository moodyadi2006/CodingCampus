import Footer from '@/components/Footer';
import TopbarWebsite from '@/components/Topbar/TopbarWebsite';
import Image from 'next/image';
import React from 'react';
import { GoCommandPalette, GoGitBranch } from 'react-icons/go';
import { IoEyeOutline } from 'react-icons/io5';

type screenProps = {};

const screen: React.FC<screenProps> = () => {
  return (
    <main className='bg-gradient-to-b from-purple-500 to-blue-500'>
      <TopbarWebsite />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center pt-24 pb-24">
        <h1 className="text-6xl font-sans text-[#1F1F20] mb-8 font-bold">
          Skills-based coding tests to<br />
          find developers, fast
        </h1>

        <h3 className='text-lg text-white max-w-2xl mb-12'>
          Talent pool? Try talent ocean. We help navigate that sea of applicants so<br />
          you can connect faster and hire developers with the skills your team<br />
          needs to innovate.
        </h3>

        <Image src='/screen_intro.png' alt='Logo' height={1000} width={1000} className="my-8" />

        <h2 className="mt-12 text-black text-5xl">
          Build your skills. Build your team.
          Build your future.
        </h2>

        <div className="flex items-center justify-center py-4 mb-12">
          <Image src="/Atlassian.png" width="50" height="50" alt="Atlassian" />
          <Image src="/jaguar.png" width="50" height="100" alt="Jaguar" />
          <Image src="/wells-fargo.png" width="50" height="50" alt="Wells Fargo" />
          <Image src="/DEshaw.png" width="50" height="50" alt="DE Shaw" />
          <Image src="/micron.png" width="50" height="50" alt="Micron" />
          <Image src="/intuit.png" width="50" height="50" alt="Intuit" />
          <Image src="/oracle.png" width="50" height="50" alt="Oracle" />
          <Image src="/rubrik.png" width="50" height="50" alt="Rubrik" />
        </div>

        <div className="bg-black w-[calc(100% + 16px)] h-[500px] mt-12 flex flex-col items-center justify-center rounded-2xl p-7">
          <h3 className="text-white text-4xl font-bold mb-4">Fairness built into every click.</h3>
          <h4 className="text-white text-xl">
            From plagiarism detection and proctoring to minimizing bias, our assessments give<br />
            developers everywhere an equal shot at today’s top tech opportunities.
          </h4>

          <div className="flex space-x-4 mt-6">
            <div className="bg-white w-[220px] h-[230px] flex flex-col rounded-xl p-4 shadow-md text-left">
              <IoEyeOutline className='text-purple-500 text-3xl mb-2' />
              <h3 className='text-purple-500 font-bold text-lg'>Best plagiarism monitoring</h3>
              <p className='text-gray-700 text-sm font-sans mt-1'>
                Advanced machine learning monitors for plagiarism, test-taker integrity, and question leaks, giving all developers a fairer shot at the next round.
              </p>
            </div>

            <div className="bg-white w-[220px] h-[230px] flex flex-col rounded-xl p-4 shadow-md text-left">
              <GoGitBranch className='text-purple-500 text-3xl mb-2' />
              <h3 className='text-purple-500 font-bold text-lg'>A standardized skills approach</h3>
              <p className='text-gray-700 text-sm font-sans mt-1'>
                Structured assessment content and a scalable system make sure you test applicants consistently, whether you're hiring one dev or 1000.
              </p>
            </div>

            <div className="bg-white w-[220px] h-[230px] flex flex-col rounded-xl p-4 shadow-md text-left">
              <GoCommandPalette className='text-purple-500 text-3xl mb-2' />
              <h3 className='text-purple-500 font-bold text-lg'>Fair, valid and reliable results</h3>
              <p className='text-gray-700 text-sm font-sans mt-1'>
                From adverse-impact studies to sensitivity reviews, our content undergoes expert-led analysis to help you test the skills that matter most.
              </p>
            </div>
          </div>
        </div>

        <h2 className="mt-12 text-black text-5xl">
          Innovation happens everywhere.<br />
          It's time to <span className="text-purple-600">broaden your search.</span>
        </h2>


        <div className="flex flex-row items-start mt-12">
          <div className="flex-shrink-0">
            <Image src="/code-pallet.png" width="500" height="500" alt="Atlassian" />
          </div>

          <div className="flex flex-col ml-12 text-left"> {/* Increased margin to ml-12 */}
            <h2 className="text-black text-4xl font-bold">
              Find the skills to ship<br />
              better products, faster.
            </h2>
            <p className="mt-8 text-gray-700 text-2xl">
              From data science to front end<br />
              to cybersecurity, our library covers tech's most<br />
              in-demand roles and skills, across all levels<br />
              — and can help you assess those skills with confidence.
            </p>
          </div>
        </div>

        <div className="flex flex-row items-start mt-12">
          <div className="flex flex-col mr-12 text-left"> {/* Text on the left */}
            <h2 className="text-black text-4xl font-bold">
              University hiring and early<br />
              talent screening built to<br />
              scale.
            </h2>
            <p className="mt-8 text-gray-700 text-2xl">
              When hiring turns high volume, our<br />
              approach helps applicants show off their<br />
              skills. Think developer-approved prep,<br />
              materials, coding challenges, and screening<br />
              that scales with you.
            </p>
          </div>

          <div className="flex-shrink-0"> {/* Image on the right */}
            <Image src="/student-info.png" width="500" height="500" alt="Atlassian" />
          </div>
        </div>




      </div>
      <Footer />
    </main>
  );
};

export default screen;
