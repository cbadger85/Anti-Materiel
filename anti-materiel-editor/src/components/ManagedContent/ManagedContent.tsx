import React from 'react';
import { SideDrawer } from '../../components/SideDrawer/SideDrawer';
import { ToggleContent } from '../../components/ToggleContent/ToggleContent';
import { Button } from '../Button/Button';
import { AddIcon, EditIcon } from '../Icons';
import './ManagedContent.scss';

export const ManagedContent: React.FC<ManagedContentProps> = ({
  warn,
  edit,
  title,
  content,
  form,
}) => {
  const handleCancel = (hide: () => void) => {
    if (warn) {
      console.log('WARNING!');
    }
    hide();
  };

  return (
    <div className="managed-content__container">
      <h3 className={'managed-content__title'}>{title}</h3>
      <div className="mananged-content__content">{content()}</div>
      <ToggleContent
        toggle={show => (
          <div className="managed-content__button-container">
            <Button
              onClick={show}
              color="secondary"
              className="editor__open-form-button"
              width="7.5rem"
            >
              {edit ? (
                <>
                  <EditIcon color="secondary" /> Edit
                </>
              ) : (
                <>
                  <AddIcon color="secondary" /> Add
                </>
              )}
            </Button>
          </div>
        )}
        content={(isShown, hide) => (
          <SideDrawer
            isOpen={isShown}
            closeSideDrawer={() => handleCancel(hide)}
          >
            {form(() => handleCancel(hide))}
          </SideDrawer>
        )}
      />
    </div>
  );
};

interface ManagedContentProps {
  title: string;
  warn?: boolean;
  edit?: boolean;
  content: () => React.ReactNode;
  form: (closeSideDrawer: () => void) => React.ReactNode;
}
