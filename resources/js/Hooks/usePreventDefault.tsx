import React from 'react';
export default (
  e: React.FormEvent | React.MouseEvent,
  callback: CallableFunction
): React.FormEventHandler<HTMLFormElement> => {
  e.preventDefault();
  return callback();
};
