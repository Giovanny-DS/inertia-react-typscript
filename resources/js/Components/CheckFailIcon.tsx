import React from 'react';

type Props = {
  className?: string;
};

const CheckFailIcon: React.FC<Props> = ({ className, ...rest }) => {
  return (
    <svg
      className={['w-5 h-5', className].join(' ')}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path d="M12 0C5.36756 0 0 5.36705 0 12C0 18.6325 5.36705 24 12 24C18.6324 24 24 18.633 24 12C24 5.36752 18.633 0 12 0ZM12 22.125C6.40387 22.125 1.875 17.5965 1.875 12C1.875 6.40383 6.40345 1.875 12 1.875C17.5961 1.875 22.125 6.40345 22.125 12C22.125 17.5962 17.5965 22.125 12 22.125Z" />

      <path d="M16.1056 14.7798L13.3258 12L16.1056 9.22021C16.4717 8.85412 16.4718 8.26054 16.1057 7.8944C15.7395 7.52826 15.1459 7.52831 14.7799 7.8944L12 10.6742L9.2202 7.8944C8.85416 7.52826 8.26049 7.52826 7.89439 7.8944C7.5283 8.26054 7.5283 8.85412 7.89444 9.22021L10.6742 12L7.89444 14.7798C7.5283 15.1459 7.52825 15.7395 7.89439 16.1056C8.26063 16.4718 8.8542 16.4716 9.2202 16.1056L12 13.3258L14.7799 16.1056C15.1458 16.4717 15.7395 16.4717 16.1057 16.1056C16.4718 15.7394 16.4718 15.1459 16.1056 14.7798Z" />
    </svg>
  );
};
export default CheckFailIcon;
