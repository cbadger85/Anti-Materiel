import React, { useEffect, useRef, useState } from 'react';
import './Layouts.scss';
import { Button } from '../Button/Button';
import { ConfirmModal } from '../Modal/ConfirmModal';
import { Prompt, useHistory } from 'react-router-dom';

export const TwoPaneLayout: React.FC<MasterPageProps> = ({
  sidePanelContent,
  mainContent,
  isDeleteShown,
  isSaveDisabled,
  onSave,
  onDelete,
  title,
  uri,
  confirmDeleteText = 'Are you sure you want to delete this?',
  shouldPromptOnRedirect,
}) => {
  const [sidePanelHeight, setSidePanelHeight] = useState(0);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

  const history = useHistory();

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    setSidePanelHeight(contentRef.current.getBoundingClientRect().height);
  }, []);

  useEffect(() => {
    const getSidePanelHeightAfterResize = (): void => {
      contentRef.current &&
        setSidePanelHeight(contentRef.current.getBoundingClientRect().height);
    };

    window.addEventListener('resize', getSidePanelHeightAfterResize, true);

    return () =>
      window.removeEventListener('resize', getSidePanelHeightAfterResize, true);
  });

  const handleModalConfirm = (): void => {
    setIsDeleteModalShown(false);
    onDelete();
  };

  return (
    <>
      <div className="top-row">
        <h1>{title}</h1>
        <div>
          <Button
            id="editor-cancel-button"
            width="7.5rem"
            color="transparent-light"
            onClick={() => history.replace(uri)}
            style={{ marginRight: '1rem' }}
          >
            Cancel
          </Button>
          <Button
            id="editor-save-button"
            width="7.5rem"
            color="primary"
            onClick={onSave}
            disabled={isSaveDisabled}
          >
            Save
          </Button>
        </div>
      </div>
      <main className="page-content__container">
        <div className="editor" ref={contentRef}>
          <div className="editor-content">
            <div>{mainContent()}</div>
            {isDeleteShown && (
              <div className="danger-zone">
                <h2>Danger Zone</h2>
                <div className="danger-zone__content">
                  <Button
                    id="editor-delete-button"
                    width="7.5rem"
                    color="delete-ghost"
                    onClick={() => setIsDeleteModalShown(true)}
                    style={{ marginRight: '1rem' }}
                  >
                    Delete
                  </Button>
                  <div>
                    <p>Click here to delete this item.</p>
                    <p>Warning! This cannot be undone!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <section className="side-panel" style={{ height: sidePanelHeight }}>
          {sidePanelContent(uri)}
        </section>
      </main>
      <ConfirmModal
        isShown={isDeleteModalShown}
        text={confirmDeleteText}
        onConfirm={handleModalConfirm}
        onCancel={() => setIsDeleteModalShown(false)}
      />
      <Prompt
        when={shouldPromptOnRedirect}
        message="Are you sure you want to discard changes?"
      />
    </>
  );
};

interface MasterPageProps {
  title: string;
  sidePanelContent: (uri: string) => React.ReactNode;
  mainContent: () => React.ReactNode;
  isSaveDisabled?: boolean;
  isDeleteShown?: boolean;
  onSave: () => void;
  onDelete: () => void;
  confirmDeleteText?: string;
  uri: string;
  shouldPromptOnRedirect?: boolean;
}
