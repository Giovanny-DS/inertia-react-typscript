import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import ActionSection from '../../Components/ActionSection';
import Button from '../../Components/Button';
import ConfirmsPassword from '../../Components/ConfirmsPassword';
import axios from 'axios';
import { usePage } from './../../Hooks/usePage';
type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const TwoFactorAuthenticationForm: React.FC<Props> = ({ ...props }) => {
  const [enabling, setEnabling] = React.useState(false);
  const [disabling, setDisabling] = React.useState(false);
  const [qrCode, setQrCode] = React.useState('');
  const [recoveryCodes, setRecoveryCodes] = React.useState([]);
  const { user } = usePage().props;

  const twoFactorEnabled = !enabling && user.two_factor_enabled;

  const showQrCode = () => axios.get('/user/two-factor-qr-code').then((response) => setQrCode(response.data.svg));

  const showRecoveryCodes = () =>
    axios.get('/user/two-factor-recovery-codes').then((response) => setRecoveryCodes(response.data));

  const enableTwoFactorAuthentication = () => {
    setEnabling(true);

    Inertia.post(
      '/user/two-factor-authentication',
      {},
      {
        preserveScroll: true,
        onSuccess: () => Promise.all([showQrCode(), showRecoveryCodes()]),
        onFinish: () => setEnabling(false),
      }
    );
  };

  const regenerateRecoveryCodes = () => axios.post('/user/two-factor-recovery-codes').then(() => showRecoveryCodes());

  const disableTwoFactorAuthentication = () => {
    setDisabling(true);

    Inertia.delete('/user/two-factor-authentication', {
      preserveScroll: true,
      onSuccess: () => setDisabling(false),
    });
  };

  return (
    <ActionSection
      {...props}
      title="Two Factor Authentication"
      description="Add additional security to your account using two factor authentication."
      content={
        <>
          {twoFactorEnabled ? (
            <h3 className="text-lg font-medium text-gray-900">You have enabled two factor authentication.</h3>
          ) : (
            <h3 className="text-lg font-medium text-gray-900">You have not enabled two factor authentication.</h3>
          )}

          <div className="max-w-xl mt-3 text-sm text-gray-600">
            <p>
              When two factor authentication is enabled, you will be prompted for a secure, random token during
              authentication. You may retrieve this token from your phone&apos;s Google Authenticator application.
            </p>
          </div>

          {twoFactorEnabled ? (
            <div>
              {qrCode ? (
                <div>
                  <div className="max-w-xl mt-4 text-sm text-gray-600">
                    <p className="font-semibold">
                      Two factor authentication is now enabled. Scan the following QR code using your phone&apos;s
                      authenticator application.
                    </p>
                  </div>

                  <div className="mt-4 dark:p-4 dark:w-56 dark:bg-white" dangerouslySetInnerHTML={{ __html: qrCode }} />
                </div>
              ) : null}

              {recoveryCodes.length > 0 ? (
                <div>
                  <div className="max-w-xl mt-4 text-sm text-gray-600">
                    <p className="font-semibold">
                      Store these recovery codes in a secure password manager. They can be used to recover access to
                      your account if your two factor authentication device is lost.
                    </p>
                  </div>

                  <div className="grid max-w-xl gap-1 px-4 py-4 mt-4 font-mono text-sm bg-gray-100 rounded-lg">
                    {recoveryCodes.map((code) => (
                      <div key={code}>{code}</div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="mt-5">
            {!twoFactorEnabled ? (
              <div>
                <ConfirmsPassword onConfirm={enableTwoFactorAuthentication}>
                  <Button type="button" className={enabling ? 'opacity-25' : ''} disabled={enabling}>
                    Enable
                  </Button>
                </ConfirmsPassword>
              </div>
            ) : (
              <div>
                {recoveryCodes.length > 0 ? (
                  <ConfirmsPassword onConfirm={regenerateRecoveryCodes}>
                    <Button variant="secondary" className="mr-3">
                      Regenerate Recovery Codes
                    </Button>
                  </ConfirmsPassword>
                ) : (
                  <ConfirmsPassword onConfirm={showRecoveryCodes}>
                    <Button variant="secondary" className="mr-3">
                      Show Recovery Codes
                    </Button>
                  </ConfirmsPassword>
                )}

                <ConfirmsPassword onConfirm={disableTwoFactorAuthentication}>
                  <Button variant="danger" className={disabling ? 'opacity-25' : ''} disabled={disabling}>
                    Disable
                  </Button>
                </ConfirmsPassword>
              </div>
            )}
          </div>
        </>
      }
    />
  );
};

export default TwoFactorAuthenticationForm;
