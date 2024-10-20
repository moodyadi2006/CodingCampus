// components/TopbarWebsite.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GoCode } from 'react-icons/go';


const TopbarWebsite: React.FC = () => {
  const [isProductsOpen, setProductsOpen] = useState(false);
  const [isSolutionsOpen, setSolutionsOpen] = useState(false);
  const [isResourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-button')) {
        setProductsOpen(false);
        setSolutionsOpen(false);
        setResourcesOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleButtonClick = (event: React.MouseEvent, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    event.stopPropagation();
    setProductsOpen(false);
    setSolutionsOpen(false);
    setResourcesOpen(false);
    setState((prevState) => !prevState);
  };

  return (
    <nav className='flex items-center justify-between p-4 bg-dark-layer-1 text-dark-gray-7'>
      {/* Logo Section */}
      <div className='flex items-center text-lg font-bold p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg mr-4'>
        <span className='text-white'>CodingCampus</span>
        <GoCode className='ml-1 h-5 w-5 text-white transition-transform transform hover:scale-125' />
      </div>

      {/* Centered Dropdowns */}
      <div className='flex space-x-4 flex-grow justify-center'>
        <div className='relative'>
          <button
            onClick={(event) => handleButtonClick(event, setProductsOpen)}
            className='dropdown-button flex items-center text-lg font-bold p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg text-white '
          >
            Products
          </button>
          {isProductsOpen && (
            <div className='absolute left-0 mt-2 lg:w-96 bg-white text-black rounded-lg shadow-lg z-10 p-10 grid grid-cols-2 gap-4'>
              <div>
                <span className='block font-bold mb-2'>Products</span>
                <Link href="/CompanyProvidings/Products/Products/screen" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Screen
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Save time and accelerate your hiring.
                  </p>
                </Link>
                <Link href="/CompanyProvidings/Products/Products/interview" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Interview
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Conduct stellar technical interviews.
                  </p>
                </Link>
                <Link href="/CompanyProvidings/Products/Products/engage" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Engage
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Promote your tech brand.
                  </p>
                </Link>
                <Link href="/CompanyProvidings/Products/Products/skillup" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  SkillUp
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Mobilize your tech talent.
                  </p>
                </Link>
              </div>

              <div>
                <span className='block font-bold mb-2'>Features</span>
                <Link href="/CompanyProvidings/Products/Features/certified_assessments" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Certified Assessments
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Launch standardized, role-based tests in minutes.
                  </p>
                </Link>
                <Link href="/CompanyProvidings/Products/Features/plagiarism_detection" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Plagiarism Detection
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Ensure fairness with AI-powered plagiarism detection.
                  </p>
                </Link>
                <Link href="/CompanyProvidings/Products/Features/real_world_questions" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Real World Questions
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Assess technical hires with real-world coding questions.
                  </p>
                </Link>
                <Link href="/CompanyProvidings/Products/Features/integrations" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Integrations
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Seamlessly connect with your favorite tools.
                  </p>
                </Link>
              </div>

            </div>
          )}
        </div>

        <div className='relative'>
          <button
            onClick={(event) => handleButtonClick(event, setSolutionsOpen)}
            className='dropdown-button flex items-center text-lg font-bold p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg text-white'
          >
            Solutions
          </button>
          {isSolutionsOpen && (
            <div className='absolute left-0 mt-2 lg:w-96 bg-white text-black rounded-lg shadow-lg z-10 p-10 grid grid-cols-2 gap-4'>

              <div>
                <span className='block font-bold mb-2'>What we do ?</span>
                <Link href="/CompanyProvidings/Solutions/What_we_do/skills_strategy" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Set Up Your Skills Strategy
                </Link>
                <Link href="/CompanyProvidings/Solutions/What_we_do/tech_brand" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Showcase Your Tech Brand
                </Link>
                <Link href="/CompanyProvidings/Solutions/What_we_do/hiring_process" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Optimize Your Hiring Process
                </Link>
                <Link href="/CompanyProvidings/Solutions/What_we_do/internal_Talent" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Mobilize Your Internal Talent
                </Link>
              </div>

              <div>
                <span className='block font-bold mb-2'>Use Cases</span>
                <Link href="/CompanyProvidings/Solutions/Use_Cases/remote_hiring" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Remote Hiring
                </Link>
                <Link href="/CompanyProvidings/Solutions/Use_Cases/university_hiring" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  University Hiring
                </Link>
              </div>

            </div>
          )}
        </div>

        <div className='relative'>
          <button
            onClick={(event) => handleButtonClick(event, setResourcesOpen)}
            className='dropdown-button flex items-center text-lg font-bold p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg text-white'
          >
            Resources
          </button>
          {isResourcesOpen && (
            <div className='absolute left-0 mt-2 lg:w-96 bg-white text-black rounded-lg shadow-lg z-10 p-10 grid grid-cols-2 gap-4'>

              <div>
                <span className='block font-bold mb-2'>Learn</span>
                <Link href="/CompanyProvidings/Resources/Learn/blog" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Blog
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Hiring best practices and industry insights.
                  </p>
                </Link>

                <Link href="/CompanyProvidings/Resources/Learn/roles_directory" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Roles Directory
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Explore the definitive directory of tech roles.
                  </p>
                </Link>

                <Link href="/CompanyProvidings/Resources/Learn/resource_library" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Resource Library
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Guides, datasheets, and data-driven content.
                  </p>
                </Link>
              </div>

              <div>
                <span className='block font-bold mb-2'>Product Help</span>
                <Link href="/CompanyProvidings/Resources/Product_Help/responsible_ai" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Responsible AI
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Learn more about how we work with AI.
                  </p>
                </Link>
                <Link href="/CompanyProvidings/Resources/Product_Help/what's_new" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  What's New
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Get the latest product news and updates.
                  </p>
                </Link>
                <Link href="/CompanyProvidings/Resources/Product_Help/support" className='block py-1 hover:bg-gray-100 rounded transition-colors'>
                  Support
                  <p style={{ color: '#576871', fontSize: '13px', fontFamily: 'Open Sans, sans-serif' }}>
                    Everything you need to know to get started.
                  </p>
                </Link>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Log In and Sign Up Buttons */}
      <div className='flex space-x-4'>
        <Link href='/Login&signUp/Login'>
          <button className='flex items-center text-lg font-bold p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg text-white'>
            Log In
          </button>
        </Link>
        <Link href='/Login&signUp/Signup'>
          <button className='flex items-center text-lg font-bold p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg text-white'>
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default TopbarWebsite;

