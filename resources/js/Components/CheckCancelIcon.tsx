import React, { ReactElement } from 'react';

interface Props {
  className?: string;
}

export default function CheckCancelIcon({ className, ...rest }: Props): ReactElement {
  return (
    <svg
      className={['w-5 h-5', className].join(' ')}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
