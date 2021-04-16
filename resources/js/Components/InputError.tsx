import React from 'react';

type Props = {
  message?: string;
  className?: string;
};

export const InputError: React.FC<Props> = ({ message, className }) => {
  return <div>{message && <p className={['text-sm text-red-600', className].join(' ')}>{message}</p>}</div>;
};
