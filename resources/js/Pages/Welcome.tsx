import { usePage } from '@inertiajs/inertia-react';
import React, { useState } from 'react';
import { Banner } from '../Components/Banner';

const Welcome = () => {
  const [message, setMessage] = useState('test');
  let foo: string = 'React';
  const bar: string = 'TypeScript';
  const page = usePage();
  console.log(page);
  return (
    <div>
      <Banner type="warning" message={message} onClose={() => setMessage('')}></Banner>
    </div>
  );
};

export default Welcome;
