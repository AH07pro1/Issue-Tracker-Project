import React from 'react';

interface Issue {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  description: string;
}

interface LatestIssuesProps {
  issues: Issue[];
}

const LatestIssues = ({ issues }: LatestIssuesProps) => {
  // Sort issues by createdAt date in descending order and then take the 5 most recent
  const recentIssues = [...issues]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4 text-center">Top 5 Most Recent Issues</h3>
      <div className="space-y-4 flex-grow overflow-y-auto">
        {recentIssues.map((issue) => (
          <div key={issue.id} className="card bg-base-100 shadow-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <strong className="text-lg text-primary">{issue.title}</strong>
              <span className="text-sm text-gray-500">{new Date(issue.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-sm mb-3">{issue.description}</p>
            <div className="flex items-center space-x-2">
              <span
                className={`badge ${
                  issue.status === 'OPEN' ? 'badge-warning' : issue.status === 'CLOSED' ? 'badge-success' : 'badge-info'
                }`}
              >
                {issue.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestIssues;