import React, { ReactElement, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import CheckFailIcon from './CheckFailIcon';
import CheckPassesIcon from './CheckPassesIcon';
import CheckInfoIcon from './CheckInfoIcon';
import CheckWarningIcon from './CheckWarningIcon';
import CheckCancelIcon from './CheckCancelIcon';

interface BannerProps {
  message: string;
  onClose: CallableFunction;
  autoDeletion?: Boolean;
  type?: 'success' | 'danger' | 'warning' | 'info';
  time?: number;
}

export default function ActionBanner({
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
        <div
          className={[
            'absolute top-0 w-full',
            type === 'success'
              ? 'bg-green-500'
              : type === 'danger'
              ? 'bg-red-700'
              : type === 'info'
              ? 'bg-blue-700'
              : 'bg-yellow-500 ',
          ].join(' ')}
        >
          <div className="max-w-screen-xl px-3 py-2 mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center flex-1 w-0 min-w-0">
                <span
                  className={[
                    'flex p-2 rounded-lg',
                    type === 'success'
                      ? 'bg-green-600'
                      : type === 'danger'
                      ? 'bg-red-600'
                      : type === 'info'
                      ? 'bg-blue-600'
                      : 'bg-yellow-400',
                  ].join(' ')}
                >
                  {type === 'success' ? (
                    <CheckPassesIcon className="text-white" />
                  ) : type === 'danger' ? (
                    <CheckFailIcon className="text-white" />
                  ) : type === 'info' ? (
                    <CheckInfoIcon className="text-white" />
                  ) : (
                    <CheckWarningIcon className="text-black" />
                  )}
                </span>
                <p
                  className={[
                    'ml-3 text-sm font-medium truncate',
                    type === 'warning' ? 'text-black' : 'text-white',
                  ].join(' ')}
                >
                  {message}
                </p>
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
                  <CheckCancelIcon className={type === 'warning' ? 'text-black' : 'text-white'} />
                  {/* <svg
                    className="w-5 h-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  ></svg> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
