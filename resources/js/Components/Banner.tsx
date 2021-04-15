import React, { ReactElement, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

interface BannerProps {
  message: string;
  onClose: CallableFunction;
  autoDeletion?: Boolean;
  type?: 'success' | 'danger';
  time?: number;
}

export default function Banner({
  message,
  onClose,
  autoDeletion = false,
  type = 'success',
  time = 3000,
}: BannerProps): ReactElement {
  useEffect(() => {
    if (autoDeletion) {
      const deletionTimeout = setTimeout(() => {
        onClose();
      }, time);
      return () => {
        clearTimeout(deletionTimeout);
      };
    }
  }, [onClose, time, autoDeletion]);
  return (
    <div>
      <Transition
        show={message ? true : false}
        enter={'transition-all transform ease-in duration-300'}
        enterFrom="-translate-y-12"
        enterTo="translate-y-0"
        leave={'transition-all transform ease-in duration-150'}
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-24"
      >
        <div className={['absolute top-0 w-full', type === 'success' ? 'bg-green-500' : 'bg-red-700'].join(' ')}>
          <div className="max-w-screen-xl px-3 py-2 mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center flex-1 w-0 min-w-0">
                <span className={['flex p-2 rounded-lg', type === 'success' ? 'bg-green-600' : 'bg-red-600'].join(' ')}>
                  <svg
                    className={['w-5 h-5 text-white', type === 'success' ? 'block' : 'hidden'].join(' ')}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <svg
                    className={['w-5 h-5 text-white', type === 'danger' ? 'block' : 'hidden'].join(' ')}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </span>

                <p className="ml-3 text-sm font-medium text-white truncate">{message}</p>
              </div>

              <div className="flex-shrink-0 sm:ml-3">
                <button
                  type="button"
                  className={[
                    '-mr-1 flex p-2 rounded-md focus:outline-none sm:-mr-2 transition',
                    type === 'success' ? 'hover:bg-green-600 focus:bg-green-600' : 'hover:bg-red-600 focus:bg-red-600',
                  ].join(' ')}
                  aria-label="Dismiss"
                  onClick={() => onClose()}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
