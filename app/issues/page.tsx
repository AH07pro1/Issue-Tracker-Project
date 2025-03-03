'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Issue {
  id: number;
  title: string;
  description: string;
}

const IssuePage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const getAllIssues = async () => {
    const response = await fetch('/api/issues', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setIssues(data);
  };

  useEffect(() => {
    getAllIssues();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100">
      <h1 className="text-3xl font-semibold text-center text-primary mb-6">Issue Page</h1>
      <div className="overflow-y-auto max-h-[60vh]">
        {issues.map((issue) => (
          <div key={issue.id} className="bg-base-200 p-6 mt-4 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-primary">{issue.title}</h2>
            <p className="mt-2 text-gray-700">{issue.description}</p>
            <Link href={`/issues/${issue.id}`} className="text-sm text-blue-500 hover:underline mt-4 block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuePage;
