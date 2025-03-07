import React from 'react'
import NoElementWarning from '../NoElementWarning';
import { redirect } from 'next/navigation';
import StatusBadge from './statusBadge';

interface Issue {
    id: number;
    title: string;
    status: string;
    createdAt: string;
    description: string;
    createdByUserId: string;
    createdByUserName: string; // ✅ New field
    assignedToUserId: string | null;
  }

interface Props{
    filterType: string,
    filteredStatus: string | any,
    setFilterType: React.Dispatch<React.SetStateAction<'all' | 'created' | 'assigned'>>;
    setFilteredStatus: React.Dispatch<React.SetStateAction<string | null>>;
    issues: Issue[],
    sortOrder: string,
    setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
    getCurrentFilter: () => string

}

function issueTable({filterType, filteredStatus, setFilterType, setFilteredStatus, issues, sortOrder, setSortOrder, getCurrentFilter}: Props) {
  return (
    <div className='m-5'>
      <div className="overflow-x-auto">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 justify-center sm:justify-start">
        <button
          className={`btn btn-sm sm:btn-md ${
            filterType === 'all' && !filteredStatus ? 'btn-primary' : ''
          }`}
          onClick={() => {
            setFilterType('all');
            setFilteredStatus(null);
          }}
        >
          All
        </button>
        <button
          className={`btn btn-sm sm:btn-md ${filterType === 'created' ? 'btn-primary' : ''}`}
          onClick={() => setFilterType('created')}
        >
          Created by Me
        </button>
        <button
          className={`btn btn-sm sm:btn-md ${filterType === 'assigned' ? 'btn-primary' : ''}`}
          onClick={() => setFilterType('assigned')}
        >
          Assigned to Me
        </button>

        {/* Status Filters */}
        <button
          className={`btn btn-sm sm:btn-md ${filteredStatus === 'OPEN' ? 'btn-primary' : ''}`}
          onClick={() => setFilteredStatus('OPEN')}
        >
          Open
        </button>
        <button
          className={`btn btn-sm sm:btn-md ${
            filteredStatus === 'IN_PROGRESS' ? 'btn-primary' : ''
          }`}
          onClick={() => setFilteredStatus('IN_PROGRESS')}
        >
          In Progress
        </button>
        <button
          className={`btn btn-sm sm:btn-md ${filteredStatus === 'CLOSED' ? 'btn-primary' : ''}`}
          onClick={() => setFilteredStatus('CLOSED')}
        >
          Closed
        </button>
      </div>

      {/* Table */}
      {/* Table or No Issues Message */}
{issues.length > 0 ? (
  <table className="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Status</th>
        <th>Created By</th>
        <th
          className="cursor-pointer hover:text-primary"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Created At {sortOrder === 'asc' ? '↑' : '↓'}
        </th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {issues.map((issue) => (
        <tr
          key={issue.id}
          onClick={() => redirect(`/issues/${issue.id}`)}
          className="hover:bg-base-300"
        >
          <td>{issue.id}</td>
          <td>{issue.title}</td>
          <td>
            <StatusBadge status={issue.status} />
          </td>
          <td>{issue.createdByUserName}</td>
          <td>{new Date(issue.createdAt).toLocaleString()}</td>
          <td>{issue.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <NoElementWarning warningMessage="There's no issue for this filter:" filteredInfo={getCurrentFilter()} redirectTo='new-issue'/>
  
)}

    </div>
    </div>
  )
}

export default issueTable
