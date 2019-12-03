import React, { useEffect, useRef, useState } from 'react';
import './MasterPage.scss';
import { Button } from '../Button/Button';
import { ConfirmModal } from '../Modal/ConfirmModal';

export const MasterPage: React.FC<MasterPageProps> = ({
  sidePanelContent,
  mainContent,
  isDeleteShown,
  isSaveDisabled,
  onSave,
  onDelete,
  title,
  uri,
  confirmDeleteText = 'Are you sure you want to delete this?',
}) => {
  const [sidePanelHeight, setSidePanelHeight] = useState(0);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

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
          {isDeleteShown && (
            <Button
              id="editor-delete-button"
              width="7.5rem"
              color="delete-light"
              onClick={() => setIsDeleteModalShown(true)}
              style={{ marginRight: '1rem' }}
            >
              Delete
            </Button>
          )}
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
      <div className="page-content__container">
        <main className="editor" ref={contentRef}>
          <div>{mainContent()}</div>
        </main>
        <section className="side-panel" style={{ height: sidePanelHeight }}>
          {sidePanelContent(uri)}
        </section>
      </div>
      <ConfirmModal
        isShown={isDeleteModalShown}
        text={confirmDeleteText}
        onConfirm={handleModalConfirm}
        onCancel={() => setIsDeleteModalShown(false)}
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
}
