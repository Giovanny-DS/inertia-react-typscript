import { Transition } from '@headlessui/react';
import React, { ReactNode } from 'react';

interface Props {
  on: boolean;
  children: ReactNode;
}

export const ActionMessage: React.FC<Props> = ({ on, children, ...rest }) => {
  return (
    <div>
      <Transition
        show={on}
        enter={'transition-opacity ease-in duration-300'}
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave={'transition-opacity ease-in duration-150'}
        leaveFrom="opacity-0"
        leaveTo="opacity-100"
      >
        <div className="text-sm text-gray-600" {...rest}>
          {children}
        </div>
      </Transition>
    </div>
  );
};
