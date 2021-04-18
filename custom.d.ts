import { Route } from 'ziggy-js';

declare module '*.svg' {
  const content: any;
  export default content;
}

declare global {
  function route(name?: string, params?: InputParams, absolute?: boolean, customZiggy?: Config): any;
}
