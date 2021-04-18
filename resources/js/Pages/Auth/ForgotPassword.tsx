import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticationCard from '../../Components/AuthenticationCard';
import AuthenticationCardLogo from '../../Components/AuthenticationCardLogo';
import ValidationErrors from '../../Components/ValidationErrors';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import Button from '../../Components/Button';
import useForm from '../../Hooks/useForm';

const ForgotPassword = ({ status = '' }) => {
  const { data, useField, status: formStatus, submit } = useForm({ email: '' });
  const isProcessing = formStatus === 'processing';
  const [email, setEmail] = useField('email');

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();

    submit(
      new Promise((resolve) => {
        Inertia.post(route('password.email'), data, {
          onFinish: () => {
            //   @ts-ignore
            resolve();
          },
        });
      })
    );
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email address and we will email you a password reset
        link that will allow you to choose a new one.
      </div>

      {status ? <div className="mb-4 text-sm font-medium text-green-600">{status}</div> : null}

      <ValidationErrors className="mb-4" />

      <form onSubmit={formHandler}>
        <div>
          <Label htmlFor="email" value="Email" />
          <Input
            id="email"
            type="email"
            className="block w-full mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button className={isProcessing ? 'opacity-25' : ''} disabled={isProcessing}>
            Email Password Reset Link
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
};

export default ForgotPassword;
