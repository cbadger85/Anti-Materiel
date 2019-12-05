import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from '../../pages/Routes';
import { ConfirmModal } from '../Modal/ConfirmModal';
import { ToastProvider } from '../Toasts/ToastProvider';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export const App: React.FC = () => {
  const initialNavigationModalState = {
    isShown: false,
    message: '',
    callback: () => {},
  };
  const [navigationModal, setNavigationModal] = useState<NavigationModal>(
    initialNavigationModalState,
  );

  const handleConfirmNavigation = (
    message: string,
    callback: (prompt: boolean) => void,
  ): void => {
    setNavigationModal({ isShown: true, message, callback });
  };

  const handleOnCancelModal = (): void => {
    setNavigationModal(state => ({ ...state, isShown: false }));
    navigationModal.callback(false);
  };

  const handleOnConfirmModal = (): void => {
    setNavigationModal(state => ({ ...state, isShown: false }));
    navigationModal.callback(true);
  };

  return (
    <div className="App">
      <ErrorBoundary>
        <ToastProvider>
          <Router getUserConfirmation={handleConfirmNavigation}>
            <Routes />
          </Router>
          <ConfirmModal
            isShown={navigationModal.isShown}
            text={navigationModal.message}
            onConfirm={handleOnConfirmModal}
            onCancel={handleOnCancelModal}
          />
        </ToastProvider>
      </ErrorBoundary>
    </div>
  );
};

interface NavigationModal {
  isShown: boolean;
  message: string;
  callback: (ok: boolean) => void;
}
