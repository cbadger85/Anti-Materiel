import React from 'react';
import { EditorAddButton } from './EditorAddButton';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { useSideDrawer } from '../../components/SideDrawer';

export const StatsAndAttributes: React.FC = () => {
  const { openSideDrawer, setRoute } = useSideDrawer();

  const handleOnEditorButtonClick = () => {
    setRoute('addStatsAndAttributes');
    openSideDrawer();
  };
  return (
    <div className="editor__section-container">
      <SectionHeading color="page">Stats and Attributes</SectionHeading>

      <EditorAddButton onClick={handleOnEditorButtonClick} />
    </div>
  );
};
