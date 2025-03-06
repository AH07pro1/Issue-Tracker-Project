'use client'
import { useAppContext } from '@/context';
import React from 'react';

function IssueSummary() {
  const { issueCounts } = useAppContext();

  const openCount = issueCounts.open;
  const closedCount = issueCounts.closed;
  const inProgressCount = issueCounts.inProgress;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Issue Summary</h1>
      <div className="stats flex flex-col md:flex-row justify-center items-center w-full gap-4 md:gap-8 lg:gap-16 xl:gap-24 shadow">
        <div className="stat text-center">
          <div className="stat-title">OPEN</div>
          <div className="stat-value">{openCount}</div>
        </div>

        <div className="stat text-center">
          <div className="stat-title">CLOSED</div>
          <div className="stat-value">{closedCount}</div>
        </div>

        <div className="stat text-center">
          <div className="stat-title">IN PROGRESS</div>
          <div className="stat-value">{inProgressCount}</div>
        </div>
      </div>
    </div>
  );
}

export default IssueSummary;
