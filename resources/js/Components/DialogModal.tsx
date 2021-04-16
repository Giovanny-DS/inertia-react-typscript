import React, { useState } from 'react';
import { Modal } from './Modal';

interface Props {
  on: boolean;
  title?: string | React.ReactNode;
  content?: string | React.ReactNode;
  footer?: string | React.ReactNode;
  closeable?: boolean;
}

const DialogModal: React.FC<Props> = ({ on, content, footer, closeable = true, title = 'modal title', children }) => {
  const [show, setShow] = useState(on);
  return (
    <Modal show={show} closeable={closeable} onClose={() => setShow(false)}>
      <div className="relative px-6 py-4">
        <div className="text-lg">{title}</div>
        <div className="mt-4">{content}</div>
      </div>
      <div className="px-6 py-4 text-right bg-gray-100">
        <div>{footer}</div>
      </div>
    </Modal>
  );
};

export default DialogModal;
