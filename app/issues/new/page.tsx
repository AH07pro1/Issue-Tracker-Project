'use client';
import React, { useState } from 'react';

const NewIssue = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');


    const handleSubmit = async () => {

        console.log("Submitting issue:", { title, desc });

        fetch('/api/issues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'title': title, 'description': desc })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
    };
    

  return (
    <div className="max-w-lg mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-primary">New Issue</h1>
      <div className="flex flex-col space-y-4">
        <input 
          type="text" 
          placeholder="Issue title" 
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          placeholder="Issue description" 
          rows={3} 
          className="textarea textarea-bordered w-full"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => handleSubmit()}>Submit Issue</button>
      </div>
    </div>
  );
};

export default NewIssue;