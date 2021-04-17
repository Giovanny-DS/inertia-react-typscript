import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

// type Props = {
//   errorBag: any;
//   initialData: { [key: string]: string };
// };
export default ({ errorBag = {}, ...initialData }) => {
  const [data, setData] = React.useState(initialData);
  const [status, setStatus] = React.useState('idle');
  //@ts-ignore
  const { errors } = usePage().props;

  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const reset = (...fields: any) => {
    if (fields.length === 0) {
      setData(initialData);
    } else {
      setData((currentData) =>
        fields.reduce((carry: any, key: string) => ({ ...carry, [key]: initialData[key] }), currentData)
      );
    }
  };

  // Avoid state updates to unmounted components.
  const safeSetStatus = React.useCallback((newStatus) => mounted.current && setStatus(newStatus), [mounted]);
  const safeReset = React.useCallback((...fields) => mounted.current && reset(...fields), [mounted]);

  const submit = React.useCallback(
    (promise) => {
      if (!promise) {
        return;
      }

      safeSetStatus('processing');
      promise.then((newStatus = null) => {
        if (newStatus === 'success') {
          safeSetStatus('recentlySuccessful');
          setTimeout(() => {
            safeSetStatus((oldStatus: any) => (oldStatus === 'recentlySuccessful' ? 'idle' : oldStatus));
          }, 2000);
        } else {
          safeSetStatus('idle');
        }

        if (newStatus === 'reset') {
          safeReset();
        }
      });
    },
    [setStatus]
  );

  const setField = (field: string, value: any) =>
    setData((oldData: any) => ({
      ...oldData,
      [field]: typeof value === 'function' ? value(oldData[field]) : value,
    }));

  const useField = (field: string) => [data[field], (value: any) => setField(field, value)];

  return {
    useField,
    setField,
    data,
    setData,
    status,
    isProcessing: status === 'processing',
    setStatus,
    submit,
    reset,
    // @ts-ignore
    errors: (errorBag ? errors?.[errorBag] : errors) || {},
  };
};
