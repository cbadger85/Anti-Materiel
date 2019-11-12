import React from 'react';
import { Button } from '../../components/Button/Button';
import { EditIcon } from '../../components/Icons';

export const EditorEditButton: React.FC<
  React.HTMLAttributes<HTMLButtonElement>
> = props => {
  return (
    <div className="edtor__button-container">
      <Button {...props} color="secondary" width="100%">
        <EditIcon color="secondary" /> Edit
      </Button>
    </div>
  );
};
