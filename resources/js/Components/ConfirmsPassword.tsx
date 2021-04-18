import React, { useReducer, useRef } from 'react';
import DialogModal from './DialogModal';
import Input from './Input';
import InputError from './InputError';
import Button from './Button';
import useKeyPress from '../Hooks/useKeyPress';
import axios from 'axios';

const initialState = {
  confirmingPassword: false,
  password: '',
  error: '',
  processing: false,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'CLOSE_MODAL':
      return initialState;

    case 'CONFIRMING_PASSWORD':
      return {
        ...state,
        confirmingPassword: true,
      };

    case 'PROCESSING':
      return {
        ...state,
        processing: true,
      };

    case 'ERROR':
      return {
        ...state,
        processing: false,
        error: action.error,
      };

    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.value,
      };

    default:
      return state;
  }
}
type Props = {
  title?: string | React.ReactNode;
  content?: string | React.ReactNode;
  button?: string;
  onConfirm: CallableFunction;
};
const ConfirmsPassword: React.FC<Props> = ({
  children,
  title = 'Confirm Password',
  content = 'For your security, please confirm your password to continue.',
  button = 'Confirm',
  onConfirm,
}) => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { confirmingPassword, password, error: formError, processing: formProcessing } = state;

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const startConfirmingPassword = () => {
    axios.get(route('password.confirmation')).then(({ data }) => {
      if (data.confirmed) {
        onConfirm();
      } else {
        dispatch({ type: 'CONFIRMING_PASSWORD' });
        setTimeout(() => passwordRef.current?.focus(), 250);
      }
    });
  };

  const confirmPassword = () => {
    dispatch({ type: 'PROCESSING' });

    axios
      .post(route('password.confirm'), { password })
      .then(() => {
        closeModal();
        onConfirm();
      })
      .catch((error) => {
        dispatch({ type: 'ERROR', error: error.response.data.errors.password[0] });
        passwordRef.current?.focus()!;
      });
  };

  const setPassword = (value: string) =>
    dispatch({
      type: 'SET_PASSWORD',
      value,
    });

  const modalContent = (
    <>
      {content}
      <div className="mt-4">
        <Input
          fieldRef={passwordRef}
          type="password"
          className="block w-3/4 mt-1"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={useKeyPress('Enter', confirmPassword)}
        />
        <InputError message={formError} className="mt-2" />
      </div>
    </>
  );

  const modalFooter = (
    <>
      <Button variant="secondary" onClick={closeModal}>
        Never Mind
      </Button>
      <Button
        className={['ml-2', formProcessing && 'opacity-25'].join(' ')}
        onClick={confirmPassword}
        disabled={formProcessing}
      >
        {button}
      </Button>
    </>
  );

  return (
    <span>
      <span onClick={startConfirmingPassword}>{children}</span>
      <DialogModal on={confirmingPassword} title={title} content={modalContent} footer={modalFooter} />
    </span>
  );
};

export default ConfirmsPassword;
