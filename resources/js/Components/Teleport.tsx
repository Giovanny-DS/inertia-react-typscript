import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  to: string;
}

export const Teleport: React.FC<Props> = ({ children, to }) => {
  return <>{createPortal(<>{children}</>, document.querySelector(to)!)}</>;
};
