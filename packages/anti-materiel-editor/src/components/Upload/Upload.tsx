import React, { useRef, useState } from 'react';
import { Button } from '../Button/Button';
import './Upload.scss';
import { readFileAsText } from '../../utils/readFileAsText';
import { FilePlus } from 'react-feather';
import { color } from '../../styles/colors';
import { Upload as UploadIcon } from 'react-feather';
import { RootState } from '../../store/rootReducer';

export const Upload: React.FC<UploadProps> = ({ onLoad, onError }) => {
  const [filename, setFilname] = useState<string>();
  const [fileText, setFileText] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClickLoad = (): void => {
    if (!fileText) {
      return;
    }

    try {
      const data = JSON.parse(fileText);

      onLoad(data);
    } catch (e) {
      onError();
    }

    setFilname(undefined);
    setFileText(undefined);
  };

  const handleOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const fileList = e.target.files;

    if (!fileList?.length) {
      return;
    }

    setFilname(fileList[0].name);
    readFileAsText(fileList[0])
      .then(text => {
        setFileText(text);
      })
      .catch(e => onError());
  };

  const handleOnClickSelectFile = (): void => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
  };

  return (
    <div className="upload">
      <h2 className="managed-content__title">Upload Army Data</h2>
      <div>
        <div>
          <input
            ref={inputRef}
            type="file"
            onChange={handleOnChange}
            accept="application/json"
            className="upload__input"
          />
          <Button onClick={handleOnClickSelectFile} width="8.5rem">
            <FilePlus size="0.9rem" color={color.neutral[0]} />
            <span>File...</span>
          </Button>
          {filename ? (
            <span className="upload__filename">
              <span className="upload__filename__label">filename:</span>{' '}
              {filename}
            </span>
          ) : (
            <span className="upload__filename upload__filename--none-specified">
              no file specified...
            </span>
          )}
        </div>
        <Button
          color="secondary"
          onClick={handleOnClickLoad}
          disabled={!fileText}
          className="upload__load-button"
          width="8.5rem"
        >
          <UploadIcon
            color={fileText ? color.supporting.indigo[0] : color.neutral[4]}
            size="1rem"
          />
          <span>Load</span>
        </Button>
      </div>
    </div>
  );
};

interface UploadProps {
  onLoad: (data: RootState) => void; //TODO: make this unknown when type validation is added to the handleLoadFunction
  onError: () => void;
}
