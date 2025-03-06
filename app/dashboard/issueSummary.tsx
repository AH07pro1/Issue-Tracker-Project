'use client'
import { useAppContext } from '@/context';
import React from 'react';

function IssueSummary() {
  const { issueCounts } = useAppContext();

  return (
    <div className="m-5">
      <h1>Issue Summary</h1>
      <div className="stats lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">OPEN</div>
          <div className="stat-value">{issueCounts.open}</div>
        </div>

        <div className="stat">
          <div className="stat-title">CLOSED</div>
          <div className="stat-value">{issueCounts.closed}</div>
        </div>

        <div className="stat">
          <div className="stat-title">IN PROGRESS</div>
          <div className="stat-value">{issueCounts.inProgress}</div>
        </div>
      </div>
    </div>
  );
}

export default IssueSummary;
