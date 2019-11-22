import React, { useEffect, useRef, useState } from 'react';
import './MasterPage.scss';

export const MasterPage: React.FC<MasterPageProps> = ({
  sidePanelContent,
  mainContent,
  buttonRow,
  title,
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
    <>
      <div className="top-row">
        <h1>{title}</h1>
        {buttonRow()}
      </div>
      <div className="page-content__container">
        <main className="editor" ref={contentRef}>
          <div>{mainContent()}</div>
        </main>
        <section className="side-panel" style={{ height: sidePanelHeight }}>
          {sidePanelContent()}
        </section>
      </div>
    </>
  );
};

interface MasterPageProps {
  title: string;
  sidePanelContent: () => React.ReactNode;
  mainContent: () => React.ReactNode;
  buttonRow: () => React.ReactNode;
}
