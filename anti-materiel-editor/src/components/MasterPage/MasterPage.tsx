import React, { useEffect, useRef, useState } from 'react';
import './MasterPage.scss';
import { ToastProvider } from '../Toasts/ToastProvider';
import { ToastHub } from '../Toasts/ToastHub';

export const MasterPage: React.FC<MasterPageProps> = ({
  pageTitle,
  sidePanelContent,
  mainContent,
}) => {
  const [sidePanelHeight, setSidePanelHeight] = useState(0);
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

  return (
    <div className="page-content__container">
      <main className="editor" ref={contentRef}>
        <h2 className="page-title">{pageTitle}</h2>
        {mainContent()}
      </main>
      <section className="side-panel" style={{ height: sidePanelHeight }}>
        {sidePanelContent()}
      </section>
      <div className="page-content__spacer" />
    </div>
  );
};

interface MasterPageProps {
  pageTitle: string;
  sidePanelContent: () => React.ReactNode;
  mainContent: () => React.ReactNode;
}
