import React from 'react';
import { ToastProvider } from '../Toasts/ToastProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from '../../pages/Routes';
import { ToastHub } from '../Toasts/ToastHub';

export const App: React.FC = () => (
  <div className="App">
    <ToastProvider>
      <Router>
        <Routes />
      </Router>
    </ToastProvider>
  </div>
);
