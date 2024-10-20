import Footer from '@/components/Footer';
import TopbarWebsite from '@/components/Topbar/TopbarWebsite';
import Image from 'next/image';
import React from 'react';
import { FaRepeat } from 'react-icons/fa6';
import { GoCommandPalette, GoGitBranch } from 'react-icons/go';
import { IoEyeOutline } from 'react-icons/io5';
import { RiSpeedFill } from 'react-icons/ri';

type certified_assessmentsProps = {

};

const certified_assessments: React.FC<certified_assessmentsProps> = () => {

  return (
    <main className='bg-gradient-to-b from-purple-500 to-blue-500'>
      <TopbarWebsite />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center pt-24 pb-24">

        <div className="flex flex-row items-start mt-12">
          <div className="flex-shrink-0">
            <Image src="/hiring.jpg" width="500" height="500" alt="Atlassian" />
          </div>

          <div className="flex flex-col ml-12 text-left"> {/* Increased margin to ml-12 */}
            <h2 className="text-black text-4xl font-bold">
              Standardize your hiring<br />
              with trusted certified<br />
              assessments
            </h2>
            <p className="mt-8 text-gray-700 text-2xl">
              Launch standardized, role-based tests in minutes,<br />
              and leave test creation and maintenance to us.
            </p>
          </div>
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
              <h3 className='text-purple-500 font-bold text-lg'>Help maintain compliance</h3>
              <p className='text-gray-700 text-sm font-sans mt-1'>
                Advanced machine learning monitors for plagiarism, test-taker integrity, and question leaks, giving all developers a fairer shot at the next round.
              </p>
            </div>

            <div className="bg-white w-[220px] h-[230px] flex flex-col rounded-xl p-4 shadow-md text-left">
              <GoGitBranch className='text-purple-500 text-3xl mb-2' />
              <h3 className='text-purple-500 font-bold text-lg'>Promote fairness</h3>
              <p className='text-gray-700 text-sm font-sans mt-1'>
                Structured assessment content and a scalable system make sure you test applicants consistently, whether you're hiring one dev or 1000.
              </p>
            </div>

            <div className="bg-white w-[220px] h-[230px] flex flex-col rounded-xl p-4 shadow-md text-left">
              <GoCommandPalette className='text-purple-500 text-3xl mb-2' />
              <h3 className='text-purple-500 font-bold text-lg'>Trust your scores</h3>
              <p className='text-gray-700 text-sm font-sans mt-1'>
                From adverse-impact studies to sensitivity reviews, our content undergoes expert-led analysis to help you test the skills that matter most.
              </p>
            </div>
          </div>
        </div>



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
          <h3 className="text-white text-4xl font-bold mb-4">One workspace. Boundless possibilities.</h3>
          <h4 className="text-white text-xl">
            Simultaneously edit code, share files, and collaborate on virtual whiteboards all within<br />
            your browser. No downloads required.
          </h4>

          <div className="flex space-x-4 mt-6">
            <div className="bg-white w-[220px] h-[230px] flex flex-col rounded-xl p-4 shadow-md text-left">
              <RiSpeedFill className='text-purple-500 text-3xl mb-2' />
              <h3 className='text-purple-500 font-bold text-lg'>Use with ease and speed</h3>
              <p className='text-gray-700 text-sm font-sans mt-1'>
                Cut down on clunky setups and awkward downtime so that you and your candidate can jump right in and spend more time coding.
              </p>
            </div>

            <div className="bg-white w-[220px] h-[230px] flex flex-col rounded-xl p-4 shadow-md text-left">
              <GoCommandPalette className='text-purple-500 text-3xl mb-2' />
              <h3 className='text-purple-500 font-bold text-lg'>Hard skills, meet soft skills</h3>
              <p className='text-gray-700 text-sm font-sans mt-1'>
                Add empirical evidence to your toughest hiring decisions. Problem-solve live with an all-in-one IDE.
              </p>
            </div>

            <div className="bg-white w-[220px] h-[230px] flex flex-col rounded-xl p-4 shadow-md text-left">
              <FaRepeat className='text-purple-500 text-3xl mb-2' />
              <h3 className='text-purple-500 font-bold text-lg'>Rinse and repeat</h3>
              <p className='text-gray-700 text-sm font-sans mt-1'>
                Build a standardized process with ready-made templates and scorecards to deliver the ebest candidate experience,every time.
              </p>
            </div>
          </div>
        </div>

        <h2 className="mt-12 text-black text-5xl">
          World-class innovation starts with<br />
          <span className="text-purple-600">world-class interviewing.</span>
        </h2>


        <div className="flex flex-row items-start mt-12">
          <div className="flex-shrink-0">
            <Image src="/compression.png" width="500" height="500" alt="Atlassian" />
          </div>

          <div className="flex flex-col ml-12 text-left"> {/* Increased margin to ml-12 */}
            <h2 className="text-black text-4xl font-bold">
              Set your developers up for<br />
              success
            </h2>
            <p className="mt-8 text-gray-700 text-2xl">
              Invite candidates to interview with all the<br />
              tools they need. Our browser-based IDE<br />
              offers code repos for 40+ languages across<br />
              all of tech’s most in-demand skills.
            </p>
          </div>
        </div>

        <div className="flex flex-row items-start mt-12">

          <div className="flex flex-col mr-12 text-left"> {/* Text on the left */}
            <h2 className="text-black text-4xl font-bold">
              Record, review, and<br />
              approve
            </h2>
            <p className="mt-8 text-gray-700 text-2xl">
              With code playback and interviewer<br />
              benchmarking, all admin tasks are fully<br />
              baked into the experience — so your<br />
              interview notes stay in one place.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Image src="/candidate.png" width="500" height="500" alt="Atlassian" />
          </div>
        </div>

        <div className="flex flex-row items-start mt-12">
          <div className="flex-shrink-0">
            <Image src="/question-library.png" width="500" height="500" alt="Atlassian" />
          </div>

          <div className="flex flex-col ml-12 text-left"> {/* Increased margin to ml-12 */}
            <h2 className="text-black text-4xl font-bold">
              Start hiring with exclusive<br />
              interviewing content
            </h2>
            <p className="mt-8 text-gray-700 text-2xl">
              Design the interview that’s right for your<br />
              team. Our exclusive interviewing content<br />
              helps you select the right questions and test<br />
              the right skills for your hard-to-fill role.
            </p>
          </div>
        </div>




      </div>
      <Footer />
    </main>
  );
}
export default certified_assessments;