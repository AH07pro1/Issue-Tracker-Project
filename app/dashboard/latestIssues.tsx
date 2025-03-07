'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NoElementWarning from '../NoElementWarning';

interface Issue {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  description: string;
  createdByUserId: string,
  assignedToUserId: string
}

interface LatestIssuesProps {
  issues: Issue[];
}

const LatestIssues = ({ issues }: LatestIssuesProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  let data: Issue[] = issues;

  if (!session?.user?.id) return;

  // Default: Show issues created by or assigned to the user
  data = data.filter(issue =>
    issue.createdByUserId === session.user.id || issue.assignedToUserId === session.user.id
  );

  // Sort issues by createdAt date in descending order and take the 5 most recent
  const recentIssues = [...data]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4 text-center">Top 5 Most Recent Issues</h3>
      <div className="space-y-4 flex-grow overflow-y-auto">
        {recentIssues.length === 0 ? (
          <NoElementWarning 
            warningMessage="No recent issues available." 
            filteredInfo='Create a new one here'
            redirectTo='/new-issue'
          />
        ) : (
          recentIssues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => router.push(`issues/${issue.id}`)}
              className="card bg-base-100 shadow-xl p-4 cursor-pointer hover:bg-gray-100 transition duration-200"
            >
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
          ))
        )}
      </div>
    </div>
  );
};

export default LatestIssues;
