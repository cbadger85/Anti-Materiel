import React from 'react';
import { MasterPage } from '../../components/MasterPage/MasterPage';
import { StatsAndAttributes } from './StatsAndAttributes/StatsAndAttributes';
import { UnitInfo } from './UnitInfo/UnitInfo';
import { Button } from '../../components/Button/Button';
import { useToast } from '../../components/Toasts/useToast';

export const UnitEditor: React.FC = () => {
  const makeToast = useToast();
  return (
    <>
      <MasterPage
        title="Unit Editor"
        uri="/unit-editor"
        buttonRow={() => (
          <Button
            width="7.5rem"
            color="primary"
            onClick={() => makeToast('Saved!')}
            id="unit-editor-save-button"
          >
            Save
          </Button>
        )}
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
