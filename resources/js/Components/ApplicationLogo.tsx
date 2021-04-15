import React, { ReactElement } from 'react';
import logo from './../assets/logo.svg';

interface Props {}

export default function ApplicationLogo({}: Props): ReactElement {
  return (
    <div>
      <img src={logo} alt="" />
    </div>
  );
}
