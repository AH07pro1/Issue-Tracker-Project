'use client'
import { useAppContext } from '@/context';
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis } from 'recharts';

function IssueBarChart() {
    const { issueCounts } = useAppContext();
    const data = [
        { name: 'Open', uv: issueCounts.open },
        { name: 'Closed', uv: issueCounts.closed }, 
        { name: 'In Progress', uv: issueCounts.inProgress }
    ];

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 h-full">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} barCategoryGap="30%">
                    <YAxis />
                    <XAxis dataKey="name" />
                    <Bar dataKey="uv" fill="#8884d8" barSize={80} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default IssueBarChart;
