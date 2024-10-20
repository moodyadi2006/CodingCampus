// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between text-gray-600">
          <div className="w-full sm:w-1/5 mb-6">
            <h2 className="font-bold mb-2">PRODUCTS</h2>
            <ul>
              <li>Screen</li>
              <li>Interview</li>
              <li>Engage</li>
              <li>SkillUp</li>
              <li>Certified Assessments</li>
              <li>Plagiarism Detection</li>
              <li>Real World Questions</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/5 mb-6">
            <h2 className="font-bold mb-2">SOLUTIONS</h2>
            <ul>
              <li>Set Up a Skills Strategy</li>
              <li>Showcase Your Talent Brand</li>
              <li>Optimize Your Hiring Process</li>
              <li>Mobilize Your Internal Talent</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/5 mb-6">
            <h2 className="font-bold mb-2">RESOURCES</h2>
            <ul>
              <li>Blog</li>
              <li>Customer Stories</li>
              <li>Roles Directory</li>
              <li>Partners</li>
              <li>Integrations</li>
              <li>What’s New</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/5 mb-6">
            <h2 className="font-bold mb-2">ABOUT US</h2>
            <ul>
              <li>Careers</li>
              <li>Our Team</li>
              <li>Newsroom</li>
              <li>Status</li>
              <li>Trust</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/5 mb-6">
            <h2 className="font-bold mb-2">GET STARTED</h2>
            <ul>
              <li>Pricing</li>
              <li>Free Trial</li>
              <li>Contact Us</li>
              <li>Request Demo</li>
              <li>Product Support</li>
              <li>For Developers</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div>
            <img src="/CodingCampuslogo.png" alt="CodingCampus Logo" className="h-8" />
          </div>
          <div className="flex space-x-4">
            <img src="fb.png" alt="Facebook" className="h-6" />
            <img src="linkedin.png" alt="LinkedIn" className="h-6" />
            <img src="x.png" alt="X" className="h-6" />
            <img src="instagram.png" alt="Instagram" className="h-6" />
          </div>
        </div>
        <div className="text-center text-gray-500 mt-4">
          <p>Copyright © 2024 CodingCampus</p>
          <p><a href="/privacy-policy" className="text-gray-600 hover:text-gray-800">Privacy Policy</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
