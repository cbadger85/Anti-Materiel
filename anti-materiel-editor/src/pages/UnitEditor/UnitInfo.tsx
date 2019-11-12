import React from 'react';
import { EditorAddButton } from './EditorAddButton';
import { useSideDrawer } from '../../components/SideDrawer';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';

export const UnitInfo = () => {
  const { openSideDrawer, setRoute } = useSideDrawer();

  const handleOnEditorButtonClick = () => {
    setRoute('addUnitInfo');
    openSideDrawer();
  };

  return (
    <div className="editor__section-container">
      <SectionHeading className="editor__section-header" color="page">
        Unit Info
      </SectionHeading>
      <EditorAddButton onClick={handleOnEditorButtonClick} />
    </div>
  );
};
