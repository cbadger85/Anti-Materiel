import React from 'react';
import { TwoPaneLayout } from '../../components/Layouts/TwoPaneLayout';
import { useToast } from '../../components/Toasts/useToast';
import { StatsAndAttributes } from './StatsAndAttributes/StatsAndAttributes';
import { UnitInfo } from './UnitInfo/UnitInfo';
import { routeConfig } from '../routeConfig';

export const UnitEditor: React.FC = () => {
  const makeToast = useToast();
  return (
    <>
      <TwoPaneLayout
        title="Unit Editor"
        uri={routeConfig.addUnit.path}
        sidePanelContent={() => null}
        mainContent={() => (
          <>
            <UnitInfo />
            <StatsAndAttributes />
          </>
        )}
        isSaveDisabled={false}
        onSave={() => makeToast('Saved!')}
        isDeleteShown={false}
        onDelete={() => null}
        confirmDeleteText="Are you sure you want to delete this unit?"
        shouldPromptOnRedirect={false}
      />
    </>
  );
};
