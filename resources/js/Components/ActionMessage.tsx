import { Transition } from '@headlessui/react';
import React, { ReactNode, ReactElement } from 'react';

interface ActionMessageProps {
  on: boolean;
  children: ReactNode;
}

export default function ActionMessage({ on, children, ...rest }: ActionMessageProps): ReactElement {
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
}
