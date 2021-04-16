import React, { DetailedHTMLProps, InputHTMLAttributes, RefObject } from 'react';

type Props = React.ComponentPropsWithoutRef<'input'> & {
  fieldRef?: RefObject<HTMLInputElement>;
};

export const Input: React.FC<Props> = ({ className, value, fieldRef: ref = null, onChange = (e) => null, ...rest }) => {
  return (
    <input
      className={[
        'border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
        className,
      ].join(' ')}
      value={value}
      //@ts-ignore
      onChange={(e) => onChange?.(e)}
      {...(ref ? { ref } : {})}
      {...rest}
    />
  );
};
