import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  warningMessage: string;
  filteredInfo: string; // This is now expected to be the text for the link
  redirectTo: string; // Added a new prop to specify the link destination
}

function NoElementWarning({ warningMessage, filteredInfo, redirectTo }: Props) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(redirectTo); // Redirect to the specified path
  };

  return (
    <p className="text-center text-gray-500">
      {warningMessage}{' '}
      <strong
        onClick={handleRedirect}
        className="text-blue-500 cursor-pointer hover:underline"
      >
        {filteredInfo}
      </strong>
    </p>
  );
}

export default NoElementWarning;
