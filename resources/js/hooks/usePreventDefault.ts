import React from 'react';
export default (e: React.FormEvent | React.MouseEvent, callback: CallableFunction) => {
  e.preventDefault;
  callback();
};
