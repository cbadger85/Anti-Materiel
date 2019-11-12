import React from 'react';
import { EditorAddButton } from './EditorAddButton';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { useSideDrawer } from '../../components/SideDrawer';

export const RelatedProfiles = () => {
  const { openSideDrawer, setRoute } = useSideDrawer();

  const handleOnEditorButtonClick = () => {
    setRoute('');
    openSideDrawer();
  };
  return (
    <div className="editor__section-container">
      <SectionHeading color="page">Related Profiles</SectionHeading>

      <EditorAddButton onClick={handleOnEditorButtonClick} />
    </div>
  );
};
