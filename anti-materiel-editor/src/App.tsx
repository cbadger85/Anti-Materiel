import React from 'react';
import { UnitEditor } from './pages/UnitEditor/UnitEditor';
import { Header } from './components/Header/Header';
import { ToastProvider } from './components/Toasts/ToastProvider';
import { ToastHub } from './components/Toasts/ToastHub';
import { BrowserRouter as Router, Switch, Route } from 'react-router';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <div className="App">
        <Header title="Anti-Materiel" />
        <UnitEditor />
      </div>
      <ToastHub />
    </ToastProvider>
  );
};

export default App;
