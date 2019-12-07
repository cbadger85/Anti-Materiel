import { Weapon } from '@anti-materiel/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Download } from '../../components/Download/Download';
import { SinglePaneLayout } from '../../components/Layouts/SinglePaneLayout';
import { useToast } from '../../components/Toasts/useToast';
import { Upload } from '../../components/Upload/Upload';
import { RootState } from '../../store/rootReducer';
import { loadWeapons } from '../../store/weaponsSlice';
import './index.scss';

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
          <Download data={data} filename="data" />
          <Upload onLoad={handleOnLoad} onError={handleOnError} />
        </div>
      )}
    />
  );
};
