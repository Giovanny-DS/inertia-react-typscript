import React, { LabelHTMLAttributes } from 'react';

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  value?: string;
  className?: string;
};

export const Label: React.FC<Props> = ({ className, value, children, ...rest }) => {
  return (
    <label className={['block text-sm font-medium text-gray-700', className].join(' ')} {...rest}>
      {value ? <span>{value}</span> : <span>{children}</span>}
    </label>
  );
};
