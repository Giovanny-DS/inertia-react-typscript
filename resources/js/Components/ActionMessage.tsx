import { Transition } from '@headlessui/react';
import React from 'react';

type Props = {
  on: boolean;
  children: React.ReactNode;
};

export const ActionMessage: React.FC<Props> = ({ on = false, children, ...rest }) => {
  return (
    <div {...rest}>
      <Transition show={on} leave="transition ease-in duration-1000" leaveFrom="opacity-100" leaveTo="opacity-0">
        <div className="text-sm text-gray-600">{children}</div>
      </Transition>
    </div>
  );
};
