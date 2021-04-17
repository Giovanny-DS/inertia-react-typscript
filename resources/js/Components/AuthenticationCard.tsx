import React from 'react';

type Props = {
  logo?: React.ReactNode;
  children: React.ReactNode;
};

export const AuthenticationCard: React.FC<Props> = ({ logo, children, ...rest }) => {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0" {...rest}>
      {logo && <div>{logo}</div>}
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        {children}
      </div>
    </div>
  );
};
