import React, { ReactElement, ReactNode } from 'react';

interface Props {
  logo?: ReactNode;
  children: ReactNode;
}

export default function AuthenticationCard({ logo, children, ...rest }: Props): ReactElement {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0" {...rest}>
      {logo && <div>{logo}</div>}
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        {children && <>{children}</>}
      </div>
    </div>
  );
}