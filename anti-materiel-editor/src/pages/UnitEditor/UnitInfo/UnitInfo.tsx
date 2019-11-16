import React from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { AddUnitInfo } from './UnitInfoForm';

export const UnitInfo: React.FC = () => {
  return (
    <ManagedContent
      title="Unit Info"
      content={() => null}
      form={hideSideBar => <AddUnitInfo closeSideDrawer={hideSideBar} />}
    />
  );
};
