import * as React from 'react';
import AppLayout from '..//Layouts/AppLayout';
import Button from '../Components/Button';
import usePreventDefault from '../Hooks/usePreventDefault';
import Welcome from './../Components/Welcome';

const Test = () => {
  const handleSubmit = (e: React.FormEvent) => {
    console.log('excet');
  };
  return (
    <AppLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Test</h2>}>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
            <form onSubmit={(e) => usePreventDefault(e, handleSubmit)}>
              <Button>click</Button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Test;
