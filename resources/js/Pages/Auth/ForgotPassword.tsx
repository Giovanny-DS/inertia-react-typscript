import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

import AuthenticationCard from '../../Components/AuthenticationCard';
import AuthenticationCardLogo from '../../Components/AuthenticationCardLogo';
import ValidationErrors from '../../Components/ValidationErrors';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import Button from '../../Components/Button';

const ForgotPassword = ({ status = '' }) => {
  const forgotPasswordForm = useForm({ email: '' });
  const {
    data: { email },
    setData,
    processing,
  } = useForm({ email: '' });

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();

    forgotPasswordForm.post(route('password.email'));
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
            onChange={(e) => setData('email', e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button className={processing ? 'opacity-25' : ''} disabled={processing}>
            Email Password Reset Link
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
};

export default ForgotPassword;
