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
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);
  const { setIssueCounts } = useAppContext();

  useEffect(() => {
    getAllIssues();
  }, [sortOrder, filteredStatus]); // Fetch when sort order or filter changes

  const getAllIssues = async () => {
    try {
      const response = await fetch('/api/issues');
      let data: Issue[] = await response.json();

      // Count issues by status
      const openCount = data.filter(issue => issue.status === 'OPEN').length;
      const closedCount = data.filter(issue => issue.status === 'CLOSED').length;
      const inProgressCount = data.filter(issue => issue.status === 'IN_PROGRESS').length;

      // Update context with issue counts
      setIssueCounts({ open: openCount, closed: closedCount, inProgress: inProgressCount });

      // Apply status filter
      if (filteredStatus) {
        data = data.filter(issue => issue.status === filteredStatus);
      }

      // Sort issues
      data.sort((a, b) =>
        sortOrder === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Update state only once to avoid unnecessary re-renders
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-4">
        <button className={`btn ${filteredStatus === null ? 'btn-primary' : ''}`} onClick={() => setFilteredStatus(null)}>
          All
        </button>
        <button className={`btn ${filteredStatus === 'OPEN' ? 'btn-primary' : ''}`} onClick={() => setFilteredStatus('OPEN')}>
          Open
        </button>
        <button className={`btn ${filteredStatus === 'IN_PROGRESS' ? 'btn-primary' : ''}`} onClick={() => setFilteredStatus('IN_PROGRESS')}>
          In Progress
        </button>
        <button className={`btn ${filteredStatus === 'CLOSED' ? 'btn-primary' : ''}`} onClick={() => setFilteredStatus('CLOSED')}>
          Closed
        </button>
      </div>

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th className="cursor-pointer hover:text-primary" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} >
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
