import React from 'react';
import { MasterPage } from '../../components/MasterPage/MasterPage';
import { StatsAndAttributes } from './StatsAndAttributes/StatsAndAttributes';
import { UnitInfo } from './UnitInfo/UnitInfo';

export const UnitEditor: React.FC = () => {
  return (
    <>
      <MasterPage
        pageTitle="Unit Editor"
        sidePanelContent={() => null}
        mainContent={() => (
          <>
            <UnitInfo />
            <StatsAndAttributes />
          </>
        )}
      />
    </>
  );
};
