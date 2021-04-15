import React, { Fragment, useState } from 'react';
import { ActionBanner } from '../Components/ActionBanner';
import { Modal } from '../Components/Modal';
import { Teleport } from '../Components/Teleport';
import { ConfirmationModal } from '../templates/ConfirmationModal';

const Home = () => {
  const [message, setMessage] = useState('test');
  const [show, setShow] = useState(true);
  let foo: string = 'React';
  const bar: string = 'TypeScript';

  return (
    <div>
      <ActionBanner type="warning" message={message} onClose={() => setMessage('')}></ActionBanner>
    </div>
  );
};

export default Home;
