import React from 'react';
import { ApplicationLogo } from './ApplicationLogo';

interface Props {
  children?: React.ReactNode;
}

export const AuthenticationCardLogo: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0" {...rest}>
      <ApplicationLogo alt="Just the logo of the site" className="w-44 h-44" />
    </div>
  );
};
