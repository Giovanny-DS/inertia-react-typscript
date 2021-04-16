import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react';

type Props = {
  href: string;
  className?: string;
  activeClassName?: string; // in case you want to add something to the active className only
  active?: boolean;
};

export const NavLink: React.FC<Props> = ({ href, className = '', activeClassName = '', active = false, children }) => {
  return (
    <InertiaLink
      href={href}
      className={[
        active
          ? [
              'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition',
              activeClassName,
            ].join(' ')
          : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition',
        className,
      ].join(' ')}
    >
      {children}
    </InertiaLink>
  );
};
