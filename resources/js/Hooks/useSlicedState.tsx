import React from 'react';

export default (initialState: any) => {
  const [state, setState] = React.useState(initialState);
  const updateState = (patch: any) => setState((oldState: any) => ({ ...oldState, ...patch }));

  return {
    state,
    setState,
    updateState,
  };
};
