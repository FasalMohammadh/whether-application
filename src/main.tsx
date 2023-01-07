import React from 'react';
import ReactDOM from 'react-dom/client';

import WhetherPage from '@/Page';

import '@/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WhetherPage />
  </React.StrictMode>
);
