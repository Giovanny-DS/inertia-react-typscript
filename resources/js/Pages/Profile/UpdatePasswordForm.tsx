import React from 'react';
import FormSection from '../../Components/FormSection';
import Label from '../../Components/Label';
import Input from '../../Components/Input';
import InputError from '../../Components/InputError';
import Button from '../../Components/Button';
import ActionMessage from '../../Components/ActionMessage';
import { useForm } from '@inertiajs/inertia-react';
type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  name?: string;
};
const UpdatePasswordForm: React.FC<Props> = ({ name, ...props }) => {
  const {
    data: { current_password, password, password_confirmation },
    processing,
    recentlySuccessful,
    put,
    reset,
    setData,
    errors,
  } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword = () => {
    put(route('user-password.update'), {
      errorBag: 'updatePassword',
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: () => {
        reset();
      },
    });
  };

  return (
    <FormSection
      {...props}
      onSubmit={updatePassword}
      title="Update Password"
      description="Ensure your account is using a long, random password to stay secure."
      form={
        <>
          {/* This is only for Accesibilty purposes */}
          {name && <Input id="username" type="text" value={name} hidden autoComplete="username" />}
          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="current_password" value="Current Password" />
            <Input
              id="current_password"
              type="password"
              className="block w-full mt-1"
              value={current_password}
              onChange={(e) => setData('current_password', e.target.value)}
              autoComplete="current-password"
            />
            <InputError message={errors?.current_password} className="mt-2" />
          </div>

          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="password" value="New Password" />
            <Input
              id="password"
              type="password"
              className="block w-full mt-1"
              value={password}
              onChange={(e) => setData('password', e.target.value)}
              autoComplete="new-password"
            />
            <InputError message={errors?.password} className="mt-2" />
          </div>

          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="password_confirmation" value="Confirm Password" />
            <Input
              id="password_confirmation"
              type="password"
              className="block w-full mt-1"
              value={password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              autoComplete="new-password"
            />
            <InputError message={errors?.password_confirmation} className="mt-2" />
          </div>
        </>
      }
      actions={
        <>
          <ActionMessage on={recentlySuccessful} className="mr-3">
            Saved.
          </ActionMessage>
          <Button className={processing ? 'opacity-25' : ''} disabled={processing}>
            Save
          </Button>
        </>
      }
    />
  );
};

export default UpdatePasswordForm;
