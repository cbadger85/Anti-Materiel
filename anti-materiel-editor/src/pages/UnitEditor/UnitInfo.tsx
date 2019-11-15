import React from 'react';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { SideDrawer } from '../../components/SideDrawer/SideDrawer';
import { ToggleContent } from '../../components/ToggleContent/ToggleContent';
import { AddUnitInfo } from '../../screens/SideDrawer/AddUnitInfo';
import { EditorAddButton } from './EditorAddButton';

export const UnitInfo: React.FC = () => {
  const handleCancel = (hide: () => void) => {
    hide();
  };

  return (
    <div className="editor__section-container">
      <SectionHeading className="editor__section-header" color="page">
        Unit Info
      </SectionHeading>
      <ToggleContent
        toggle={show => <EditorAddButton onClick={show} />}
        content={(isShown, hide) => (
          <SideDrawer
            isOpen={isShown}
            closeSideDrawer={() => handleCancel(hide)}
          >
            <AddUnitInfo closeSideDrawer={hide} />
          </SideDrawer>
        )}
      />
    </div>
  );
};
