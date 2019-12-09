import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Download } from '../../components/Download/Download';
import { SinglePaneLayout } from '../../components/Layouts/SinglePaneLayout';
import { useToast } from '../../components/Toasts/useToast';
import { Upload } from '../../components/Upload/Upload';
import { loadEquipment } from '../../store/EquipmentSlice';
import { RootState } from '../../store/rootReducer';
import { loadWeapons } from '../../store/weaponsSlice';
import './index.scss';

export const Index: React.FC = () => {
  const data = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const makeToast = useToast();

  const handleOnLoad = (data: RootState): void => {
    dispatch(loadWeapons(data.weapons));
    dispatch(loadEquipment(data.equipment));
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
