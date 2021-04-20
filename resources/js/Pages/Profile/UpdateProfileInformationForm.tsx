import React from 'react';
import usePreventDefault from '../../Hooks/usePreventDefault';
import { usePage } from './../../Hooks/usePage';
import { useForm } from '@inertiajs/inertia-react';

import FormSection from '../../Components/FormSection';
import ActionMessage from '../../Components/ActionMessage';
import Label from '../../Components/Label';
import Input from '../../Components/Input';
import InputError from '../../Components/InputError';
import Button from '../../Components/Button';
import { UpdateProfileForm } from '../../types/types';

type Props = {
  user: {
    name: string;
    email: string;
    profile_photo_url: string;
    profile_photo_path: string;
  };
};
const UpdateProfileInformationForm: React.FC<Props> = ({ user }) => {
  const [photoPreview, setPhotoPreview] = React.useState<string | ArrayBuffer | null>(null);
  const photoRef = React.useRef<HTMLInputElement>(null);
  const { jetstream } = usePage().props;

  const UpdateProfileForm = useForm<UpdateProfileForm>({
    _method: 'put',
    name: user.name,
    email: user.email,
    photo: null,
  });
  const {
    setData,
    post,
    data: { name, email },
    processing,
  } = UpdateProfileForm;
  const updateProfileInformation = async () => {
    console.log(photoRef.current?.files?.[0]);
    if (photoRef.current?.files?.[0]) {
      setData('photo', photoRef.current?.files[0]);
    }
    post(route('user-profile-information.update'), {
      errorBag: 'updateProfileInformation',
      preserveScroll: true,
    });
  };
  const selectNewPhoto = () => {
    photoRef.current?.click();
  };

  const updatePhotoPreview = () => {
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result);
    };
    // @ts-ignore
    reader.readAsDataURL(photoRef.current?.files?.[0]);
  };

  const deletePhoto = () => {
    UpdateProfileForm.delete(route('current-user-photo.destroy'), {
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

              {user.profile_photo_path ? (
                <Button
                  variant="secondary"
                  type="button"
                  className="mt-2"
                  onClick={(e: React.MouseEvent) => usePreventDefault(e, deletePhoto)}
                >
                  Remove Photo
                </Button>
              ) : null}

              <InputError message={UpdateProfileForm.errors?.photo} className="mt-2" />
            </div>
          ) : null}

          {/* Name */}
          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="name" value="Name" />
            <Input
              id="name"
              type="text"
              className="block w-full mt-1"
              value={UpdateProfileForm.data.name}
              onChange={(e) => UpdateProfileForm.setData('name', e.target.value)}
              autoComplete="name"
            />
            <InputError message={UpdateProfileForm.errors?.name} className="mt-2" />
          </div>

          {/* Email */}
          <div className="col-span-6 sm:col-span-4">
            <Label htmlFor="email" value="Email" />
            <Input
              id="email"
              type="email"
              className="block w-full mt-1"
              value={UpdateProfileForm.data.email}
              onChange={(e) => UpdateProfileForm.setData('name', e.target.value)}
            />
            <InputError message={UpdateProfileForm.errors?.email} className="mt-2" />
          </div>
        </>
      }
      actions={
        <>
          <ActionMessage on={status === 'recentlySuccessful'} className="mr-3">
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

export default UpdateProfileInformationForm;
