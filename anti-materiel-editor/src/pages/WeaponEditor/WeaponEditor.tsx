import React from 'react';
import { MasterPage } from '../../components/MasterPage/MasterPage';

export const WeaponEditor: React.FC = () => {
  return (
    <>
      <MasterPage
        pageTitle="Weapon Editor"
        sidePanelContent={() => null}
        mainContent={() => null}
      />
    </>
  );
};
