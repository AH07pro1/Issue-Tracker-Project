'use client';
import React, { useEffect, useState } from 'react';
import IssueSummary from './issueSummary';
import IssueBarChart from './issueBarChart';
import LatestIssues from './latestIssues';

interface Issue {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  description: string;
}

const Page = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('/api/issues');
        const data: Issue[] = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="p-6 bg-base-200 min-h-screen flex flex-col space-y-8">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:gap-8 space-y-8 lg:space-y-0">
        {/* Left Section: Issue Summary and Bar Chart */}
        <div className="flex flex-col gap-8 w-full lg:w-2/3">
          {/* Issue Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex-grow">
            <IssueSummary />
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex-grow">
            <IssueBarChart />
          </div>
        </div>

        {/* Right Section: Latest Issues (Moves Below on Small Screens) */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <LatestIssues issues={issues} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
