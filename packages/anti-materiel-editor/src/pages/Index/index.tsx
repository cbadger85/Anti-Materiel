import React from 'react';
import { SinglePaneLayout } from '../../components/Layouts/SinglePaneLayout';
import { Download } from '../../components/Download/Download';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import './index.scss';
import { Upload } from '../../components/Upload/Upload';
import { loadWeapons } from '../../store/weaponsSlice';
import { Weapon } from '@anti-materiel/types';
import { useToast } from '../../components/Toasts/useToast';

export const Index: React.FC = () => {
  const data = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const makeToast = useToast();

  const handleOnLoad = (data: { weapons: Weapon[] }): void => {
    dispatch(loadWeapons(data.weapons));
    makeToast('Data loaded!');
  };

  const handleOnError = (): void => {
    makeToast('Failed to load data', { color: 'danger' });
  };

  return (
    <SinglePaneLayout
      title="Editor"
      mainContent={() => (
        <div>
          <Download data={data} filename="data">
            Save to Disk...
          </Download>
          <Upload onLoad={handleOnLoad} onError={handleOnError}>
            Load
          </Upload>
        </div>
      )}
    />
  );
};
