import React, { ReactElement } from 'react';

interface Props {
  className?: string;
}

export default function CheckPassesIcon({ className }: Props): ReactElement {
  return (
    <svg
      className={['w-5 h-5', className].join(' ')}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
