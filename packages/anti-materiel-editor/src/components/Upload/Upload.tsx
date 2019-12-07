import React, { useRef, useState } from 'react';
import { Button } from '../Button/Button';
import './Upload.scss';
import { readFileAsText } from '../../utils/readFileAsText';

export const Upload: React.FC<UploadProps> = ({
  onLoad,
  onError,
  children,
}) => {
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
      <input
        ref={inputRef}
        type="file"
        onChange={handleOnChange}
        accept="application/json"
        className="upload__input"
      />
      <h2 className={'managed-content__title'}>Upload Army Data</h2>
      <div>
        <div>
          <Button onClick={handleOnClickSelectFile}>Select File...</Button>
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
        >
          {children}
        </Button>
      </div>
    </div>
  );
};

interface UploadProps {
  onLoad: (data: any) => void; //TODO: make this unknown when type validation is added to the handleLoadFunction
  onError: () => void;
}
