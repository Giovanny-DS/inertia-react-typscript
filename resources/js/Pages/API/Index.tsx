import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Tokens } from '../../types/types';
import ApiTokenManager from './ApiTokenManager';
type Props = {
  tokens: Tokens;
  availablePermissions: string[];
  defaultPermissions: string[];
};
const Index: React.FC<Props> = ({ tokens, availablePermissions, defaultPermissions }) => (
  <AppLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">API Tokens</h2>}>
    <div>
      <div className="py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <ApiTokenManager
          tokens={tokens}
          availablePermissions={availablePermissions}
          defaultPermissions={defaultPermissions}
        />
      </div>
    </div>
  </AppLayout>
);

export default Index;
