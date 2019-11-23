import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from '../../pages/Routes';
import { ToastProvider } from '../Toasts/ToastProvider';

export const App: React.FC = () => (
  <div className="App">
    <ToastProvider>
      <Router>
        <Routes />
      </Router>
    </ToastProvider>
  </div>
);
