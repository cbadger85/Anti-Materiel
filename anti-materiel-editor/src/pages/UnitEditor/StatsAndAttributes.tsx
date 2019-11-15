import React from 'react';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { SideDrawer } from '../../components/SideDrawer/SideDrawer';
import { ToggleContent } from '../../components/ToggleContent/ToggleContent';
import { AddStatsAndAttributes } from '../../screens/SideDrawer/AddStatsAndAttributes';
import { EditorAddButton } from './EditorAddButton';

export const StatsAndAttributes: React.FC = () => {
  const handleCancel = (hide: () => void) => {
    hide();
  };

  return (
    <div className="editor__section-container">
      <SectionHeading className="editor__section-header" color="page">
        Stats and Attributes
      </SectionHeading>
      <ToggleContent
        toggle={show => <EditorAddButton onClick={show} />}
        content={(isShown, hide) => (
          <SideDrawer
            isOpen={isShown}
            closeSideDrawer={() => handleCancel(hide)}
          >
            <AddStatsAndAttributes closeSideDrawer={() => handleCancel(hide)} />
          </SideDrawer>
        )}
      />
    </div>
  );
};
