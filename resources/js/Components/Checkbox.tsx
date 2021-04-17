import React from 'react';

type Props = React.ComponentPropsWithoutRef<'input'> & {
  value?: string;
  className?: string;
};

const Checkbox: React.FC<Props> = ({ value = '', onChange, className = '' }) => {
  return (
    <input
      type="checkbox"
      value={value}
      onChange={(e) => onChange?.(e)}
      className={[
        'text-indigo-600 border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
        className,
      ].join(' ')}
    />
  );
};
export default Checkbox;
