import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react';
import ApplicationLogo from './ApplicationLogo';

type Props = {
  children?: React.ReactNode;
};

const AuthenticationCardLogo: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <InertiaLink href="'/'">
      <ApplicationLogo className="w-44 h-44" />
    </InertiaLink>
  );
};
export default AuthenticationCardLogo;
