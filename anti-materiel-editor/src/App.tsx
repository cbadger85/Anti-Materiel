import React from 'react';
import { SideDrawerProvider, SideDrawer } from './components/SideDrawer';
import { UnitEditor } from './pages/UnitEditor/UnitEditor';

const App: React.FC = () => {
  return (
    <div className="App">
      <SideDrawerProvider>
        <UnitEditor />
        <SideDrawer />
      </SideDrawerProvider>
    </div>
  );
};

export default App;
