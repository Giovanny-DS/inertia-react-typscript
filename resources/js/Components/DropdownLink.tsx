import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react';

type Props = {
  as?: 'button' | 'a';
  href?: string;
};

export const DropdownLink: React.FC<Props> = ({ as, href = '', children }) => {
  return (
    <div>
      {as === 'button' ? (
        <button
          type="submit"
          className="block w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
        >
          {children}
        </button>
      ) : as === 'a' ? (
        <a
          href={href}
          className="block px-4 py-2 text-sm leading-5 text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
        >
          {children}
        </a>
      ) : (
        <InertiaLink
          href={href}
          className="block px-4 py-2 text-sm leading-5 text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
        >
          {children}
        </InertiaLink>
      )}
    </div>
  );
};
