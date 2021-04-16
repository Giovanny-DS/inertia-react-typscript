import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react';

type Props = {
  as?: 'button';
  className?: string;
  href?: string;
};

export const ResponsiveNavLink: React.FC<Props> = ({ as = 'default', className, href = '', children }) => {
  return (
    <div>
      {as === 'button' ? (
        <button className={['w-full text-left', className].join(' ')}>{children}</button>
      ) : (
        <InertiaLink href={href} className={className}>
          {children}
        </InertiaLink>
      )}
    </div>
  );
};
