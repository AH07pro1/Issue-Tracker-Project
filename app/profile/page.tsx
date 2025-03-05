'use client';
import { useSession } from 'next-auth/react';
import React from 'react'
import ProfileTemplate from './profileTemplate';

const page = () => {
    const { status, data: session } = useSession();
  return (
    <div>
      <ProfileTemplate name={session!.user!.name!} email={session!.user!.email!} profilePic={session!.user!.image!}/>
    </div>
  )
}

export default page
