import React from 'react';

type Props = {
  className?: string;
};

export const CheckInfoIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={['w-5 h-5', className].join(' ')}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M13.2 10.8H10.8V18H13.2V10.8Z" />
      <path d="M12 0C5.37001 0 0 5.37001 0 12C0 18.6299 5.37001 23.9999 12 23.9999C18.6299 23.9999 24 18.63 24 12C24 5.36996 18.63 0 12 0ZM12 21.6C6.70798 21.6 2.39996 17.292 2.39996 12C2.39996 6.70798 6.70798 2.40002 12 2.40002C17.292 2.40002 21.6 6.70798 21.6 12C21.6 17.292 17.292 21.6 12 21.6Z" />
      <path d="M13.2 6.00001H10.8V8.40003H13.2V6.00001Z" />
    </svg>
  );
};
