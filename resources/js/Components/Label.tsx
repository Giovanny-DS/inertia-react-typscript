import React from 'react';

type Props = {
  value?: string;
  className?: string;
};

export const Label: React.FC<Props> = ({ className, value, children }) => {
  return (
    <label className={['block text-sm font-medium text-gray-700', className].join(' ')}>
      {value ? <span>{value}</span> : <span>{children}</span>}
    </label>
  );
};
