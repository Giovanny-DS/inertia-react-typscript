import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import ActionMessage from '../../Components/ActionMessage';
import ActionSection from '../../Components/ActionSection';
import Button from '../../Components/Button';
import ConfirmationModal from '../../Components/ConfirmationModal';
import DialogModal from '../../Components/DialogModal';
import FormSection from '../../Components/FormSection';
import Input from '../../Components/Input';
import Checkbox from '../../Components/Checkbox';
import InputError from '../../Components/InputError';
import Label from '../../Components/Label';
import SectionBorder from '../../Components/SectionBorder';
import useForm from '../../Hooks/useForm';
import useSlicedState from '../../Hooks/useSlicedState';
import { Tokens, Token } from '../../types/types';

type Props = {
  tokens: Tokens;
  availablePermissions: string[];
  defaultPermissions: string[];
};

const ApiTokenManager: React.FC<Props> = ({ tokens, availablePermissions, defaultPermissions }) => {
  // @ts-ignore
  const { jetstream } = usePage().props;

  const createApiTokenForm = useForm({
    errorBag: 'createApiToken',
    name: '',
    permissions: defaultPermissions,
  });

  const updateApiTokenForm = useForm({
    permissions: [],
  });

  const deleteApiTokenForm = useForm({});

  const { state, updateState } = useSlicedState({
    displayingToken: false,
    managingPermissionsFor: false,
    apiTokenBeingDeleted: false,
  });

  const createApiToken = () =>
    createApiTokenForm.submit(
      new Promise((resolve) =>
        // @ts-ignore
        Inertia.post(route('api-tokens.store'), createApiTokenForm.data, {
          preserveScroll: true,
          errorBag: 'createApiToken',
          onSuccess: () => {
            updateState({ displayingToken: true });
            createApiTokenForm.reset();
          },
          // @ts-ignore
          onFinish: resolve,
        })
      )
    );

  const manageApiTokenPermissions = (token: Token) => {
    updateApiTokenForm.setField('permissions', token.abilities);
    updateState({ managingPermissionsFor: token });
  };

  const updateApiToken = () =>
    updateApiTokenForm.submit(
      new Promise((resolve) =>
        // @ts-ignore
        Inertia.put(route('api-tokens.update', state.managingPermissionsFor), updateApiTokenForm.data, {
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => updateState({ managingPermissionsFor: null }),
          // @ts-ignore
          onFinish: resolve,
        })
      )
    );

  const confirmApiTokenDeletion = (token: Token) => updateState({ apiTokenBeingDeleted: token });

  const deleteApiToken = () =>
    deleteApiTokenForm.submit(
      new Promise((resolve) =>
        // @ts-ignore
        Inertia.delete(route('api-tokens.destroy', state.apiTokenBeingDeleted), {
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => updateState({ apiTokenBeingDeleted: null }),
          // @ts-ignore
          onFinish: resolve,
        })
      )
    );

  const isChecked = (value: string, comparing: string[] | string) => {
    if (Array.isArray(comparing)) {
      return comparing.includes(value);
    }
    return comparing === value;
  };

  const checkboxArrayChangeHandler = (value: any, values: any, stateHandler: any) => (checked: any) => {
    if (checked) {
      stateHandler(values.includes(value) ? values : [...values, value]);
    } else {
      const index = values.indexOf(value);
      stateHandler(index === -1 ? values : [...values.slice(0, index), ...values.slice(index + 1)]);
    }
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
                onChange={(value) => createApiTokenForm.setField('name', value)}
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
                          onChange={checkboxArrayChangeHandler(
                            permission,
                            createApiTokenForm.data.permissions,
                            (newValue: React.ChangeEvent) => createApiTokenForm.setField('permissions', newValue)
                          )}
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
            <ActionMessage on={createApiTokenForm.data.recentlySuccessful} className="mr-3">
              Created.
            </ActionMessage>
            <Button
              className={createApiTokenForm.isProcessing ? 'opacity-25' : ''}
              disabled={createApiTokenForm.isProcessing}
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
                          onClick={() => confirmApiTokenDeletion(token)}
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
        on={state.displayingToken}
        onClose={() => updateState({ displayingToken: false })}
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
          <Button variant="secondary" onClick={() => updateState({ displayingToken: false })}>
            Close
          </Button>
        }
      />

      {/* API Token Permissions Modal */}
      <DialogModal
        on={!!state.managingPermissionsFor}
        onClose={() => updateState({ managingPermissionsFor: null })}
        title="API Token Permissions"
        content={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {availablePermissions.map((permission) => (
              <div key={permission}>
                <label className="flex items-center">
                  <Checkbox
                    value={permission}
                    checked={isChecked(permission, updateApiTokenForm.data.permissions)}
                    onChange={checkboxArrayChangeHandler(
                      permission,
                      updateApiTokenForm.data.permissions,
                      (newValue: React.ChangeEvent) => updateApiTokenForm.setField('permissions', newValue)
                    )}
                  />
                  <span className="ml-2 text-sm text-gray-600">{permission}</span>
                </label>
              </div>
            ))}
          </div>
        }
        footer={
          <>
            <Button variant="secondary" onClick={() => updateState({ managingPermissionsFor: null })}>
              Never Mind
            </Button>
            <Button
              onClick={updateApiToken}
              className={['ml-2', updateApiTokenForm.isProcessing ? 'opacity-25' : ''].join(' ')}
              disabled={updateApiTokenForm.isProcessing}
            >
              Save
            </Button>
          </>
        }
      />

      {/* Delete Token Confirmation Modal */}
      <ConfirmationModal
        on={!!state.apiTokenBeingDeleted}
        onClose={() => updateState({ apiTokenBeingDeleted: null })}
        title="Delete API Token"
        content="Are you sure you would like to delete this API token?"
        footer={
          <>
            <Button variant="secondary" onClick={() => updateState({ apiTokenBeingDeleted: null })}>
              Never Mind
            </Button>
            <Button
              variant="danger"
              onClick={deleteApiToken}
              className={['ml-2', deleteApiTokenForm.isProcessing ? 'opacity-25' : ''].join(' ')}
              disabled={deleteApiTokenForm.isProcessing}
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
