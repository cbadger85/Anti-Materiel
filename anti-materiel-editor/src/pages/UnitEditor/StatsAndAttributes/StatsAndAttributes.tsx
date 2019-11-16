import React from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { AddStatsAndAttributes } from './StatsAndAttributesForm';

export const StatsAndAttributes: React.FC = () => {
  return (
    <ManagedContent
      title="Stats and Attributes"
      content={() => null}
      form={hideSideBar => (
        <AddStatsAndAttributes closeSideDrawer={hideSideBar} />
      )}
    />
  );
};
