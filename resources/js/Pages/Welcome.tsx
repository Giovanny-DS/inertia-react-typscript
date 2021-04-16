import { usePage } from '@inertiajs/inertia-react';
import React, { useState } from 'react';
import { ActionBanner } from '../Components/Banner';

const Welcome = () => {
  const [message, setMessage] = useState('test');
  let foo: string = 'React';
  const bar: string = 'TypeScript';
  const page = usePage();
  console.log(page);
  return (
    <div>
      <ActionBanner type="warning" message={message} onClose={() => setMessage('')}></ActionBanner>
    </div>
  );
};

export default Welcome;
