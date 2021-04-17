import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticationCard from '../../Components/AuthenticationCard';
import AuthenticationCardLogo from '../../Components/AuthenticationCardLogo';
import ValidationErrors from '../../Components/ValidationErrors';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import Button from '../../Components/Button';
import useForm from '../../Hooks/useForm';

type Props = {
  email: string;
  token: string;
};

const ResetPassword: React.FC<Props> = ({ email, token }) => {
  const { data, useField, status: formStatus, submit, reset } = useForm({
    email,
    token,
    password: '',
    password_confirmation: '',
  });
  const isProcessing = formStatus === 'processing';
  const [formEmail, setFormEmail] = useField('email');
  const [password, setPassword] = useField('password');
  const [passwordConfirmation, setPasswordConfirmation] = useField('password_confirmation');

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();

    submit(
      new Promise((resolve) => {
        // @ts-ignore
        Inertia.post(route('password.update'), data, {
          onFinish: () => {
            // @ts-ignore
            resolve();
            reset('password', 'password_confirmation');
          },
        });
      })
    );
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
            value={formEmail}
            onChange={(value) => setFormEmail(value)}
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
            onChange={(value) => setPassword(value)}
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
            value={passwordConfirmation}
            onChange={(value) => setPasswordConfirmation(value)}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button className={['ml-4', isProcessing ? 'opacity-25' : ''].join(' ')} disabled={isProcessing}>
            Reset Password
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
};

export default ResetPassword;
