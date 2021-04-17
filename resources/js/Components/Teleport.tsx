import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  to: string;
};

const Teleport: React.FC<Props> = ({ children, to }) => {
  return <>{createPortal(<>{children}</>, document.querySelector(to)!)}</>;
};
export default Teleport;
