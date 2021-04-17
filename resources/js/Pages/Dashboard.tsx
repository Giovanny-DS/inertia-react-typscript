import * as React from 'react';
import AppLayout from '..//Layouts/AppLayout';
import Welcome from './../Components/Welcome';

const Dashboard = () => (
  <AppLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}>
    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
          <Welcome />
        </div>
      </div>
    </div>
  </AppLayout>
);

export default Dashboard;
