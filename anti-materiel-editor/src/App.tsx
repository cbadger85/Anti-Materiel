import React from 'react';
import { UnitEditor } from './pages/UnitEditor/UnitEditor';
import { Header } from './components/Header/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header title="Anti-Materiel" />
      <UnitEditor />
    </div>
  );
};

export default App;
