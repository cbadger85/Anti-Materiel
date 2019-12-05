import React from 'react';
import './Layouts.scss';

export const SinglePaneLayout: React.FC<MasterPageProps> = ({
  mainContent,

  title,
}) => {
  return (
    <>
      <div className="top-row">
        <h1>{title}</h1>
      </div>
      <main className="page-content__container">
        <div className="editor">
          <div className="editor-content">
            <div>{mainContent()}</div>
          </div>
        </div>
      </main>
    </>
  );
};

interface MasterPageProps {
  title: string;
  mainContent: () => React.ReactNode;
}
