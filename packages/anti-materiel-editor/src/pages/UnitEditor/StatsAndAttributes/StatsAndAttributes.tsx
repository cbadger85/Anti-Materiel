import React from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { StatsAndAttributesForm } from './StatsAndAttributesForm';

export const StatsAndAttributes: React.FC = () => {
  return (
    <ManagedContent
      title="Stats and Attributes"
      content={() => null}
      form={(closeSideDrawer, hideSideDrawerWarn) => (
        <StatsAndAttributesForm
          onSubmit={data => () => {
            console.log(data);
            closeSideDrawer();
          }}
          onCancel={hideSideDrawerWarn}
        />
      )}
    />
  );
};
