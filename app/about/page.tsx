import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; // Import Image component
import appIcon from '@/app/images/app_icon.png'; // Import image

const AboutPage = () => {
  return (
    <div className="h-screen bg-base-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-[400px] border border-gray-300 flex flex-col items-center">
        {/* App Icon as Profile Picture using Next.js Image component */}
        <Image 
          src={appIcon} 
          alt="App Icon" 
          width={96} 
          height={96} 
          className="rounded-full border-4 border-gray-300 mb-6" 
        />

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">About The Project</h1>
          <p className="text-lg text-gray-600 mb-6">This is my first official Next.js project.</p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="https://github.com/AH07pro1" className="btn btn-primary w-full sm:w-auto">
              Github Page
            </Link>
            <Link href="https://www.twins4soft.com/" className="btn btn-primary w-full sm:w-auto">
              Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
