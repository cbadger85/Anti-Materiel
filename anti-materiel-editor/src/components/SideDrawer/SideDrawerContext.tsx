import React from 'react';

export const SideDrawerContext = React.createContext({
  isSideDrawerOpen: false,
  openSideDrawer: () => {},
  closeSideDrawer: () => {},
  route: '',
  setRoute: (route: string) => {},
});

export const SideDrawerProvider: React.FC = ({ children }) => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = React.useState(false);
  const [route, setRoute] = React.useState('');

  const openSideDrawer = () => setIsSideDrawerOpen(true);
  const closeSideDrawer = () => setIsSideDrawerOpen(false);

  return (
    <SideDrawerContext.Provider
      value={{
        isSideDrawerOpen,
        openSideDrawer,
        closeSideDrawer,
        route,
        setRoute,
      }}
    >
      {children}
    </SideDrawerContext.Provider>
  );
};

export const useSideDrawer = () => React.useContext(SideDrawerContext);
