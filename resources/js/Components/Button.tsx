import React, { PropsWithChildren } from 'react';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'clean';
  className?: string;
  disabled?: boolean;
  onClick: CallableFunction;
}
const color = {
  primary:
    'inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25',
  secondary:
    'inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition',
  danger:
    'inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-600 disabled:opacity-25 transition',
  clean: '',
};
export const Button: React.FC<React.PropsWithChildren<Props>> = ({
  type = 'submit',
  variant = 'secondary',
  disabled = false,
  className,
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={[color[variant], className].join(' ')}
      onClick={(e) => onClick?.(e)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
