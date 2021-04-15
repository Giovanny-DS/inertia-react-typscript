import React, { ReactElement } from 'react';
import logo from './../assets/logo.svg';

interface Props {}

function ApplicationLogo({}: Props): ReactElement {
  return (
    <div>
      <img src={logo} alt="" />
    </div>
  );
}

export default ApplicationLogo;
