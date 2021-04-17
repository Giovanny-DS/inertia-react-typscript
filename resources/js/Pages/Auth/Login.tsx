import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticationCard from '../../Components/AuthenticationCard';
import AuthenticationCardLogo from '../../Components/AuthenticationCardLogo';
import ValidationErrors from '../../Components/ValidationErrors';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import Button from '../../Components/Button';
import Checkbox from '../../Components/Checkbox';
import useForm from '../../Hooks/useForm';

type Props = {
  status?: string;
  canResetPassword: boolean;
};

const Login = ({ status = '', canResetPassword }: Props) => {
  const { data, useField, status: formStatus, submit, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });
  const isProcessing = formStatus === 'processing';
  const [email, setEmail] = useField('email');
  const [password, setPassword] = useField('password');
  const [remember, setRemember] = useField('remember');

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();

    submit(
      new Promise((resolve) => {
        Inertia.post(
          //@ts-ignore
          route('login'),
          {
            ...data,
            remember: remember ? 'on' : '',
          },
          {
            onError: () => {
              //@ts-ignore
              resolve();
              reset('password');
            },
          }
        );
      })
    );
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <ValidationErrors className="mb-4" />

      {status ? <div className="mb-4 text-sm font-medium text-green-600">{status}</div> : null}

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

        <div className="mt-4">
          <Label htmlFor="password" value="Password" />
          <Input
            id="password"
            type="password"
            className="block w-full mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox name="remember" checked={remember} onChange={(e) => setRemember(e.target.value)} />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          {canResetPassword ? (
            <>
              <InertiaLink
                //@ts-ignore
                href={route('password.request')}
                className="text-sm text-gray-600 underline hover:text-gray-900"
              >
                Forgot your password?
              </InertiaLink>
            </>
          ) : null}
          <Button className={['ml-4', isProcessing ? 'opacity-25' : ''].join(' ')} disabled={isProcessing}>
            Log in
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
};

export default Login;
