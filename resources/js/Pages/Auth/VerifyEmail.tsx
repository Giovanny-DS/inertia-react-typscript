import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import AuthenticationCard from '../../Components/AuthenticationCard';
import AuthenticationCardLogo from '../../Components/AuthenticationCardLogo';
import Button from '../../Components/Button';

type Props = {
  status: string;
};

const VerifyEmail: React.FC<Props> = ({ status = '' }) => {
  const verifyEmailForm = useForm({});
  const { processing } = verifyEmailForm;

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    verifyEmailForm.post(route('verification.send'));
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
          <Button className={['ml-4', processing ? 'opacity-25' : ''].join(' ')} disabled={processing}>
            Resend Verification Email
          </Button>
          <InertiaLink
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
