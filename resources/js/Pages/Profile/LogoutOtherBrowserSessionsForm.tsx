import React from 'react';
import ActionSection from '../../Components/ActionSection';
import ActionMessage from '../../Components/ActionMessage';
import DialogModal from '../../Components/ConfirmationModal';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import InputError from '../../Components/InputError';
import useKeyPress from '../../Hooks/useKeyPress';
import useForm from '../../Hooks/useForm';
import { Inertia } from '@inertiajs/inertia';
import { Session } from '../../types/types';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  sessions: any;
};

const LogoutOtherBrowserSessionsForm: React.FC<Props> = ({ sessions, ...props }) => {
  const [confirmingLogout, setConfirmingLogout] = React.useState(false);
  const { data, useField, isProcessing, submit, reset, errors, status } = useForm({
    errorBag: 'logoutOtherBrowserSessions',
    password: '',
  });
  const [password, setPassword] = useField('password');
  const passwordRef = React.useRef(null);

  const confirmLogout = () => {
    setConfirmingLogout(true);
    // @ts-ignore
    setTimeout(() => passwordRef.current.focus(), 250);
  };

  const closeModal = () => {
    setConfirmingLogout(false);
    reset();
  };

  const logoutOtherBrowserSessions = () => {
    submit(
      new Promise((resolve) => {
        // @ts-ignore
        Inertia.delete(route('other-browser-sessions.destroy'), {
          preserveScroll: true,
          errorBag: 'logoutOtherBrowserSessions',
          onSuccess: () => closeModal(),
          // @ts-ignore
          onError: () => passwordRef.current.focus(),
          // @ts-ignore
          onFinish: () => resolve(),
        });
      })
    );
  };

  return (
    <ActionSection
      {...props}
      title="Browser Sessions"
      description="Manage and log out your active sessions on other browsers and devices."
      content={
        <>
          <div className="max-w-xl text-sm text-gray-600">
            If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your
            recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has
            been compromised, you should also update your password.
          </div>

          {/* Other Browser Sessions */}
          {sessions.length > 0 ? (
            <div className="mt-5 space-y-6">
              {sessions.map((session: any, i: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <div className="flex items-center" key={i}>
                  <div>
                    {session.agent.is_desktop ? (
                      <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8 text-gray-500"
                      >
                        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8 text-gray-500"
                      >
                        <path d="M0 0h24v24H0z" stroke="none" />
                        <rect x="7" y="4" width="10" height="16" rx="1" />
                        <path d="M11 5h2M12 17v.01" />
                      </svg>
                    )}
                  </div>

                  <div className="ml-3">
                    <div className="text-sm text-gray-600">
                      {`${session.agent.platform} - ${session.agent.browser}`}
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">
                        {session.ip_address},
                        {session.is_current_device ? (
                          <span className="font-semibold text-green-500">This device</span>
                        ) : (
                          <span>{`Last active ${session.last_active}`}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="flex items-center mt-5">
            <Button onClick={confirmLogout}>Log Out Other Browser Sessions</Button>

            <ActionMessage on={status === 'recentlySuccessful'} className="ml-3">
              Done.
            </ActionMessage>
          </div>

          {/* Log Out Other Devices Confirmation Modal */}
          <DialogModal
            on={confirmingLogout}
            onClose={closeModal}
            title="Log Out Other Browser Sessions"
            content={
              <>
                Please enter your password to confirm you would like to log out of your other browser sessions across
                all of your devices.
                <div className="mt-4">
                  <Input
                    type="password"
                    fieldRef={passwordRef}
                    className="block w-3/4 mt-1"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={useKeyPress('Enter', logoutOtherBrowserSessions)}
                  />

                  <InputError message={errors?.password} className="mt-2" />
                </div>
              </>
            }
            footer={
              <>
                <Button variant="secondary" onClick={closeModal}>
                  Never Mind
                </Button>
                <Button
                  className={['ml-2', isProcessing ? 'opacity-25' : ''].join(' ')}
                  onClick={logoutOtherBrowserSessions}
                  disabled={isProcessing}
                >
                  Log Out Other Browser Sessions
                </Button>
              </>
            }
          />
        </>
      }
    />
  );
};

export default LogoutOtherBrowserSessionsForm;
