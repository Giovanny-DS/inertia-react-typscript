import React, { useState } from 'react';
import Banner from './../Components/Banner';

const Home = () => {
  const [message, setMessage] = useState('test');
  let foo: string = 'React';
  const bar: string = 'TypeScript';

  return (
    <div>
      {/* <Banner message={message} onClose={() => setMessage('')}></Banner> */}
      hi!
    </div>
  );
};

export default Home;
