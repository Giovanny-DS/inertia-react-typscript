import React from 'react';
export default (key: string, callback: CallableFunction) => (e: React.KeyboardEvent) => {
  if (e.key === key) {
    callback();
  }
};
