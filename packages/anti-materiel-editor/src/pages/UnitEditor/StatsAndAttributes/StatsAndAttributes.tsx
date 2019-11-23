import React from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { StatsAndAttributesForm } from './StatsAndAttributesForm';

export const StatsAndAttributes: React.FC = () => {
  return (
    <ManagedContent
      title="Stats and Attributes"
      content={() => null}
      form={(hideSideDrawer, hideSideDrawerWarn) => (
        <StatsAndAttributesForm
          closeSideDrawer={hideSideDrawer}
          onSubmit={data => console.log(data)}
          onCancel={hideSideDrawerWarn}
        />
      )}
    />
  );
};
