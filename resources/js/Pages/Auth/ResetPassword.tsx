import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticationCard from '../../Components/AuthenticationCard';
import AuthenticationCardLogo from '../../Components/AuthenticationCardLogo';
import ValidationErrors from '../../Components/ValidationErrors';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import Button from '../../Components/Button';
import { useForm } from '@inertiajs/inertia-react';

type Props = {
  email: string;
  token: string;
};

const ResetPassword: React.FC<Props> = ({ email, token }) => {
  const resetPasswordForm = useForm({
    form_email: email,
    form_token: token,
    password: '',
    password_confirmation: '',
  });
  const {
    data: { form_email, password, password_confirmation },
    setData,
    processing,
    reset,
  } = resetPasswordForm;

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();

    resetPasswordForm.post(route('password.update'), {
      onFinish: () => {
        reset('password', 'password_confirmation');
      },
    });
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <ValidationErrors className="mb-4" />

      <form onSubmit={formHandler}>
        <div>
          <Label htmlFor="email" value="Email" />
          <Input
            id="email"
            type="email"
            className="block w-full mt-1"
            value={form_email}
            onChange={(e) => setData('form_email', e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="password" value="Password" />
          <Input
            id="password"
            type="password"
            className="block w-full mt-1"
            value={password}
            onChange={(e) => setData('password', e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="password_confirmation" value="Confirm Password" />
          <Input
            id="password_confirmation"
            type="password"
            className="block w-full mt-1"
            value={password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button className={['ml-4', processing ? 'opacity-25' : ''].join(' ')} disabled={processing}>
            Reset Password
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
};

export default ResetPassword;
