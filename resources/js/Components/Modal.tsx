import { Transition } from '@headlessui/react';
import React from 'react';
import { createPortal } from 'react-dom';
import { Teleport } from './Teleport';

interface Props {
  show: boolean;
  title?: React.ReactNode;
  closeable?: boolean;
  onClose?: CallableFunction;
}

export const Modal: React.FC<Props> = ({ children, show, closeable = true, onClose }) => {
  return (
    <Teleport to="#app">
      <Transition show={show} leave="duration-200">
        <div className="fixed inset-0 z-50 flex items-center px-4 py-6 overflow-y-auto sm:px-0">
          <Transition
            show={show}
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
          </Transition>

          <Transition
            show={show}
            enter="duration-300 ease-out"
            enterFrom="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
            enterTo="translate-y-0 opacity-100 sm:scale-100"
            leave="duration-200 ease-in"
            leaveFrom="translate-y-0 opacity-100 sm:scale-100"
            leaveTo="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          >
            <div className="mb-6 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:w-full sm:mx-auto">
              {children}
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  );
};
