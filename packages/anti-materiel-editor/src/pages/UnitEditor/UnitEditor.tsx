import React from 'react';
import { MasterPage } from '../../components/MasterPage/MasterPage';
import { useToast } from '../../components/Toasts/useToast';
import { StatsAndAttributes } from './StatsAndAttributes/StatsAndAttributes';
import { UnitInfo } from './UnitInfo/UnitInfo';

export const UnitEditor: React.FC = () => {
  const makeToast = useToast();
  return (
    <>
      <MasterPage
        title="Unit Editor"
        uri="/unit-editor"
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
