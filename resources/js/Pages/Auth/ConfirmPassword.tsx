import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

import AuthenticationCard from '../../Components/AuthenticationCard';
import AuthenticationCardLogo from '../../Components/AuthenticationCardLogo';
import ValidationErrors from '../../Components/ValidationErrors';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import Button from '../../Components/Button';

const ConfirmPassword = () => {
  const confirmPasswordForm = useForm({ password: '' });
  const {
    data: { password },
    setData,
    processing,
  } = confirmPasswordForm;

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();

    confirmPasswordForm.post(route('password.confirm'));
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <ValidationErrors className="mb-4" />

      <form onSubmit={formHandler}>
        <div>
          <Label htmlFor="password" value="Password" />
          <Input
            id="password"
            type="password"
            className="block w-full mt-1"
            value={password}
            onChange={(e) => setData('password', e.target.value)}
            required
            autoComplete="current-password"
            autoFocus
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button className={['ml-4', processing ? 'opacity-25' : ''].join(' ')} disabled={processing}>
            Confirm
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
};

export default ConfirmPassword;
