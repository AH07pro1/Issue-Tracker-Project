import Link from 'next/link';
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 border-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">About The Project</h1>
          <p className="text-lg text-gray-700 mb-6">This is my first official Next.js project.</p>
          
          <div className="space-x-5">
            <Link href="https://github.com/AH07pro1" className='btn btn-primary'>
                Github Page
            </Link>
            <Link href="https://www.twins4soft.com/" className='btn btn-primary'>
             
                Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
