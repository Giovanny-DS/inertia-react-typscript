import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

import useForm from '../../Hooks/useForm';
import usePreventDefault from '../../Hooks/usePreventDefault';

import FormSection from '../../Components/FormSection';
import ActionMessage from '../../Components/ActionMessage';
import Label from '../../Components/Label';
import Input from '../../Components/Input';
import InputError from '../../Components/InputError';
import Button from '../../Components/Button';
import { Inertia } from '@inertiajs/inertia';
type Props = {
  user: {
    name: string;
    email: string;
    profile_photo_url: string;
  };
};
const UpdateProfileInformationForm: React.FC<Props> = ({ user }) => {
  const [photoPreview, setPhotoPreview] = React.useState(null);
  const photoRef = React.useRef(null);
  // @ts-ignore
  const { jetstream } = usePage().props;

  const { data, isProcessing, status, submit, useField, errors } = useForm({
    name: user.name,
    email: user.email,
    photo: null,
  });
  const [name, setName] = useField('name');
  const [email, setEmail] = useField('email');

  const updateProfileInformation = () => {
    submit(
      new Promise((resolve) => {
        Inertia.post(
          // @ts-ignore
          route('user-profile-information.update'),
          {
            _method: 'PUT',
            ...data,
            // @ts-ignore
            photo: photoRef.current ? photoRef.current.files[0] : null,
          },
          {
            errorBag: 'updateProfileInformation',
            preserveScroll: true,
            onSuccess: () => {
              resolve('success');
            },
          }
        );
      })
    );
  };

  const selectNewPhoto = () => {
    // @ts-ignore
    photoRef.current.click();
  };

  const updatePhotoPreview = () => {
    const reader: FileReader = new FileReader();
    reader.onload = (e: Event) => {
      // @ts-ignore
      setPhotoPreview(reader.result);
    };

    // @ts-ignore
    reader.readAsDataURL(photoRef.current.files[0]);
  };

  const deletePhoto = () => {
    // @ts-ignore
    Inertia.delete(route('current-user-photo.destroy'), {
      preserveScroll: true,
      onSuccess: () => setPhotoPreview(null),
    });
  };

  return (
    <FormSection
      onSubmit={updateProfileInformation}
      title="Profile Information"
      description="Update your account's profile information and email address."
      form={
        <>
          {/* Profile Photo */}
          {jetstream.managesProfilePhotos ? (
            <div className="col-span-6 sm:col-span-4">
              {/* Profile Photo File Input */}
              <input id="photo" type="file" className="hidden" ref={photoRef} onChange={updatePhotoPreview} />

              <Label htmlFor="photo" value="Photo" />

              {!photoPreview ? (
                <div className="mt-2">
                  {/* Current Profile Photo */}
                  <img src={user.profile_photo_url} alt={user.name} className="object-cover w-20 h-20 rounded-full" />
                </div>
              ) : (
                <div className="mt-2">
                  {/* New Profile Photo Preview */}
                  <span
                    className="block w-20 h-20 rounded-full"
                    style={{
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                      backgroundImage: `url('${photoPreview}')`,
                    }}
                  />
                </div>
              )}

              <Button
                variant="secondary"
                className="mt-2 mr-2"
                type="button"
                onClick={(e: React.MouseEvent) => usePreventDefault(e, selectNewPhoto)}
              >
                Select A New Photo
              </Button>

              {user.profile_photo_url ? (
                <Button
                  variant="secondary"
                  type="button"
                  className="mt-2"
                  onClick={(e: React.MouseEvent) => usePreventDefault(e, deletePhoto)}
                >
                  Remove Photo
                </Button>
              ) : null}

              <InputError message={errors?.updateProfileInformation?.photo} className="mt-2" />
            </div>
          ) : null}

          {/* Name */}
          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="name" value="Name" />
            <Input
              id="name"
              type="text"
              className="block w-full mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <InputError message={errors?.updateProfileInformation?.name} className="mt-2" />
          </div>

          {/* Email */}
          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="email" value="Email" />
            <Input
              id="email"
              type="email"
              className="block w-full mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputError message={errors?.updateProfileInformation?.email} className="mt-2" />
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

export default UpdateProfileInformationForm;
