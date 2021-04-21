import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticationCard from '../../Components/AuthenticationCard';
import AuthenticationCardLogo from '../../Components/AuthenticationCardLogo';
import ValidationErrors from '../../Components/ValidationErrors';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import Button from '../../Components/Button';
import { useForm } from '@inertiajs/inertia-react';

const TwoFactorChallenge = () => {
  const twoFactorChallengeForm = useForm({
    code: '',
    recovery_code: '',
  });
  const {
    data: { code, recovery_code },
    setData,
    processing,
    submit,
  } = twoFactorChallengeForm;
  const [recovery, setRecovery] = React.useState(false);

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    twoFactorChallengeForm.post(route('two-factor.login'));
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600">
        {!recovery
          ? 'Please confirm access to your account by entering the authentication code provided by your authenticator application.'
          : 'Please confirm access to your account by entering one of your emergency recovery codes.'}
      </div>

      <ValidationErrors className="mb-4" />

      <form onSubmit={formHandler}>
        {!recovery ? (
          <div>
            <Label htmlFor="code" value="Code" />
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              className="block w-full mt-1"
              value={code}
              onChange={(e) => setData('code', e.target.value)}
              autoFocus
              autoComplete="one-time-code"
            />
          </div>
        ) : (
          <div>
            <Label htmlFor="recovery_code" value="Recovery Code" />
            <Input
              id="recovery_code"
              type="text"
              className="block w-full mt-1"
              value={recovery_code}
              onChange={(e) => setData('recovery_code', e.target.value)}
              autoComplete="one-time-code"
            />
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
          <button
            type="button"
            className="text-sm text-gray-600 underline cursor-pointer hover:text-gray-900"
            onClick={() => setRecovery(!recovery)}
          >
            {!recovery ? 'Use a recovery code' : 'Use an authentication code'}
          </button>
          <Button className={['ml-4', processing ? 'opacity-25' : ''].join(' ')} disabled={processing}>
            Log in
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
};

export default TwoFactorChallenge;
