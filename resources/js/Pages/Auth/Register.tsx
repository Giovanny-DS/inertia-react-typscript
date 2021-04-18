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
import { usePage } from '../../Hooks/usePage';

const Register = () => {
  const { data, useField, status: formStatus, submit, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });
  const isProcessing = formStatus === 'processing';
  const [name, setName] = useField('name');
  const [email, setEmail] = useField('email');
  const [password, setPassword] = useField('password');
  const [passwordConfirmation, setPasswordConfirmation] = useField('password_confirmation');
  const [terms, setTerms] = useField('terms');
  const { jetstream } = usePage().props;

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();

    submit(
      new Promise((resolve) => {
        Inertia.post(route('register'), data, {
          onFinish: () => {
            //   @ts-ignore
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
          <Label htmlFor="name" value="Name" />
          <Input
            id="name"
            type="text"
            className="block w-full mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            autoComplete="name"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="email" value="Email" />
          <Input
            id="email"
            type="email"
            className="block w-full mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        {jetstream.hasTermsAndPrivacyPolicyFeature ? (
          <div className="mt-4">
            <Label htmlFor="terms">
              <div className="flex items-center">
                <Checkbox name="terms" id="terms" checked={terms} onChange={(e) => setTerms(e.target.value)} />
                <div className="ml-2">
                  I agree to the
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={route('terms.show')}
                    className="text-sm text-gray-600 underline hover:text-gray-900"
                  >
                    Terms of Service
                  </a>
                  and
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={route('policy.show')}
                    className="text-sm text-gray-600 underline hover:text-gray-900"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
            </Label>
          </div>
        ) : null}

        <div className="flex items-center justify-end mt-4">
          <InertiaLink href={route('login')} className="text-sm text-gray-600 underline hover:text-gray-900">
            Already registered?
          </InertiaLink>
          <Button className={['ml-4', isProcessing ? 'opacity-25' : ''].join(' ')} disabled={isProcessing}>
            Register
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
};

export default Register;
