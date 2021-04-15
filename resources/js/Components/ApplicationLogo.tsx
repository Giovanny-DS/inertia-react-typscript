import React from 'react';
import logo from './../assets/logo.svg';

interface Props {
  alt?: string;
  className?: string;
}

export const ApplicationLogo: React.FC<Props> = ({ alt, className, ...rest }) => {
  return (
    <div>
      <img src={logo} {...rest} />
    </div>
  );
};
