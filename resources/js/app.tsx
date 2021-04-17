import React from 'react';
import { render } from 'react-dom';
import { InertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
const app = document.getElementById('app');
require('./bootstrap');

render(
  <InertiaApp
    initialPage={app ? JSON.parse(app.dataset.page!) : '{}'}
    resolveComponent={(name) => import(`./Pages/${name}`).then((module) => module.default)}
  />,
  app
);
InertiaProgress.init({ color: '#4B5563' });
