import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import useForm from '../../Hooks/useForm';

import FormSection from '../../Components/FormSection';
import Label from '../../Components/Label';
import Input from '../../Components/Input';
import InputError from '../../Components/InputError';
import Button from '../../Components/Button';
import ActionMessage from '../../Components/ActionMessage';
type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  name?: string;
};
const UpdatePasswordForm: React.FC<Props> = ({ name, ...props }) => {
  const { data, isProcessing, status, submit, reset, useField, errors } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [currentPassword, setCurrentPassword] = useField('current_password');
  const [password, setPassword] = useField('password');
  const [passwordConfirmation, setPasswordConfirmation] = useField('password_confirmation');
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const currentPasswordRef = React.useRef<HTMLInputElement>(null);

  const updatePassword = () => {
    submit(
      new Promise((resolve) => {
        Inertia.put(route('user-password.update'), data, {
          errorBag: 'updatePassword',
          preserveScroll: true,
          onSuccess: () => {
            resolve('success');
            reset();
          },
          onError: () => {
            if (errors?.updatePassword?.password) {
              reset('password', 'password_confirmation');

              passwordRef.current?.focus();
            }

            if (errors?.updatePassword?.current_password) {
              reset('current_password');

              currentPasswordRef.current?.focus();
            }
          },
        });
      })
    );
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
              fieldRef={currentPasswordRef}
              id="current_password"
              type="password"
              className="block w-full mt-1"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />
            <InputError message={errors?.updatePassword?.current_password} className="mt-2" />
          </div>

          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="password" value="New Password" />
            <Input
              fieldRef={passwordRef}
              id="password"
              type="password"
              className="block w-full mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <InputError message={errors?.updatePassword?.password} className="mt-2" />
          </div>

          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="password_confirmation" value="Confirm Password" />
            <Input
              id="password_confirmation"
              type="password"
              className="block w-full mt-1"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="new-password"
            />
            <InputError message={errors?.updatePassword?.password_confirmation} className="mt-2" />
          </div>
        </>
      }
      actions={
        <>
          <ActionMessage on={status === 'recentlySuccessful'} className="mr-3">
            Saved.
          </ActionMessage>
          <Button className={isProcessing ? 'opacity-25' : ''} disabled={isProcessing}>
            Save
          </Button>
        </>
      }
    />
  );
};

export default UpdatePasswordForm;
