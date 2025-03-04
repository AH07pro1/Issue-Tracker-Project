'use client';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import StatusBadge from './statusBadge';

interface Issue {
  id: number;
  title: string;
  status: string;
  description: string;
}

const IssuePage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const getAllIssues = async () => {
    try {
      const response = await fetch('/api/issues', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  useEffect(() => {
    getAllIssues();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id} onClick={() => redirect(`/issues/${issue.id}`)} className="hover:bg-base-300">
              <td>{issue.id}</td>
              <td>{issue.title}</td>
              <td><StatusBadge status={issue.status}/></td>
              <td>{issue.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuePage;
