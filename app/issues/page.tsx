'use client'
import { useEffect, useState } from 'react';
import { useAppContext } from '@/context';
import { redirect } from 'next/navigation';
import StatusBadge from './statusBadge';

interface Issue {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  description: string;
}

const IssuePage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [openIssues, setOpenIssues] = useState<number>(0);
  const [closedIssues, setClosedIssues] = useState<number>(0); 
  const [inProgressIssues, setInProgressIssues] = useState<number>(0);
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);
  const { setIssueCounts } = useAppContext();
 
  useEffect(() => {
    getAllIssues();
  }, [issues]); 
  
  const getAllIssues = async () => {
    try {
      const response = await fetch('/api/issues');
      let data: Issue[] = await response.json();

      // Count issues by status
      setOpenIssues(data.filter(issue => issue.status === 'OPEN').length)
      setClosedIssues(data.filter(issue => issue.status === 'CLOSED').length)
      setInProgressIssues(data.filter(issue => issue.status === 'IN_PROGRESS').length)

      // Update context with issue counts
      setIssueCounts({ open: openIssues, closed: closedIssues, inProgress: inProgressIssues });

      // Filter by selected status
      if (filteredStatus) {
        data = data.filter(issue => issue.status === filteredStatus);
      }

      // Sort issues by createdAt
      data.sort((a, b) =>
        sortOrder === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  useEffect(() => {
    getAllIssues();
  }, [sortOrder, filteredStatus]); // Refetch data when sorting or filtering changes

  return (
    <div className="overflow-x-auto">
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-4">
        <button className={`btn ${filteredStatus === null ? 'btn-primary' : ''}`} onClick={() => setFilteredStatus(null)}>
          All ({openIssues + closedIssues + inProgressIssues})
        </button>
        <button className={`btn ${filteredStatus === 'OPEN' ? 'btn-primary' : ''}`} onClick={() => setFilteredStatus('OPEN')}>
          Open ({openIssues})
        </button>
        <button className={`btn ${filteredStatus === 'IN_PROGRESS' ? 'btn-primary' : ''}`} onClick={() => setFilteredStatus('IN_PROGRESS')}>
          In Progress ({inProgressIssues})
        </button>
        <button className={`btn ${filteredStatus === 'CLOSED' ? 'btn-primary' : ''}`} onClick={() => setFilteredStatus('CLOSED')}>
          Closed ({closedIssues})
        </button>
      </div>

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th className="cursor-pointer hover:text-primary" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
              Created At {sortOrder === 'asc' ? '↑' : '↓'}
            </th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => (
            <tr key={issue.id} onClick={() => redirect(`/issues/${issue.id}`)} className="hover:bg-base-300">
              <td>{issue.id}</td>
              <td>{issue.title}</td>
              <td><StatusBadge status={issue.status} /></td>
              <td>{new Date(issue.createdAt).toLocaleString()}</td>
              <td>{issue.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuePage;
