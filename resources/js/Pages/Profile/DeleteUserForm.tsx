import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

import useKeyPress from '../../Hooks/useKeyPress';

import ActionSection from '../../Components/ActionSection';
import DialogModal from '../../Components/ConfirmationModal';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import InputError from '../../Components/InputError';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
const DeleteUserForm: React.FC<Props> = ({ ...props }) => {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = React.useState(false);
  const deleteUserForm = useForm({ password: '' });
  const {
    data: { password },
    setData,
    processing,
    errors,
    reset,
  } = deleteUserForm;
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };

  const deleteUser = () => {
    deleteUserForm.delete(route('current-user.destroy'), {
      errorBag: 'deleteUser',
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordRef.current?.focus(),
    });
  };

  return (
    <ActionSection
      {...props}
      title="Delete Account"
      description="Permanently delete your account."
      content={
        <>
          <div className="max-w-xl text-sm text-gray-600">
            Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
            your account, please download any data or information that you wish to retain.
          </div>

          <div className="mt-5">
            <Button variant="danger" onClick={() => setConfirmingUserDeletion(true)}>
              Delete Account
            </Button>
          </div>

          {/* Delete Account Confirmation Modal */}
          <DialogModal
            on={confirmingUserDeletion}
            onClose={closeModal}
            title="Delete Account"
            content={
              <>
                Are you sure you want to delete your account? Once your account is deleted, all of its resources and
                data will be permanently deleted. Please enter your password to confirm you would like to permanently
                delete your account.
                <div className="mt-4">
                  <Input
                    type="password"
                    fieldRef={passwordRef}
                    className="block w-3/4 mt-1"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setData('password', e.target.value)}
                    onKeyPress={useKeyPress('Enter', deleteUser)}
                  />

                  <InputError message={errors?.password} className="mt-2" />
                </div>
              </>
            }
            footer={
              <>
                <Button variant="secondary" onClick={closeModal}>
                  Never mind
                </Button>
                <Button
                  variant="danger"
                  className={['ml-2', processing ? 'opacity-25' : ''].join(' ')}
                  onClick={deleteUser}
                  disabled={processing}
                >
                  Delete Account
                </Button>
              </>
            }
          />
        </>
      }
    />
  );
};

export default DeleteUserForm;
