import React from 'react';

type Props = React.ComponentPropsWithoutRef<'input'> & {
  className?: string;
};

const Checkbox: React.FC<Props> = ({ onChange, className = '', ...props }) => {
  return (
    <input
      type="checkbox"
      onChange={(e) => onChange?.(e)}
      className={[
        'text-indigo-600 border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
        className,
      ].join(' ')}
      {...props}
    />
  );
};
export default Checkbox;
