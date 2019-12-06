import React from 'react';
import { SinglePaneLayout } from '../../components/Layouts/SinglePaneLayout';
import { Download } from '../../components/Download/Download';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import './index.scss';
import { Upload } from '../../components/Upload/Upload';

export const Index: React.FC = () => {
  const data = useSelector((state: RootState) => state);

  return (
    <SinglePaneLayout
      title="Editor"
      mainContent={() => (
        <div>
          <Download data={data} filename="data">
            Download
          </Download>
          <Upload />
        </div>
      )}
    />
  );
};
