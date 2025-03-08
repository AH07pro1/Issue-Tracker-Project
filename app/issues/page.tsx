'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAppContext } from '@/context';
import { redirect } from 'next/navigation';
import IssueTable from './issueTable';

interface Issue {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  description: string;
  createdByUserId: string;
  createdByUserName: string;
  assignedToUserId: string | null;
}

const IssuePage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'created' | 'assigned'>('all');
  const { setIssueCounts } = useAppContext();
  const { data: session } = useSession();

  // useEffect(() => {
  //   if (!session) {
  //     redirect('/api/auth/signin');
  //   } else {
  //     getUserIssues();
  //   }
  // }, [session, sortOrder, filteredStatus, filterType]);

  useEffect(() =>{
      getUserIssues()
  })

  const getCurrentFilter = () => {
    return `${filterType === 'all' ? 'All' : filterType === 'created' ? 'Created by Me' : 'Assigned to Me'}${filteredStatus ? ` (${filteredStatus})` : ''}`;
  };

  const getUserIssues = async () => {
    try {
      const response = await fetch('/api/issues');
      let data: Issue[] = await response.json();
      if (!session?.user?.id) return;
      // Default: Show issues created by or assigned to the user
      data = data.filter(
        (issue) =>
          issue.createdByUserId === session.user.id || issue.assignedToUserId === session.user.id
      );

      // Apply filtering for "Created by Me" or "Assigned to Me"
      if (filterType === 'created') {
        data = data.filter((issue) => issue.createdByUserId === session.user.id);
      } else if (filterType === 'assigned') {
        data = data.filter((issue) => issue.assignedToUserId === session.user.id);
      }

      // Count issues by status
      const openCount = data.filter((issue) => issue.status === 'OPEN').length;
      const closedCount = data.filter((issue) => issue.status === 'CLOSED').length;
      const inProgressCount = data.filter((issue) => issue.status === 'IN_PROGRESS').length;
      setIssueCounts({ open: openCount, closed: closedCount, inProgress: inProgressCount });

      // Apply status filter if selected
      if (filteredStatus) {
        data = data.filter((issue) => issue.status === filteredStatus);
      }

      // Sort issues
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

  return (
      <IssueTable
        filterType={filterType}
        filteredStatus={filteredStatus}
        setFilterType={setFilterType}
        setFilteredStatus={setFilteredStatus}
        issues={issues}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        getCurrentFilter={getCurrentFilter}
      />
  );
};

export default IssuePage;
