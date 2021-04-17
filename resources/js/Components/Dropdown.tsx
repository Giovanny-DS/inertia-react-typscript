import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';

type Props = {
  width?: string | number;
  align?: string;
  contentClasses?: string;
  trigger?: string | React.ReactNode;
};

const Dropdown: React.FC<Props> = ({ trigger, contentClasses, width = '', align, children }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    window.addEventListener('keydown', (e) => closeOnEscape(e));
    return () => {
      window.removeEventListener('keydown', (e) => closeOnEscape(e));
    };
  }, []);
  const toggle = () => {
    setOpen((open) => !open);
  };
  const closeOnEscape = (e: KeyboardEvent) => {
    if (open && e.key === 'Escape') {
      toggle();
    }
  };
  const widthClass = () => {
    return { '48': 'w-48' }[width.toString()];
  };

  const alignmentClasses = () =>
    align === 'left' ? 'origin-top-left left-0' : align === 'right' ? 'origin-top-right right-0' : 'origin-top';

  return (
    <div className="relative">
      <div onClick={toggle}>{trigger}</div>

      {/* <!-- Full Screen Dropdown Overlay --> */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={toggle}></div>
          <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div
              className={['absolute z-50 mt-2 rounded-md shadow-lg bg-white', widthClass(), alignmentClasses()].join(
                ' '
              )}
              onClick={() => toggle}
            >
              <div className={['rounded-md ring-1 ring-black ring-opacity-5', contentClasses].join(' ')}>
                {children}
              </div>
            </div>
          </Transition>
        </>
      )}
    </div>
  );
};
export default Dropdown;
