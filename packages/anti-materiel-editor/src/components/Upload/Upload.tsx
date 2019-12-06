import { Weapon } from '@anti-materiel/types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { loadWeapons } from '../../store/weaponsSlice';
import { useToast } from '../Toasts/useToast';
import { useRef } from 'react';
import { Button } from '../Button/Button';

// TODO: add other keys to data object
// TODO: add validation
// TODO: write function to add possibly undefined fields back into object

export const Upload: React.FC = () => {
  const reader = new FileReader();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const makeToast = useToast();

  const handleOnLoad = (): void => {
    const dataString = reader.result ?? '';

    try {
      const data: { weapons: Weapon[] } = JSON.parse(dataString.toString());

      dispatch(loadWeapons(data.weapons));
      makeToast('Data loaded!');
    } catch (e) {
      handleOnError();
    }
  };

  const handleOnError = (): void => {
    makeToast('Failed to load data', { color: 'danger' });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileList = e.target.files;

    if (!fileList?.length) {
      return;
    }

    reader.readAsText(fileList[0]);

    reader.onload = handleOnLoad;
    reader.onerror = handleOnError;
    reader.onabort = handleOnError;
  };

  const handleOnClick = (): void => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        onChange={handleOnChange}
        accept="application/json"
        multiple
      />
      <Button color="secondary" onClick={handleOnClick}>
        Upload
      </Button>
    </>
  );
};
