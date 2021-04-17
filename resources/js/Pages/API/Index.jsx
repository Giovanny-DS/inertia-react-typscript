import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ApiTokenManager from './ApiTokenManager';

const Index = ({
  tokens,
  availablePermissions,
  defaultPermissions,
}) => (
  <AppLayout header={(
    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
      API Tokens
    </h2>
    )}
  >
    <div>
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <ApiTokenManager
          tokens={tokens}
          availablePermissions={availablePermissions}
          defaultPermissions={defaultPermissions}
        />
      </div>
    </div>
  </AppLayout>
);

Index.propTypes = {
  tokens: arrayOf(shape({
    id: number,
    name: string,
    last_used_ago: string,
  })),
  availablePermissions: arrayOf(string),
  defaultPermissions: arrayOf(string),
};

export default Index;
