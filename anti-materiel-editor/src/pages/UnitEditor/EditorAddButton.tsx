import React from 'react';
import { Button } from '../../components/Button/Button';
import { AddIcon } from '../../components/Icons';
import './EditorAddButton.scss';

export const EditorAddButton: React.FC<
  React.HTMLAttributes<HTMLButtonElement>
> = props => {
  return (
    <div className="editor__button-container">
      <Button {...props} color="secondary" className="editor__add-button">
        <AddIcon color="secondary" /> Add
      </Button>
    </div>
  );
};
