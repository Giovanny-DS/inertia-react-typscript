import { useForm } from '@inertiajs/inertia-react';
import React, { useState } from 'react';
import ActionMessage from '../../Components/ActionMessage';
import ActionSection from '../../Components/ActionSection';
import Button from '../../Components/Button';
import Checkbox from '../../Components/Checkbox';
import ConfirmationModal from '../../Components/ConfirmationModal';
import DialogModal from '../../Components/DialogModal';
import FormSection from '../../Components/FormSection';
import Input from '../../Components/Input';
import InputError from '../../Components/InputError';
import Label from '../../Components/Label';
import SectionBorder from '../../Components/SectionBorder';
import { usePage } from '../../Hooks/usePage';
import { Token, Tokens } from '../../types/types';

type Props = {
  tokens: Tokens;
  availablePermissions: string[];
  defaultPermissions: string[];
};

const ApiTokenManager: React.FC<Props> = ({ tokens, availablePermissions, defaultPermissions }) => {
  const [displayingToken, setDisplayingToken] = useState(false);
  const [managingPermissionsFor, setManagingPermissionsFor] = useState<null | {}>(null);
  const [apiTokenBeingDeleted, setApiTokenBeingDeleted] = useState<null | Token>(null);
  const { jetstream } = usePage().props;

  const createApiTokenForm = useForm({
    name: '',
    permissions: defaultPermissions,
  });
  const updateApiTokenForm = useForm({
    permissions: [''],
  });
  const deleteApiTokenForm = useForm({});
  const createApiToken = () => {
    createApiTokenForm.post(route('api-tokens.store'), {
      preserveScroll: true,
      onSuccess: () => {
        setDisplayingToken(true);
        createApiTokenForm.reset();
      },
    });
  };
  const updateApiToken = () =>
    updateApiTokenForm.put(route('api-tokens.update', managingPermissionsFor), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setManagingPermissionsFor(null),
    });
  const deleteApiToken = () =>
    deleteApiTokenForm.delete(route('api-tokens.destroy', apiTokenBeingDeleted?.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setApiTokenBeingDeleted(null),
    });
  const manageApiTokenPermissions = (token: Token) => {
    updateApiTokenForm.data.permissions = token.abilities;
    setManagingPermissionsFor(() => token);
  };
  const checkboxArrayChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, permision: string, form: any) => {
    const permissions = form.data.permissions;
    if (e.target.checked) {
      permissions.includes(permision)
        ? form.setData('permissions', permissions)
        : form.setData('permissions', [...permissions, permision]);
    } else {
      const index = permissions.indexOf(permision);
      form.setData(
        'permissions',
        index === -1 ? permissions : [...permissions.slice(0, index), ...permissions.slice(index + 1)]
      );
    }
  };
  const isChecked = (permission: string, comparing: string[] | string) => {
    if (Array.isArray(comparing)) {
      return comparing.includes(permission);
    }
    return comparing === permission;
  };
  return (
    <div>
      {/* Generate API Token */}
      <FormSection
        onSubmit={createApiToken}
        title="Create API Token"
        description="API tokens allow third-party services to authenticate with our application on your behalf."
        form={
          <>
            {/* Token Name */}
            <div className="col-span-6 sm:col-span-4">
              <Label htmlFor="name" value="Name" />
              <Input
                id="name"
                type="text"
                className="block w-full mt-1"
                value={createApiTokenForm.data.name}
                onChange={(e) => createApiTokenForm.setData('name', e.target.value)}
                autoFocus
              />
              <InputError message={createApiTokenForm.errors.name} className="mt-2" />
            </div>

            {/* Token Permissions */}
            {availablePermissions.length > 0 ? (
              <div className="col-span-6">
                <Label htmlFor="permissions" value="Permissions" />

                <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
                  {availablePermissions.map((permission) => (
                    <div key={permission}>
                      <label className="flex items-center">
                        <Checkbox
                          value={permission}
                          checked={isChecked(permission, createApiTokenForm.data.permissions)}
                          onChange={(e) => checkboxArrayChangeHandler(e, permission, createApiTokenForm)}
                        />
                        <span className="ml-2 text-sm text-gray-600">{permission}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        }
        actions={
          <>
            <ActionMessage on={createApiTokenForm.recentlySuccessful} className="mr-3">
              Created.
            </ActionMessage>
            <Button
              className={createApiTokenForm.processing ? 'opacity-25' : ''}
              disabled={createApiTokenForm.processing}
            >
              Create
            </Button>
          </>
        }
      />

      {tokens.length > 0 ? (
        <div>
          <SectionBorder />

          {/* Manage API Tokens */}
          <div className="mt-10 sm:mt-0">
            <ActionSection
              title="Manage API Tokens"
              description="You may delete any of your existing tokens if they are no longer needed."
              content={
                <div className="space-y-6">
                  {/* API Token List */}
                  {tokens.map((token) => (
                    <div className="flex items-center justify-between" key={token.id}>
                      <div>{token.name}</div>

                      <div className="flex items-center">
                        {token.last_used_ago ? (
                          <div className="text-sm text-gray-400">{`Last used ${token.last_used_ago}`}</div>
                        ) : null}

                        {availablePermissions.length > 0 ? (
                          <button
                            type="button"
                            className="ml-6 text-sm text-gray-400 underline cursor-pointer"
                            onClick={() => manageApiTokenPermissions(token)}
                          >
                            Permissions
                          </button>
                        ) : null}

                        <button
                          type="button"
                          className="ml-6 text-sm text-red-500 cursor-pointer"
                          onClick={() => setApiTokenBeingDeleted(token)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              }
            />
          </div>
        </div>
      ) : null}
      {/* Token Value Modal */}
      <DialogModal
        on={displayingToken}
        onClose={() => setDisplayingToken(false)}
        title="API Token"
        content={
          <>
            <div>Please copy your new API token. For your security, it won&apos;t be shown again.</div>

            {jetstream.flash.token ? (
              <div className="px-4 py-2 mt-4 font-mono text-sm text-gray-500 bg-gray-100 rounded">
                {jetstream.flash.token}
              </div>
            ) : null}
          </>
        }
        footer={
          <Button variant="secondary" onClick={() => setDisplayingToken(false)}>
            Close
          </Button>
        }
      />

      {/* API Token Permissions Modal */}
      <DialogModal
        on={!!managingPermissionsFor}
        onClose={() => setManagingPermissionsFor(null)}
        title="API Token Permissions"
        content={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {availablePermissions.map((permission) => (
              <div key={permission}>
                <label className="flex items-center">
                  <Checkbox
                    value={permission}
                    checked={isChecked(permission, updateApiTokenForm.data.permissions)}
                    onChange={(e) => checkboxArrayChangeHandler(e, permission, updateApiTokenForm)}
                  />
                  <span className="ml-2 text-sm text-gray-600">{permission}</span>
                </label>
              </div>
            ))}
          </div>
        }
        footer={
          <>
            <Button variant="secondary" onClick={() => setManagingPermissionsFor(null)}>
              Never Mind
            </Button>
            <Button
              onClick={updateApiToken}
              className={['ml-2', updateApiTokenForm.processing ? 'opacity-25' : ''].join(' ')}
              disabled={updateApiTokenForm.processing}
            >
              Save
            </Button>
          </>
        }
      />
      {/* Delete Token Confirmation Modal */}
      <ConfirmationModal
        on={!!apiTokenBeingDeleted}
        onClose={() => setApiTokenBeingDeleted(null)}
        title="Delete API Token"
        content="Are you sure you would like to delete this API token?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setApiTokenBeingDeleted(null)}>
              Never Mind
            </Button>
            <Button
              variant="danger"
              onClick={deleteApiToken}
              className={['ml-2', deleteApiTokenForm.processing ? 'opacity-25' : ''].join(' ')}
              disabled={deleteApiTokenForm.processing}
            >
              Delete
            </Button>
          </>
        }
      />
    </div>
  );
};

export default ApiTokenManager;
