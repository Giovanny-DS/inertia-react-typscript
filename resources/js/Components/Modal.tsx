import { Transition } from '@headlessui/react';
import React from 'react';
import Teleport from './Teleport';

type Props = {
  show: boolean;
  closeable?: boolean;
  onClose?: CallableFunction;
  maxWidth?: string;
};

const Modal: React.FC<Props> = ({ children, show, maxWidth = '2xl', closeable = true, onClose }) => {
  const maxWidthClass = () => {
    return {
      sm: 'sm:max-w-sm',
      md: 'sm:max-w-md',
      lg: 'sm:max-w-lg',
      xl: 'sm:max-w-xl',
      '2xl': 'sm:max-w-2xl',
    }[maxWidth];
  };
  return (
    <Teleport to="body">
      <Transition show={show} leave="duration-200">
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto sm:px-0">
          <Transition.Child
            enter="duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 transition-all transform"
              onClick={() => {
                closeable ? onClose?.() : null;
              }}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
          </Transition.Child>

          <Transition.Child
            className={['sm:w-full sm:mx-auto', maxWidthClass()].join(' ')}
            enter="duration-300 ease-out"
            enterFrom="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
            enterTo="translate-y-0 opacity-100 sm:scale-100"
            leave="duration-200 ease-in"
            leaveFrom="translate-y-0 opacity-100 sm:scale-100"
            leaveTo="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={[
                'mb-6 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:w-full sm:mx-auto',
                maxWidthClass(),
              ].join(' ')}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </Teleport>
  );
};
export default Modal;
