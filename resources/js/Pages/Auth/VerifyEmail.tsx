import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticationCard from '../../Components/AuthenticationCard';
import AuthenticationCardLogo from '../../Components/AuthenticationCardLogo';
import Button from '../../Components/Button';
import useForm from '../../Hooks/useForm';

type Props = {
  status: string;
};

const VerifyEmail: React.FC<Props> = ({ status = '' }) => {
  const { status: formStatus, submit } = useForm({
    email: '',
    password: '',
    remember: false,
  });
  const isProcessing = formStatus === 'processing';

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();

    submit(
      new Promise((resolve) => {
        Inertia.post(
          // @ts-ignore
          route('verification.send'),
          {},
          {
            onFinish: () => {
              // @ts-ignore
              resolve();
            },
          }
        );
      })
    );
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600">
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we
        just emailed to you? If you didn&apos;t receive the email, we will gladly send you another.
      </div>

      {status === 'verification-link-sent' ? (
        <div className="mb-4 text-sm font-medium text-green-600">
          A new verification link has been sent to the email address you provided during registration.
        </div>
      ) : null}

      <form onSubmit={formHandler}>
        <div className="flex items-center justify-between mt-4">
          <Button className={['ml-4', isProcessing ? 'opacity-25' : ''].join(' ')} disabled={isProcessing}>
            Resend Verification Email
          </Button>
          <InertiaLink
            // @ts-ignore
            href={route('logout')}
            className="text-sm text-gray-600 underline hover:text-gray-900"
            method="post"
            as="button"
          >
            Log Out
          </InertiaLink>
        </div>
      </form>
    </AuthenticationCard>
  );
};

export default VerifyEmail;
