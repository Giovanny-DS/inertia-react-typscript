import * as React from 'react';

import AppLayout from '../../Layouts/AppLayout';
import SectionBorder from '../../Components/SectionBorder';
import DeleteUserForm from './DeleteUserForm';
import LogoutOtherBrowserSessionsForm from './LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from './TwoFactorAuthenticationForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateProfileInformationForm from './UpdateProfileInformationForm';
import { usePage } from './../../Hooks/usePage';

type Props = {
  sessions: {
    agent: {
      is_desktop: boolean;
      platform: string;
      browser: string;
    };
    ip_address: string;
    is_current_device: boolean;
    last_active: string;
  };
};

const Show = ({ sessions }: Props) => {
  const { jetstream, user } = usePage().props;

  return (
    <AppLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Profile</h2>}>
      <div>
        <div className="py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {jetstream.canUpdateProfileInformation ? (
            <div>
              <UpdateProfileInformationForm user={user} />

              <SectionBorder />
            </div>
          ) : null}

          {jetstream.canUpdatePassword ? (
            <div>
              <UpdatePasswordForm name={user.name} className="mt-10 sm:mt-0" />

              <SectionBorder />
            </div>
          ) : null}

          {jetstream.canManageTwoFactorAuthentication ? (
            <div>
              <TwoFactorAuthenticationForm className="mt-10 sm:mt-0" />

              <SectionBorder />
            </div>
          ) : null}

          <LogoutOtherBrowserSessionsForm sessions={sessions} className="mt-10 sm:mt-0" />

          {jetstream.hasAccountDeletionFeatures ? (
            <>
              <SectionBorder />

              <DeleteUserForm className="mt-10 sm:mt-0" />
            </>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
};

export default Show;
