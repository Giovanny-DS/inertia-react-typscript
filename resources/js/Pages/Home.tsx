import React, { useState } from 'react';
import ActionBanner from '../Components/ActionBanner';
import CheckInfoIcon from './../Components/CheckInfoIcon';

const Home = () => {
  const [message, setMessage] = useState('test');
  let foo: string = 'React';
  const bar: string = 'TypeScript';

  return (
    <div>
      <ActionBanner type="warning" message={message} onClose={() => setMessage('')}></ActionBanner>
    </div>
  );
};

export default Home;
